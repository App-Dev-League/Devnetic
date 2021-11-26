const ModuleComponent = require("./ModuleComponent.js");

const codeTemplateToCode = require("../utils/codeTemplateToCode.js");

class SnippetUnlock extends ModuleComponent {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		if(this.data() != null) {
			return `<div>
	<h1 class="info-title">Snippet Unlocked: ${tApp.escape(this.data().name || "")}!</h1>
	<pre class="info-text">${codeTemplateToCode(this.data().description || "")}</pre>
	<div class="codeblock info-codeblock">
		<pre>${codeTemplateToCode(this.data().code_template || "")}</pre>
	</div>
	<button class="info-button" onclick="{{_this}}.parent.next();">Continue</button>
</div>`;
		}
		return "<div></div>";
	}
}

module.exports = SnippetUnlock;