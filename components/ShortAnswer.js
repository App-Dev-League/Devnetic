const ExplanationModal = require("./ExplanationModal.js");
const Input = require("./Input.js");

class ShortAnswer extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		if(this.parent.state.data != null) {
			if(this.state.explanation == null) {
				this.state.explanation = new ExplanationModal({
					points: this.parent.state.data.points,
					coins: this.parent.state.data.coins
				}, this);
			} else {
				this.state.explanation.state.points = this.parent.state.data.points;
				this.state.explanation.state.coins = this.parent.state.data.coins;
			}
			if(this.state.input == null) {
				this.state.input = new Input({
					classList: ["short-answer-input"],
					type: "text"
				});
			}
			if(this.parent.state.data.value == null) {
				this.parent.state.data.value = "";
			}
			let returnStr = `<div>
	<h1 class="mc-question">${tApp.escape(this.parent.state.data.question || "")}</h1>
	<div class="codeblock mc-codeblock">
		<pre>${this.parent.state.data.code || ""}</pre>
	</div>
	<div class="short-answer-container">
		${this.state.input}
		<button class="short-answer-button" onclick="{{_this}}.update();">Submit</button>
	</div>`;
			if(this.parent.state.data.selectedAnswer != null) {
				let data = this.parent.state.data;
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