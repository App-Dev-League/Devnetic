const ModuleComponent = require("./ModuleComponent.js");

const codeTemplateToCode = require("../utils/codeTemplateToCode.js");

class Information extends ModuleComponent {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		if(this.data() != null) {
			return `<div>
	<h1 class="info-title">${tApp.escape(this.data().title || "")}</h1>
	${(this.data().elements || []).map(element => {
		if(element.type == "code") {
			return `<div class="codeblock info-codeblock">
	<pre>${codeTemplateToCode(element.content || "")}</pre>
</div>`
		} else {
			return `<pre class="info-text">${codeTemplateToCode(element.content || "")}</pre>`;
		}
	}).join("")}
	<button class="info-button" onclick="{{_this}}.parent.next();">Continue</button>
</div>`;
		}
		return "<div></div>";
	}
}

module.exports = Information;