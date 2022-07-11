const ModuleComponent = require("./ModuleComponent.js");

const renderElement = require("../utils/renderElement.js");

class Congratulations extends ModuleComponent {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		if(this.data() != null) {
			return `<div>
	<h1 class="info-title">${tApp.escape(this.data().title || "")}</h1>
	${(this.data().elements || []).map(element => {
		return renderElement(element)
	}).join("")}
	<button class="info-button" id="continue-button" onclick="{{_this}}.parent.next();">Next Module</button>
</div>`;
		}
		return "<div></div>";
	}
}

module.exports = Congratulations;