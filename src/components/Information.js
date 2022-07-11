const ModuleComponent = require("./ModuleComponent.js");
const renderElement = require("../utils/renderElement.js");

class Information extends ModuleComponent {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		if(this.data() != null) {
			return `<div class="stack-width">
	<h1 class="info-title">${tApp.escape(this.data().title || "")}</h1>
	${(this.data().elements || []).map(element => {
		return renderElement(element)
	}).join("")}
	<button class="info-button" id="continue-button" onclick="{{_this}}.parent.next();">Continue</button>
</div>`;
		}
		return "<div></div>";
	}
}

module.exports = Information;