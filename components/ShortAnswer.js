const ModuleComponent = require("./ModuleComponent.js");

const ExplanationModal = require("./ExplanationModal.js");
const Input = require("./Input.js");
const codeBlock = require("./codeBlock.js");

class ShortAnswer extends ModuleComponent {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		if(this.data() != null) {
			if(this.state.explanation == null) {
				this.state.explanation = new ExplanationModal({
					points: this.data().points,
					coins: this.data().coins
				}, this);
			} else {
				this.state.explanation.state.points = this.data().points;
				this.state.explanation.state.coins = this.data().coins;
			}
			if(this.state.input == null) {
				this.state.input = new Input({
					classList: ["short-answer-input"],
					type: "text",
					properties: {
						"autofocus": "", 
						"onkeyup": "{{_this}}.state.update()"
					},
					update: () => {if(event.key === "Enter"){this.update()}}
				}, this);
			}
			if(this.data().value == null) {
				this.data().value = "";
			}
			let returnStr = `<div>
	<h1 class="mc-question">${tApp.escape(this.data().question || "")}</h1>
	<div class="codeblock-wrapper mc-codeblock">
		${new codeBlock({code: this.data().code || "", language: this.data().lang, name: this.data().name})}

	</div>
	<div class="short-answer-container">
		${this.state.input}
		<button class="short-answer-button" onclick="{{_this}}.update();">Submit</button>
	</div>`;
			if(this.data().selectedAnswer != null) {
				let data = this.data();
				this.state.explanation.state.description = data.descriptions[data.selectedAnswer] || data.description_default;
				
				if(data.answers.includes(data.selectedAnswer)) {
					this.state.explanation.state.title = "Correct!";
					this.state.explanation.state.retry = false;
				} else {
					this.state.explanation.state.title = "Incorrect!";
					this.state.explanation.state.retry = true;
				}
			} else {
				this.state.explanation.state.title = "";
			}
			returnStr += "<div>" + this.state.explanation.toString() + "</div>";
			returnStr += "</div>";
			return returnStr;
		}
		return "<div></div>";
	}
	update() {
		this.parent.setState("data.selectedAnswer", this.state.input.state.value);
	}
	closeModal() {
		this.parent.setState("data.selectedAnswer", null);
	}
}

module.exports = ShortAnswer;