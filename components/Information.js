const codeTemplateToCode = require("../utils/codeTemplateToCode.js");

class Information extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		if(this.parent.state.information != null) {
			return `<div>
	<h1 class="info-title">${tApp.escape(this.parent.state.information.title || "")}</h1>
	${(this.parent.state.information.elements || []).map(element => {
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