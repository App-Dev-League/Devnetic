class MultipleChoiceOption extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		if(this.parent.parent.state.data != null) {
			if (!this.parent.parent.state.data.answers[this.state.index] || this.parent.parent.state.data.answers[this.state.index] === "") return "<div></div>"
			return `<div class="mc-answer mc-answer-${this.state.index}" onclick="{{_this}}.update();">
	<p>${tApp.escape(this.parent.parent.state.data.answers[this.state.index])}</p>
</div>`;
		}
		return "<div></div>";
	}
	update() {
		this.parent.parent.setState("data.selectedAnswer", this.state.index);
	}
}

module.exports = MultipleChoiceOption;