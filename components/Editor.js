const codeTemplateToCode = require("../utils/codeTemplateToCode.js");
const codeEditorHelper = require("../utils/codeEditor.js");
const DB = require("../utils/Database.js");
const TabbedView = require("./TabbedView.js");
const plugins = require("../utils/plugins.js");
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
		let languages = {
			"html": "html",
			"py": "python"
		}
		var parentThis = this
		var tabindex = this.state.tabindex

		console.log("Editor number " + tabindex + " is rendering")
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
					codeEditorHelper.setCurrentEditorIndex(tabindex)
					document.querySelectorAll(".tab").forEach(element => {
						if (element.innerText === "Preview") {
							element.addEventListener("click", handleClicks)
						}
					})
					function handleClicks() {
						setTimeout(function () {
							let fileType = parentThis.parent.parent.data().storage_id[tabindex].split('.').pop().toLowerCase()
							updatePreview(fileType)
						}, 100)
					}
					document.getElementById("code-editor-run-btn").onclick = async function () {
						document.getElementById("code-editor-status").innerText = "Saving..."
						await DB.setCode(parentThis.parent.parent.data().storage_id[tabindex], codeEditorHelper.getValue())
						let fileType = parentThis.parent.parent.data().storage_id[tabindex].split('.').pop().toLowerCase()
						updatePreview(fileType)
						setTimeout(function () {
							document.getElementById("code-editor-status").innerText = "Ready"
						}, 500)
					}
					function updatePreview(fileType){
						if (!window.lastUpdatePreview) window.lastUpdatePreview = 0
						if (window.lastUpdatePreview + 100 > Date.now()) return;
						window.lastUpdatePreview = Date.now()

						if (window.lastTab !== tabindex) {
							document.getElementById("console-bridge").dispatchEvent(new Event('change'));
						}
						window.lastTab = tabindex;

						if (fileType === "html"){
							if (document.getElementById("preview")) document.getElementById("preview").srcdoc = codeEditorHelper.getValue();
						}else if (fileType === "cpp"){
							plugins.load("jscpp")
							console.log("running cpp")
							var code = "#include <iostream>"+
										"using namespace std;"+
										"int main() {"+
										"    int a;"+
										"    cin >> a;"+
										"    cout << a << endl;"+
										"    return 0;"+
										"}"
							;
							var input = "4321";
							var output = "";
							var config = {
								stdio: {
									write: function(s) {
										output += s;
									}
								}
							};
							var exitCode = JSCPP.run(code, input, config);
							alert(output + "\nprogram exited with code " + exitCode);
						}else if (fileType === "py"){
							document.getElementById("console-bridge").dispatchEvent(new Event('change'));
							window.consoleLogs = []
							try{
								let remove = document.querySelector(".queued-python-script")
								if (remove) remove.parentElement.removeChild(remove)
								plugins.unload("brython")
							}catch(err){}
							let s = document.createElement("script");
							window.consoleLogs.push(["Starting python emulator..."])
							document.getElementById("console-bridge").click()
							let preScript = `
import sys
import browser
_print = print
def print(*args, **kw):
	browser.window.consoleLogs.append(args)
	browser.window.document.getElementById("console-bridge").click()
	_print(*args, **kw)
sys.stderr = print
							`
							s.type = "text/python";
							s.innerHTML = preScript+"\n"+codeEditorHelper.getValue();
							s.classList = "queued-python-script";
							document.body.appendChild(s)
							plugins.load("brython")
							try{
								brython({pythonpath: ["/assets/plugins/brython/modules/"], cache: true, debug: 1})
							}catch(err){
								window.consoleLogs.push([err.toString(), err.stack])
								document.getElementById("console-bridge").click()
							}
						}
					}
					document.getElementById("code-frame").contentWindow.document.onkeydown =  async function (e) {
						window.codeEditorSaved = false;
						if (e.keyCode === 82 && e.ctrlKey) {
							window.codeEditorSaved = true;
						}
						if (e.key === 's' && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
							e.preventDefault();
							document.getElementById("code-editor-status").innerText = "Saving..."
							await DB.setCode(parentThis.parent.parent.data().storage_id[codeEditorHelper.getCurrentEditorIndex()], codeEditorHelper.getValue())
							let fileType = parentThis.parent.parent.data().storage_id[tabindex].split('.').pop().toLowerCase()
							if (fileType === "html") updatePreview(fileType)
							window.codeEditorSaved = true;
							setTimeout(function () {
								document.getElementById("code-editor-status").innerText = "Ready"
							}, 500)
						}
					}
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
			if (window.monacoAlreadyLoaded === true) {
				loadCodeFromDb()
				addThings()
				let fileType = parentThis.parent.parent.data().storage_id[tabindex].split('.').pop().toLowerCase()
				codeEditorHelper.updateLanguage(languages[fileType])
			}else{
				document.getElementById("code-frame").contentWindow.addEventListener("message", function (event) {
					if (event.data.message === "monacoloaded") {
						window.monacoAlreadyLoaded = true;
						loadCodeFromDb()
						addThings()
						let fileType = parentThis.parent.parent.data().storage_id[tabindex].split('.').pop().toLowerCase()
						codeEditorHelper.updateLanguage(languages[fileType])
						try {
							plugins.load("betterEditor")
						}catch(err){
							
						}
					}
				}, false);
			}
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
				console.log(tabs)
			}
		}
		getData()
		return `<div style="position: absolute; left: 0; width: 100%; transform: translateX(-50%);">
			${this.state.tabbedView}
		</div>`;
	}
}

module.exports = TabbedEditor;