const codeTemplateToCode = require("../utils/codeTemplateToCode.js");

class CodeEditor extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		if(this.parent.state.code_editor != null) {
			return `<div>
	<button class="info-button" onclick="{{_this}}.parent.next();">Continue</button>
</div>`;
		}
		return "<div></div>";
	}
}

module.exports = CodeEditor;