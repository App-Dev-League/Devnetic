const codeTemplateToCode = require("../utils/codeTemplateToCode.js");
const codeEditorHelper = require("../utils/codeEditor.js");
const DB = require("../utils/Database.js");

// ways to use codeEditorHelper: (all methods are synchronous)
/*
codeEditorHelper.updateLanguage("new language")
codeEditorHelper.updateContent("New content to be displayed")
let value = codeEditorHelper.getValue()
codeEditorHelper.insertAtCursor("asdf")
*/

// things to do: add the "saving/saved" indicators
class Editor extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		var parentThis = this
		async function loadCodeFromDb() {
			console.log(parentThis.parent.data().storage_id[0])
			let text = await DB.getCode(parentThis.parent.data().storage_id[0]);
			if (text === null) {
				text = parentThis.parent.data().default[0]
			}
			document.getElementById("code-frame").contentWindow.codeEditor.getModel().setValue(text);
			document.getElementById("code-frame").contentWindow.codeEditor.getAction("editor.action.formatDocument").run();
		}
		function addThings(){
			function loadCode(){
				try {
					document.getElementById("preview").srcdoc = codeEditorHelper.getValue();
				}catch(err){
					setTimeout(loadCode, 500);
				}
			}
			loadCode();
			function addEvent(){
				try {
					document.getElementById("code-frame").contentWindow.document.addEventListener("keydown", function(e) {
						if (e.key === 's' && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
						  e.preventDefault();
						  document.getElementById("preview").srcdoc = codeEditorHelper.getValue();
						  DB.setCode(parentThis.parent.data().storage_id[0], codeEditorHelper.getValue())
						}
					  }, false);
				}catch(err){
					setTimeout(addEvent, 500)
				}
			}
			addEvent()
	
			window.startedRefresh = true
		}
		if (document.getElementById("code-frame")){
			document.getElementById("code-frame").contentWindow.addEventListener("message", function(event){
				if (event.data.message === "monacoloaded") {
					loadCodeFromDb()
					addThings()
				}
			}, false);
		}
		return `<div class="code-editor">
			<iframe id="code-frame" style="width: 100%; height: 100%; border: none" src="/assets/html/code-editor.html"></iframe>
		</div>`;
	}

}


module.exports = Editor;