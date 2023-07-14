const ModuleComponent = require("./ModuleComponent.js");

const codeTemplateToCode = require("../utils/codeTemplateToCode.js");
const codeBlock = require("./codeBlock.js");

class SnippetUnlock extends ModuleComponent {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		if (this.data() != null) {
			this.parent.state.Database.storeSnippet(this.data().snippet);
			return `<div class="information-wrapper animate-out">
		<div class="stack-width-wrapper">
		<div class="stack-width">
	<h1 class="info-title">Snippet Unlocked: ${tApp.escape(this.data().name || "")}!</h1>
	<pre class="info-text">${codeTemplateToCode(this.data().description || "")}</pre>
	<div class="codeblock-wrapper">
	${new codeBlock({ code: this.data().code, language: this.data().lang, name: this.data().name}, this)}
		</div>
	<button class="info-button" id="continue-button" onclick="{{_this}}.parent.next();">Continue</button>
</div>
</div>
</div>`;
		}
		return "<div></div>";
	}
}

module.exports = SnippetUnlock;