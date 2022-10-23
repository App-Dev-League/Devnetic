const ModuleComponent = require("./ModuleComponent.js");

const renderElement = require("../utils/renderElement.js");

class Congratulations extends ModuleComponent {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		if(this.data() != null) {
			return `<div class="information-wrapper">
			<div class="left-panel" id="progress-panel">
				<span class="panel-title"></span>
			</div>
			<div class="stack-width-wrapper">
				<div class="stack-width">
					<h1 class="info-title">${tApp.escape(this.data().title || "")}</h1>
					${(this.data().elements || []).map((element, i) => {
						return renderElement(element, i)
					}).join("")}
					<button class="info-button" id="continue-button" onclick="{{_this}}.parent.next();">Next Module</button>
				</div>
			</div>
			</div>`;
		}
		return "<div></div>";
	}
}

module.exports = Congratulations;