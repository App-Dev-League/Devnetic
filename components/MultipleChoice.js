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
		if(this.state.explanation == null) {
			this.state.explanation = new ExplanationModal({}, this);
		}
	}
	render(props) {
		let returnStr = `<div>
	<h1 class="mc-question">${tApp.escape(this.parent.state.multiple_choice.question)}</h1>
	<div class="mc-codeblock">
		<pre>${this.parent.state.multiple_choice.code}</pre>
	</div>
	<div class="mc-answer-table">
		<div class="mc-answer-container">
			${this.state.options[0]}
			${this.state.options[1]}
			${this.state.options[2]}
			${this.state.options[3]}
		</div>
	</div>`;
		if(this.parent.state.multiple_choice.selectedAnswer != null) {
			let multiple_choice = this.parent.state.multiple_choice;
			this.state.explanation.state.description = multiple_choice.descriptions[multiple_choice.selectedAnswer];
			
			if(multiple_choice.selectedAnswer == multiple_choice.correct) {
				this.state.explanation.state.title = "Correct!";
				this.state.explanation.state.retry = false;
				/*returnStr = `<div>
		<h1 class="mc-question">Correct!</h1>
		<center><button onclick="{{_this}}.parent.setState('multiple_choice.selectedAnswer', null);" style="color: black">Back</button></center>
	</div>`;*/
			} else {
				this.state.explanation.state.title = "Incorrect!";
				this.state.explanation.state.retry = true;
				/*returnStr = `<div>
		<h1 class="mc-question">Incorrect!</h1>
		<center><button onclick="{{_this}}.parent.setState('multiple_choice.selectedAnswer', null);" style="color: black">Back</button></center>
	</div>`;*/
			}
			returnStr += this.state.explanation.toString();
		}
		returnStr += "</div>";
		return returnStr;
	}
}

module.exports = MultipleChoice;