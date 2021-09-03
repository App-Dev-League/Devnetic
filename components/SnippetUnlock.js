const codeTemplateToCode = require("../utils/codeTemplateToCode.js");

class SnippetUnlock extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		if(this.parent.state.snippet_unlock != null) {
			return `<div>
	<h1 class="info-title">Snippet Unlocked: ${tApp.escape(this.parent.state.snippet_unlock.name || "")}!</h1>
	<pre class="info-text">${codeTemplateToCode(this.parent.state.snippet_unlock.description || "")}</pre>
	<div class="codeblock info-codeblock">
		<pre>${codeTemplateToCode(this.parent.state.snippet_unlock.code_template || "")}</pre>
	</div>
	<button class="info-button" onclick="{{_this}}.parent.next();">Continue</button>
</div>`;
		}
		return "<div></div>";
	}
}

module.exports = SnippetUnlock;