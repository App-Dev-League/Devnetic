const ModuleComponent = require("./ModuleComponent.js");
const renderElement = require("../utils/renderElement.js");
const renderMdd = require("../utils/renderMdd.js")

class Information extends ModuleComponent {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		if(this.data() != null) {
			return `<div class="information-wrapper animate-out">
				<div class="stack-width-wrapper">
					<div class="stack-width">
						<h1 class="info-title">${tApp.escape(this.data().title || "")}</h1>
						${this.data().mdd ? renderMdd(this.data().mdd)
							:
							(this.data().elements || []).map((element, i) => {
							return renderElement(element, i)
						}).join("")}
						<button class="info-button" id="continue-button" onclick="{{_this}}.parent.next();">Continue</button>
					</div>
				</div>
			</div>`;
		}
		return "<div></div>";
	}
}

module.exports = Information;