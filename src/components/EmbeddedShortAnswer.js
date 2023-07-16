const ModuleComponent = require("./ModuleComponent.js");

const ExplanationModal = require("./ExplanationModal.js");
const codeTemplateToCode = require("../utils/codeTemplateToCode.js");
const modals = require("../utils/modal.js");
const Database = require("../utils/Database.js");

class EmbeddedShortAnswer extends ModuleComponent {
	constructor(state, parent) {
		super(state, parent);
	}

	handleOptionClick(response) {
		var self = this;
        this.parent.state.value = response;


        let isValid = self.state.graderFunction(response)


		if (isValid) {
			this.parent.state.status = "correct_chosen";
			Database.updateMCPoints(window.location.hash.split("/")[2], window.location.hash.split("/")[3], window.location.hash.split("/")[4], this.state.elementNum, this.state.points, this.state.coins)
			modals.show("Correct! 🎉",
				`${this.state.correctDescription}<br><br>+${this.state.points} XP<br>+${this.state.coins} coins`, [
				{
					type: "button",
					text: "Continue",
					onclick: function () {self.correct()}
				},
				{
					type: "cancel",
					onclick: function () {self.correct()}
				}
			]
			)
		} else {
			this.parent.state.status = "incorrect_chosen"
			modals.show("Incorrect!",
			`${this.state.incorrectDescription}<br>
			<hr>
			"${modals.randomQuote()}"
			`, [
			{
				type: "button",
				text: "Try again"
			}
		]
		)
		}
		this.setState("options", this.state.options)
	}
    handleKeyUp(event) {
        console.log(event)
    }
	correct() {
		this.state.explanation.setState("title", "")
		if (this.parent.state.alreadyCorrectAnswer === true) return;
		this.parent.state.alreadyCorrectAnswer = true;
		try {
			tApp.getComponentFromDOM(document.querySelector(".stack-width")).increaseCompletedQuestions();
		} catch(e){}
		var canvas = document.querySelector(`[tapp-component="${this.id}"]`).parentElement.parentElement.querySelector(".mc-answer-confetti")

		canvas.confetti = canvas.confetti || confetti.create(canvas, { resize: true });

		canvas.confetti({
			spread: 150,
			origin: { y: 1.3 },
			particleCount: 200,
			decay: 0.91,
			scalar: 0.8
		});
		canvas.parentElement.querySelector(".indicator-symbol").style.color = "var(--chakra-colors-green-500)";
		document.querySelector(".stack-width").children[getElementIndex(canvas.parentElement) + 1].scrollIntoView({
			behavior: 'auto',
			block: 'center'
		});
		if (!document.querySelector(".stack-width").children[getElementIndex(canvas.parentElement) + 1].className.includes("multiple-choice-wrapper")) {
			setTimeout(function () {
				document.querySelector('.stack-width').classList.remove('blur-all-non-mc-questions')
			}, 100)
		}
	}
    componentHasUpdated() {

        var self = this;
        let element = document.querySelector(`[tapp-component="${this.id}"]`);
        if (!element) return;
        element.querySelector("input").onkeyup = function(event) {
            if (event.key === "Enter") {
                self.handleOptionClick(event.target.value)
            }
        } 
    }
    


	render(props) {
		if (!this.state.explanation) {
			this.setState("explanation", new ExplanationModal({
				points: this.state.points,
				coins: this.state.coins
			}, this))
		} else {
			this.state.explanation.state.points = this.state.points;
			this.state.explanation.state.coins = this.state.coins;
            //correct_chosen
			let returnStr = `<div>
	<div class="mc-answer-container mc-answer-container-embeded">
			<div class="mc-input-wrapper"><input value="${(this.parent.state.value || "").replace(/"/g, "&quot;")}" class="mc-input" style="width: 100%; box-sizing: border-box" placeholder="${(this.state.placeholder||"Answer Here").replace(/"/g, "&quot;")}"></div>
           
            <div class="ui-modal-buttons" style="margin-top: 20px; height: 36px; width: 100%; position: relative; display: block"><button onclick="{{_this}}.handleOptionClick(this.parentElement.parentElement.querySelector('input').value)" style="position: absolute; right: 0px; margin-right: 0">Submit</button></div>

            </div>`;
			returnStr += "<div>" + this.state.explanation.toString() + "</div>";
			returnStr += "</div>";
			return returnStr;
		}
		return "<div></div>";
	}
	closeModal() {
		this.parent.setState("data.selectedAnswer", null);
	}
}

class ShortAnswerWrapper extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
        if (this.state.status === null) {
            this.state.status =  "not_chosen" || "correct_chosen" || "incorrect_chosen"
        }
        if (this.state.value === null) {
            this.state.value =  ""
        }
		this.state.alreadyCorrectAnswer = false;
	}
	render(props) {
		var element = this.state
		const multipleChoice = new EmbeddedShortAnswer(element, this)
		return `<div>
				${multipleChoice}
			</div>`
	}
}

module.exports = ShortAnswerWrapper;

function getElementIndex(node) {
	var index = 0;
	while ((node = node.previousElementSibling)) {
		index++;
	}
	return index;
}