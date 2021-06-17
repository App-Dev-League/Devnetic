const ExplanationModal = require("./ExplanationModal.js");

class ShortAnswer extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
		if(this.state.explanation == null) {
			this.state.explanation = new ExplanationModal({}, this);
		}
	}
	render(props) {
		if(this.parent.state.short_answer != null) {
			if(this.parent.state.short_answer.value == null) {
				this.parent.state.short_answer.value = "";
			}
			let returnStr = `<div>
	<h1 class="mc-question">${tApp.escape(this.parent.state.short_answer.question || "")}</h1>
	<div class="mc-codeblock">
		<pre>${this.parent.state.short_answer.code || ""}</pre>
	</div>
	<div class="short-answer-container">
		<input class="short-answer-input" type="text" oninput="{{_this}}.parent.setState('short_answer.value', this.value)" value="${tApp.escape(this.parent.state.short_answer.value)}" />
		<button class="short-answer-button" onclick="{{_this}}.update();">Submit</button>
	</div>`;
			if(this.parent.state.short_answer.selectedAnswer != null) {
				let short_answer = this.parent.state.short_answer;
				this.state.explanation.state.description = short_answer.descriptions[short_answer.selectedAnswer] || short_answer.description_default;
				
				if(short_answer.answers.includes(short_answer.selectedAnswer)) {
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
		this.parent.setState("short_answer.selectedAnswer", this.parent.state.short_answer.value);
	}
	closeModal() {
		this.parent.setState("short_answer.selectedAnswer", null);
	}
}

module.exports = ShortAnswer;