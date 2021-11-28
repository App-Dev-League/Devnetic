const codeTemplateToCode = require("../utils/codeTemplateToCode.js");
const codeEditorHelper = require("../utils/codeEditor.js");
const DB = require("../utils/Database.js");
const TabbedView = require("./TabbedView.js");

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

		var parentThis = this
		var tabindex = this.state.tabindex
		async function loadCodeFromDb() {
			let text = await DB.getCode(parentThis.parent.parent.data().storage_id[tabindex]);
			if (text === null) {
				text = parentThis.parent.parent.data().default[tabindex]
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
					document.querySelectorAll(".tab").forEach(element => {
						if (element.innerText === "Preview"){
							element.addEventListener("click", handleClicks)
						}
					})
					function handleClicks() {
						setTimeout(function () {
							if (document.getElementById("preview")) document.getElementById("preview").srcdoc = codeEditorHelper.getValue();
						}, 100)
					}
					document.getElementById("code-editor-run-btn").onclick = async function () {
						document.getElementById("code-editor-status").innerText = "Saving..."
						await DB.setCode(parentThis.parent.parent.data().storage_id[tabindex], codeEditorHelper.getValue())
						if (document.getElementById("preview")) document.getElementById("preview").srcdoc = codeEditorHelper.getValue();
						setTimeout(function () {
							document.getElementById("code-editor-status").innerText = "Ready"
						}, 500)
					}
					document.getElementById("code-frame").contentWindow.document.addEventListener("keydown", async function (e) {
						window.codeEditorSaved = false;
						if (e.keyCode === 82 && e.ctrlKey) {
							window.codeEditorSaved = true;
						}
						if (e.key === 's' && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
							e.preventDefault();
							document.getElementById("code-editor-status").innerText = "Saving..."
							await DB.setCode(parentThis.parent.parent.data().storage_id[tabindex], codeEditorHelper.getValue())
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

class TabbedEditor extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
		window.debug = this
		this.state.tabbedView = "Loading..."
		var tabs = [];
		this.state.tabs = tabs;
		this.x = false;
	}
	render() {
		var goodThis = this;
		var tabs = [];

		function getData() {
			if (goodThis.x === true) return;
			goodThis.x = true;
			if (goodThis.parent.data() === undefined) {
				return setTimeout(getData, 100)
			} else {
				var data = goodThis.parent.data()
				for (var i = 0; i < data.files.length; i++) {
					if (goodThis.state[data.storage_id[i]] == null) {
						console.log("Created new editor instance: ", data.storage_id[i])
						goodThis.state[data.storage_id[i]] = new Editor({ tabindex: i }, goodThis)
					}
					tabs.push({
						name: data.files[i],
						component: goodThis.state[data.storage_id[i]]
					})
					goodThis.state.tabs = tabs;
				}
				if (goodThis.state.tabbedView == "Loading...") {
					goodThis.state.tabbedView = new TabbedView({
						tabs: tabs
					}, goodThis);
				}
				//goodThis.render()
			}
		}
		getData()
		return `<div style="position: absolute; left: 0; width: 100%; transform: translateX(-50%);">
			${this.state.tabbedView}
		</div>`;
	}
}

module.exports = TabbedEditor;