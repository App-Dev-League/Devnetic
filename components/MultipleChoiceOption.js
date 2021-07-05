class MultipleChoiceOption extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		if(this.parent.parent.state.multiple_choice != null) {
			let colorIndex = this.parent.state.options.findIndex(option => option == this);
			if(colorIndex < 0) {
				colorIndex = this.state.index;
			}
			return `<div class="mc-answer mc-answer-${colorIndex}" onclick="{{_this}}.update();">
	<p>${tApp.escape(this.parent.parent.state.multiple_choice.answers[this.state.index])}</p>
</div>`;
		}
		return "<div></div>";
	}
	update() {
		this.parent.parent.setState("multiple_choice.selectedAnswer", this.state.index);
	}
}

module.exports = MultipleChoiceOption;