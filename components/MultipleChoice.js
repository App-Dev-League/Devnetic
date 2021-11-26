const ExplanationModal = require("./ExplanationModal.js");
const MultipleChoiceOption = require("./MultipleChoiceOption.js");

class MultipleChoice extends tApp.Component {
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
		if(this.parent.state.data != null && this.parent.state.data.question != null) {
			if(this.state.explanation == null) {
				this.state.explanation = new ExplanationModal({
					points: this.parent.state.data.points,
					coins: this.parent.state.data.coins
				}, this);
			} else {
				this.state.explanation.state.points = this.parent.state.data.points;
				this.state.explanation.state.coins = this.parent.state.data.coins;
			}
			let returnStr = `<div>
	<h1 class="mc-question">${tApp.escape(this.parent.state.data.question || "")}</h1>
	<div class="codeblock mc-codeblock">
		<pre>${this.parent.state.data.code || ""}</pre>
	</div>
	<div class="mc-answer-table">
		<div class="mc-answer-container">
			${this.state.options[0]}
			${this.state.options[1]}
			${this.state.options[2]}
			${this.state.options[3]}
		</div>
	</div>`;
			if(this.parent.state.data.selectedAnswer != null) {
				let data = this.parent.state.data;
				this.state.explanation.state.description = data.descriptions[data.selectedAnswer];
				
				if(data.selectedAnswer == data.correct) {
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