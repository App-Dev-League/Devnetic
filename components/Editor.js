const codeTemplateToCode = require("../utils/codeTemplateToCode.js");
const codeEditorHelper = require("../utils/codeEditor.js");


// ways to use codeEditorHelper: (all methods are synchronous)
/*
codeEditorHelper.updateLanguage("new language")
codeEditorHelper.updateContent("New content to be displayed")
let value = codeEditorHelper.getValue()
codeEditorHelper.insertAtCursor("asdf")
*/
class Editor extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		return `<div class="code-editor">
			<iframe id="code-frame" style="width: 100%; height: 100%; border: none" src="/assets/html/code-editor.html"></iframe>
		</div>`;
	}

}


module.exports = Editor;