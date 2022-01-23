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
								let remove = document.querySelector("#python-execution-thread")
								if (remove){
									remove.parentElement.removeChild(remove)
								}
								plugins.unload("brython")
							}catch(err){}
							window.consoleLogs.push(["Starting python emulator..."])
							document.getElementById("console-bridge").click()
							let main = Math.random().toString(36).substring(7)
							let preScript = `
import sys
import browser
from browser import aio
_print = print
def print(*args, **kw):
	browser.window.newLog(args)
sys.stderr = print
async def input(text):
	print(text)
	browser.window.enableInput()
	await aio.event(browser.window.document.getElementById("python-sandbox-bridge"), "click")
	value = browser.window.getInput()
	browser.window.disableInput()
	return value
async def ${main}():
`
const indentRegex = false ? /^/gm : /^(?!\s*$)/gm;
let postScript = codeEditorHelper.getValue().replace(indentRegex, '    ').replace(/time\.sleep(?=(?:(?:[^"]*"){2})*[^"]*$)/g, "await aio.sleep").replace(/input(?=(?:(?:[^"]*"){2})*[^"]*$)/g, "await input")
let pps = `
aio.run(${main}())
`
							try{
								if (!window.__BRYTHON__) {
									plugins.load("brython")	
									brython({pythonpath: ["/assets/plugins/brython/modules/"], cache: true, debug: 1})
								}
							}catch(err){
								window.consoleLogs.push(["We couldn't find the necessary plugins to run python files! Please install brython in the plugins panel."])
								document.getElementById("console-bridge").click()
							}
							try {
								window.URL = window.URL || window.webkitURL;
								let code =  preScript+"\n"+postScript+"\n"+pps
								console.log(code)
								let pureJs = __BRYTHON__.python_to_js(code)
								if (document.getElementById("python-execution-thread")){
									let elem = document.getElementById("python-execution-thread")
									elem.parentElement.removeChild(elem)
								}
								let iframe = document.createElement("iframe")
								iframe.style.width = 0
								iframe.style.height = 0
								iframe.id = "python-execution-thread"
								iframe.srcdoc = `
								<html>
									<body>
										<div id="python-sandbox-bridge"></div>
									</body>
								</html>
								<script>
								${plugins.getCode("brython")}
								</script>
								<script>
								brython({pythonpath: ["/assets/plugins/brython/modules/"], cache: true, debug: 1})
								eval(__BRYTHON__.python_to_js(window.pyjsCode))
								</script>
								`
								document.body.appendChild(iframe)
								iframe.contentWindow.newLog = function(log){
									console.log("python-log", log)
									window.consoleLogs.push(log)
									window.document.getElementById("console-bridge").click()
								}
								iframe.contentWindow.pyjsCode = code
								iframe.contentWindow.enableInput = function(){
									document.querySelector(".console-input").disabled = false
								}
								iframe.contentWindow.disableInput = function(){
									document.querySelector(".console-input").disabled = true
									document.querySelector(".console-input").value = ""
								}
								iframe.contentWindow.getInput = function(){
									return document.querySelector(".console-input").value
								}
							}catch(err){
								window.consoleLogs.push([err.toString(), err.stack])
								document.getElementById("console-bridge").click()
								throw err
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
		return `<div id="code-editor-tab">
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