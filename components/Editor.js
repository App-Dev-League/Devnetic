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

// things to do: add tabindex and tabs to code editor
class Editor extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		
		var parentThis = this
		var tabindex = this.state.tabindex
		console.log(tabindex)
		async function loadCodeFromDb() {
			console.log(parentThis.parent.data().storage_id[tabindex])
			let text = await DB.getCode(parentThis.parent.data().storage_id[tabindex]);
			if (text === null) {
				text = parentThis.parent.data().default[tabindex]
				document.getElementById("code-editor-status").innerText = "Ready"
			}
			document.getElementById("code-frame").contentWindow.codeEditor.getModel().setValue(text);
			document.getElementById("code-frame").contentWindow.codeEditor.getAction("editor.action.formatDocument").run();
			document.getElementById("code-editor-status").innerText = "Ready"
		}
		function addThings() {
			function loadCode() {
				try {
					document.getElementById("preview").srcdoc = codeEditorHelper.getValue();
				} catch (err) {
					setTimeout(loadCode, 500);
				}
				window.addEventListener('beforeunload', function (e) {
					if (window.codeEditorSaved === false) {
						e.preventDefault();
						e.returnValue = '';
					}
				});
			}
			loadCode();
			function addEvent() {
				try {
					document.querySelectorAll(".tab")[1].addEventListener("click", handleClicks)
					function handleClicks(){
						setTimeout(function(){
							if (document.getElementById("preview")) document.getElementById("preview").srcdoc = codeEditorHelper.getValue();
						}, 100)
					}
					document.getElementById("code-editor-run-btn").onclick = async function(){
						document.getElementById("code-editor-status").innerText = "Saving..."
							await DB.setCode(parentThis.parent.data().storage_id[tabindex], codeEditorHelper.getValue())
							if (document.getElementById("preview")) document.getElementById("preview").srcdoc = codeEditorHelper.getValue();
							setTimeout(function () {
								document.getElementById("code-editor-status").innerText = "Ready"
							}, 500)
					}
					document.getElementById("code-frame").contentWindow.document.addEventListener("keydown", async function (e) {
						window.codeEditorSaved = false;
						if (e.key === 's' && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
							e.preventDefault();
							document.getElementById("code-editor-status").innerText = "Saving..."
							await DB.setCode(parentThis.parent.data().storage_id[tabindex], codeEditorHelper.getValue())
							if (document.getElementById("preview")) document.getElementById("preview").srcdoc = codeEditorHelper.getValue();
							window.codeEditorSaved = true;
							setTimeout(function () {
								document.getElementById("code-editor-status").innerText = "Ready"
							}, 500)
						}
					}, false);
					window.codeEditorSaved = true;
				} catch (err) {
					console.log(err)
					setTimeout(addEvent, 500)
				}
			}
			addEvent()

			window.startedRefresh = true
		}
		if (document.getElementById("code-frame")) {
			document.getElementById("code-frame").contentWindow.addEventListener("message", function (event) {
				if (event.data.message === "monacoloaded") {
					loadCodeFromDb()
					addThings()
				}
			}, false);
		}
		return `<div>
		<div class="code-editor-options">
			<span id="code-editor-status" style="display: inline-block; margin-left: 23px; margin-top: 10px;">Downloading code...</span>
			<span id="code-editor-run-btn" class="home-module home-module-complete" style="margin: 0; width: fit-content; padding-left: 20px; padding-right: 20px; margin-left: 20px; position: relative; z-index: 10">Run</span>
		</div>
		<div class="code-editor">
			<iframe id="code-frame" style="width: 100%; height: 100%; border: none" src="/assets/html/code-editor.html"></iframe>
		</div>
		</div>`;
	}

}


module.exports = Editor;