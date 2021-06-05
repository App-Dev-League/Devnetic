class MultipleChoiceOption extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		return `<div class="mc-answer mc-answer-${this.state.index}" onclick="{{_this}}.update();">
	<p>${tApp.escape(this.parent.parent.state.multiple_choice.answers[this.state.index])}</p>
</div>`;
	}
	update() {
		this.parent.parent.setState("multiple_choice.selectedAnswer", this.state.index);
	}
}

module.exports = MultipleChoiceOption;