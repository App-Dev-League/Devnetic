const codeTemplateToCode = require("../utils/codeTemplateToCode.js");

class Congratulations extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		if(this.parent.state.congratulations != null) {
			return `<div>
	<h1 class="info-title">${tApp.escape(this.parent.state.congratulations.title || "")}</h1>
	${(this.parent.state.congratulations.elements || []).map(element => {
		if(element.type == "code") {
			return `<div class="codeblock info-codeblock">
	<pre>${codeTemplateToCode(element.content || "")}</pre>
</div>`
		} else {
			return `<pre class="info-text">${codeTemplateToCode(element.content || "")}</pre>`;
		}
	}).join("")}
	<button class="info-button" onclick="{{_this}}.parent.next();">Next Module</button>
</div>`;
		}
		return "<div></div>";
	}
}

module.exports = Congratulations;