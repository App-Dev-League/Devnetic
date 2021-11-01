const codeTemplateToCode = require("../utils/codeTemplateToCode.js");
const codeEditorHelp = require("../utils/codeEditor.js");

class Editor extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		if (window.loadedEditor !== true) {
			window.loadedEditor = true
			loadRequire.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@0.29.1/min/vs' } });
			loadRequire(['vs/editor/editor.main'], function () {
				window.codeEditor = monaco.editor.create(document.getElementById('code-container'), {
					value: `<!DOCTYPE>
	
	<html>
	</html>
						`,
					language: 'html',
					theme: "vs-dark",
					automaticLayout: true
				});
			});
		}

		return `<div class="code-editor">
			<div id="code-container" style="width:100%;height:96%;border:1px solid grey; margin-top: 20px"></div>
			<script>
			</script>
		</div>`;
	}

}


module.exports = Editor;