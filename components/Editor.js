const codeTemplateToCode = require("../utils/codeTemplateToCode.js");

class Editor extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		return `<div class="code-editor"></div>`;
	}
}

module.exports = Editor;