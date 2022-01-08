class Input extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
		if(this.state.value == null) {
			this.state.value = "";
		}
		if(this.state.classList == null) {
			this.state.classList = [];
		}
		if(this.state.properties == null) {
			this.state.properties = [];
		}
		if(this.state.type == null) {
			this.state.type = "text";
		}
	}
	render(props) {
		return `<input class="${this.state.classList.join(" ")}" type="${this.state.type}" ${this.state.properties.join(" ")} oninput="{{_this}}.setState('value', this.value)" onkeydown="if(event.key==='Enter'){tApp.getComponentFromDOM(document.getElementsByClassName('short-answer-container')[0]).update()}" value="${tApp.escape(this.state.value)}"/>`;
	}
}

module.exports = Input;