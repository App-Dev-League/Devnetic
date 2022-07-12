const ModuleComponent = require("./ModuleComponent.js");

const ExplanationModal = require("./ExplanationModal.js");
const MultipleChoiceOption = require("./MultipleChoiceOption.js");
const codeBlock = require("./codeBlock.js");

class MultipleChoice extends ModuleComponent {
	constructor(state, parent) {
		super(state, parent);
		if(this.state.options == null) {
			this.state.options = {};
		}
		if(this.state.options[0] == null) {
			this.state.options[0] = new MultipleChoiceOption({index: 0}, this);
		}
		if(this.state.options[1] == null) {
			this.state.options[1] = new MultipleChoiceOption({index: 1}, this);
		}
		if(this.state.options[2] == null) {
			this.state.options[2] = new MultipleChoiceOption({index: 2}, this);
		}
		if(this.state.options[3] == null) {
			this.state.options[3] = new MultipleChoiceOption({index: 3}, this);
		}
	}
	render(props) {
		if(this.data() != null && this.data().question != null) {
			if(this.state.explanation == null) {
				this.state.explanation = new ExplanationModal({
					points: this.data().points,
					coins: this.data().coins
				}, this);
			} else {
				this.state.explanation.state.points = this.data().points;
				this.state.explanation.state.coins = this.data().coins;
			}
			let returnStr = `<div>
	<h1 class="mc-question">${tApp.escape(this.data().question || "")}</h1>
	<div class="mc-codeblock codeblock-wrapper stack-width">
		${new codeBlock({code: this.data().code || "", language: this.data().lang})}
	</div>
	<div class="mc-answer-table stack-width">
		<div class="mc-answer-container">
			${!this.state.options[0].toString().includes("<p>") ? "" : this.state.options[0]}
			${!this.state.options[1].toString().includes("<p>") ? "" : this.state.options[1]}
			${!this.state.options[2].toString().includes("<p>") ? "" : this.state.options[2]}
			${!this.state.options[3].toString().includes("<p>") ? "" : this.state.options[3]}
		</div>
	</div>`;
			if(this.data().selectedAnswer != null) {
				let data = this.data();
				this.state.explanation.state.description = data.descriptions[data.selectedAnswer];
				if(data.selectedAnswer == data.correct || (Array.isArray(data.correct) && data.correct.includes(data.selectedAnswer))) {
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
	closeModal() {
		this.parent.setState("data.selectedAnswer", null);
	}
}

module.exports = MultipleChoice;