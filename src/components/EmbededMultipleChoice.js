const ModuleComponent = require("./ModuleComponent.js");

const ExplanationModal = require("./ExplanationModal.js");

class EmbededMultipleChoice extends ModuleComponent {
	constructor(state, parent) {
		super(state, parent);
	}
	handleOptionClick(optionIndex) {
		if (this.parent.state.options[optionIndex].status === "incorrect_chosen") return;
		this.state.explanation.state.description = this.state.descriptions[optionIndex]
		if (optionIndex === this.state.correct) {
			this.state.explanation.state.title = "Correct!";
			this.state.explanation.state.retry = false;
			this.parent.state.options[optionIndex].status = "correct_chosen"
		} else {
			this.state.explanation.state.title = "Incorrect!";
			this.state.explanation.state.retry = true;
			this.parent.state.options[optionIndex].status = "incorrect_chosen"
		}
		this.setState("options", this.state.options)
	}
	correct() {
		this.state.explanation.setState("title", "")
		if (this.parent.state.alreadyCorrectAnswer === true) return;
		this.parent.state.alreadyCorrectAnswer = true;
		tApp.getComponentFromDOM(document.querySelector(".stack-width")).increaseCompletedQuestions();
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
		document.querySelector(".stack-width").children[getElementIndex(canvas.parentElement)+1].scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
        });
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
			let returnStr = `<div>
	<div class="mc-answer-container mc-answer-container-embeded">
			${this.state.answers.map((answer, index) => {
				if (!answer) return;
				return `
					<button class="mc-answer-option ${this.parent.state.options[index].status}" onclick="{{_this}}.handleOptionClick(${index})">
						<span class="number">${index + 1}</span>
						<span class="text">${answer}</span>
					</button>
				`
			}).join("")}
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

class MultipleChoiceWrapper extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
		if (this.state.options == null) {
			this.state.options = [];
			this.state.answers.forEach(element => {
				this.state.options.push({
					status: "not_chosen" || "correct_chosen" || "incorrect_chosen"
				})
			})
		}
		this.state.alreadyCorrectAnswer = false;
	}
	render(props) {
		var element = this.state
		const multipleChoice = new EmbededMultipleChoice({ answers: element.answers, correct: element.correct, descriptions: element.descriptions, points: element.points, coins: element.coins }, this)
		return `<div>
				${multipleChoice}
			</div>`
	}
}

module.exports = MultipleChoiceWrapper;

function getElementIndex(node) {
    var index = 0;
    while ( (node = node.previousElementSibling) ) {
        index++;
    }
    return index;
}