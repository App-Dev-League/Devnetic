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
			this.state.properties = {};
		}
		if(this.state.type == null) {
			this.state.type = "text";
		}
    if (this.state.onChange == null) {
			this.state.onChange = function() {};
		}
		if(this.state.update == null) {
			this.state.update = () => {};
		}
	}
	render(props) {
		return `<input 
			class="${this.state.classList.join(" ")}" 
			type="${this.state.type}" 
			value="${tApp.escape(this.state.value)}"
			oninput="{{_this}}.setState('value', this.value); {{_this}}.state.onChange()"
			${Object.keys(this.state.properties).map(i => `${i}="${this.state.properties[i]}"`).join(" ")}
		/>`;
	}
}

module.exports = Input;