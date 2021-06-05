class ExplanationModal extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
		if(this.state.title == null) {
			this.state.title = "";
		}
		if(this.state.description == null) {
			this.state.description = "";
		}
		if(this.state.retry == null) {
			this.state.retry = true;
		}
	}
	render(props) {
		return `<div class="explanation-wrapper">
	<div class="explanation-modal">
		<center>
			<h3>${tApp.escape(this.state.title)}</h3>
			<p>${tApp.escape(this.state.description)}</p>
			{% if(state.retry) %}
			<button class="button-incorrect" onclick="{{_this}}.parent.parent.setState('multiple_choice.selectedAnswer', null);">Try Again</button>
			{% else %}
			<button class="button-correct" onclick="{{_this}}.parent.parent.next();">Next</button>
			{% endif %}
		</center>
	</div>
</div>`;
	}
}

module.exports = ExplanationModal;