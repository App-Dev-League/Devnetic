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
function makeid(length) {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() *
			charactersLength));
	}
	return result;
}

class Editor extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		var self = this;
		var shownNoPluginMessage = false;
		let languages = {
			"html": "html",
			"py": "python",
			"md": "markdown",
			"js": "javascript",
			"jsx": "javascript",
			"css": "css",
			"ts": "typescript"
		}
		var parentThis = this
		var tabindex = this.state.tabindex
		var storageId = this.state.storage_id;
		var filename = parentThis.parent.parent.data().files[tabindex] || this.state.file.filename;

		console.log("Editor number " + tabindex + " is rendering")
		if (document.getElementById("code-editor-run-btn") && filename.split('.').pop().toLowerCase() === "html") {
			setTimeout(function () {
				document.getElementById("code-editor-run-btn").click()
			}, 100)
		}

		async function loadCodeFromDb() {
			if (self.state.file) {
				var text = await codeEditorHelper.getFileWithId(self.state.file.fileid)
				text = text.code;
			} else {
				var text = await DB.getCode(parentThis.parent.parent.data().storage_id[tabindex]);
			}
			if (text === null) {
				text = parentThis.parent.parent.data().default[tabindex]
				document.getElementById("code-editor-status").innerText = "Ready"
			}
			if (self.state.file && (self.state.file.filename.endsWith(".png") || self.state.file.filename.endsWith(".jpg") || self.state.file.filename.endsWith(".jpeg") || self.state.file.filename.endsWith(".gif"))) {
				codeEditorHelper.updateReadOnly(true);
				if (!await plugins.checkPluginStatus("hexy")) {
					let coverDiv = document.createElement("div");
					coverDiv.className = "code-editor-cover";
					coverDiv.innerHTML = "<span style='margin-top: 30px; display: block; font-size: 0.9em;'>This file is not displayed in the editor because it is either binary or uses an unsupported text encoding. <a class='url' style='border-bottom: 1px solid; cursor: pointer;'>Do you want to open it anyway?</a></span>";
					coverDiv.querySelector("a").addEventListener("click", function() {
						let x=this.parentElement.parentElement;
						x.parentElement.removeChild(x);
						document.getElementById("code-frame").contentWindow.codeEditor.getModel().setValue(text);
					})
					document.getElementById("code-frame").parentElement.appendChild(coverDiv);
				} else {
					await plugins.load("hexy");
					document.getElementById("code-frame").contentWindow.codeEditor.getModel().setValue(hexy(text));
				}
			} else {
				codeEditorHelper.updateReadOnly(false);
				document.getElementById("code-frame").contentWindow.codeEditor.getModel().setValue(text);
			}
			setTimeout(function () {
				self.state.onLoadCallback();
				document.getElementById("code-editor-status").innerText = "Ready"
			}, 100)
		}
		function addThings() {
			function loadCode() {
				try {
					document.getElementById("preview").src = "data:text/html;base64," + plugins.Base64.encode(codeEditorHelper.getValue());
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
			async function addEvent() {
				codeEditorHelper.setCurrentEditorIndex(parentThis.parent.state.tabbedView.state.selected)

				tabindex = codeEditorHelper.getCurrentEditorIndex()
				let checkFileType = filename.split('.').pop().toLowerCase();
				var requiredPlugins = {
					"py": "brython",
					"html": false,
					"md": "showdown",
					"js": false,
					"jsx": "react",
					"css": false,
					"ts": "typescript"
				}
				if (!window.alertModals) {
					window.alertModals = {
						pluginFileRequired: {}
					}
				}
				if (requiredPlugins[checkFileType] && await plugins.checkPluginStatus(requiredPlugins[checkFileType]) === false && requiredPlugins[checkFileType] !== false && !window.alertModals.pluginFileRequired[checkFileType]) {
					window.alertModals.pluginFileRequired[checkFileType] = true;
					codeEditorHelper.showAlertModal(`This file extention (.${checkFileType}) requires the ${requiredPlugins[checkFileType]} plugin to run`, [
						{
							text: "Install", onclick: function () {
								document.querySelectorAll(".project-module-tabs")[1].children[0].children[3].click()
								codeEditorHelper.removeAlertModal(this.parentElement.getAttribute('data-editor-alert-modal-index'))
								setTimeout(function () {
									if (document.getElementById("plugin-list-" + requiredPlugins[checkFileType]).querySelector("h5").innerText !== "Install") return;
									document.getElementById("plugin-list-" + requiredPlugins[checkFileType]).querySelector("h5").click()
								}, 100)
							}
						},
						{
							text: "Don't Install", onclick: function () {
								codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute('data-editor-alert-modal-index'))
							}
						}
					])
				}


				if (document.getElementById("preview-container")) tApp.getComponentFromDOM(document.getElementById("preview-container")).update()
				if (window.addedEditorEventListeners) return
				window.addedEditorEventListeners = true;
				try {
					document.querySelectorAll(".tab").forEach(element => {
						if (element.innerText === "Preview") {
							element.addEventListener("click", handleClicks)
						}
					})
					document.querySelectorAll("#code-editor-component div div div .tab").forEach(element => {
						element.addEventListener("contextmenu", handleRightClick)
					})
					document.addEventListener("click", handleLeftClick);

					async function handleRightClick(e) {
						e.preventDefault();
						var menu = document.getElementById("editor-tab-context-menu");
						let clickIndex = Array.from(e.target.parentNode.children).indexOf(e.target);
						let storageId = e.target.getAttribute("data-storage_id");
						for (let i in menu.children) {
							let option = menu.children[i];
							if (option.nodeName === "HR" || typeof option === "number" || typeof option === "function") continue;
							else if (option.innerText.startsWith("Delete")) {
								if (!storageId.startsWith("USERDATA")) option.style.display = "none";
								else {
									option.style.display = "";
									option.onclick = function () {
										codeEditorHelper.showAlertModal("Are you sure you want to delete this file? This action is irreversible!", [
											{
												text: "Confirm", onclick: async function () {
													await codeEditorHelper.deleteFile(storageId.slice("USERDATA".length));
													codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute('data-editor-alert-modal-index'));
													window.location.reload();
												}
											},
											{ text: "Cancel", onclick: function () { codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute('data-editor-alert-modal-index')) } }
										], "codicon-warning")
									}
								}
							} else if (option.innerText.startsWith("Rename")) {
								if (!storageId.startsWith("USERDATA")) option.style.display = "none";
								else {
									option.style.display = "";
									option.onclick = async function () {
										let input = document.createElement("input");
										let position = e.target.getBoundingClientRect()
										input.setAttribute("type", "text");
										input.value = e.target.innerText;
										input.style.position = "fixed";
										input.style.top = position.top + "px";
										input.style.left = position.left + "px";
										input.style.width = position.width + "px";
										input.style.backgroundColor = window.getComputedStyle(e.target, null).getPropertyValue('background-color');
										input.style.color = "white";
										input.style.zIndex = "10";
										input.style.border = "none"
										input.style.padding = "10px 5px";
										input.style.filter = "brightness(1.5)";
										input.style.borderRadius = "10px 10px 0 0";
										input.style.fontSize = "16px"
										document.body.appendChild(input);
										input.select(0, input.value.lastIndexOf("."));
										input.addEventListener("blur", function () {
											input.parentElement.removeChild(input)
										})
										input.addEventListener("keydown", async function (ev) {
											if (ev.key === "Enter") {
												console.log(storageId.slice("USERDATA".length))
												try {
													await codeEditorHelper.renameFile(storageId.slice("USERDATA".length), input.value);
													window.location.reload();
												} catch (err) {
													codeEditorHelper.showAlertModal(err, [{
														text: "Ok", onclick: function () { codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute('data-editor-alert-modal-index')) }
													}], "codicon-error")
												}
												input.blur();
											}
										})
									}
								}
							} else if (option.innerText.startsWith("Download")) {
								option.onclick = function () {
									e.target.click();
									setTimeout(function () {
										var element = document.createElement('a');
										element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(codeEditorHelper.getValue()));
										element.setAttribute('download', e.target.innerText);

										element.style.display = 'none';
										document.body.appendChild(element);

										element.click();

										document.body.removeChild(element);
									}, 1000)
								}
							} else if (option.innerText.startsWith("Format")) {
								option.onclick = function () {
									e.target.click();
									setTimeout(function() {
										codeEditorHelper.format();
									}, 500)
								}
							} else if (option.innerText.startsWith("Run")) {
								option.onclick = function () {
									e.target.click();
									setTimeout(function () {
										document.getElementById("code-editor-run-btn").click();
									}, 500)
								}
							} else if (option.innerText.startsWith("New File")) {
								option.onclick = async function () {
									let level = await new Promise((resolve, reject) => {
										codeEditorHelper.showAlertModal("Would you like this file to be accessible lesson-wide or confined to this page?", [
											{
												text: "Lesson-Wide", onclick: function () {
													resolve("module")
													codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute('data-editor-alert-modal-index'));
												}
											},
											{
												text: "Page only", onclick: function () {
													resolve("page")
													codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute('data-editor-alert-modal-index'))
												}
											}
										], "codicon-warning")
									})
									let template = document.getElementById("snippets-modal")
									let modal = template.cloneNode(true);
									modal.removeAttribute("id")
									modal.classList.remove("none")
									modal.querySelector("h3").innerHTML = "New File";
									modal.querySelector(".button-correct").innerHTML = "Create File";
									modal.querySelector("span").onclick = function () {
										modal.parentNode.removeChild(modal)
									}
									modal.querySelector(".button-correct").onclick = async function () {
										let name = this.parentElement.querySelector(".inputs input").value
										if (name.length === 0) {
											codeEditorHelper.showAlertModal("You must enter a file name!", [
												{
													text: "Ok", onclick: function () {
														codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute('data-editor-alert-modal-index'));
													}
												}
											], "codicon-error")
											return;
										}

										codeEditorHelper.uploadFile({
											filename: name,
											level: level,
											data: "",
											onsuccess: function () {
												window.location.reload();
											},
											onerror: function (error) {
												codeEditorHelper.showAlertModal(error, [
													{
														text: "Ok", onclick: function () {
															codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute('data-editor-alert-modal-index'));
														}
													}
												], "codicon-error")
											}
										})

										modal.parentElement.removeChild(modal)
									}
									let elm = document.createElement("input");
									elm.className = "short-answer-input";
									elm.classList.add("insert-snippet-input")
									elm.placeholder = "File Name (Including its extention)";
									modal.querySelector(".inputs").appendChild(elm);

									document.body.appendChild(modal);
								}
							} else if (option.innerText.startsWith("Upload File")) {
								option.onclick = async function () {
									let level = await new Promise((resolve, reject) => {
										codeEditorHelper.showAlertModal("Would you like this file to be accessible lesson-wide or confined to this page?", [
											{
												text: "Lesson-Wide", onclick: function () {
													resolve("module")
													codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute('data-editor-alert-modal-index'));
												}
											},
											{
												text: "Page only", onclick: function () {
													resolve("page")
													codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute('data-editor-alert-modal-index'))
												}
											}
										], "codicon-warning")
									})
									let input = document.createElement("input");
									input.setAttribute("type", "file");

									function readSingleFile(e) {
										var file = e.target.files[0];
										if (!file) {
											return;
										}
										if (file.size > 50000000) {
											codeEditorHelper.showAlertModal("This file is too big! The maximum size that a file can be is 50MB", [
												{
													text: "Ok", onclick: function () {
														codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute('data-editor-alert-modal-index'));
													}
												}
											], "codicon-error")
											return;
										}
										var reader = new FileReader();
										reader.onload = function (e) {
											var contents = e.target.result;
											console.log(e)
											uploadContents(contents, file.name);
										};
										if (file.name.endsWith(".png") || file.name.endsWith(".jpg") || file.name.endsWith(".jpeg") || file.name.endsWith(".gif")) {
											reader.readAsBinaryString(file);
										} else reader.readAsText(file);
									}

									function uploadContents(contents, filename) {
										input.parentElement.removeChild(input);
										codeEditorHelper.uploadFile({
											filename: filename,
											level: level,
											data: contents,
											onsuccess: function () {
												window.location.reload();
											},
											onerror: function (error) {
												codeEditorHelper.showAlertModal(error, [
													{
														text: "Ok", onclick: function () {
															codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute('data-editor-alert-modal-index'));
														}
													}
												], "codicon-error")
											}
										})


									}
									document.body.appendChild(input);
									input.click();
									input.addEventListener('change', readSingleFile, false);
								}
							}
						}
						window.focus()
						function handleIframeClicks() {
							setTimeout(() => {
								if (document.activeElement.tagName === "IFRAME") {
									handleLeftClick()
								}
							});
						}
						window.addEventListener("blur", handleIframeClicks, { once: true });

						menu.classList.remove("none");
						menu.style.left = (e.clientX - 5) + "px";
						menu.style.top = (e.clientY - 5) + "px";
					}
					function handleLeftClick() {
						var menu = document.getElementById("editor-tab-context-menu");
						menu.classList.add("none");
					}
					function handleClicks() {
						tabindex = codeEditorHelper.getCurrentEditorIndex()
						setTimeout(function () {
							let fileType = filename.split('.').pop().toLowerCase()
							if (fileType === "html") updatePreview(fileType)
						}, 100)
					}
					document.getElementById("code-editor-run-btn").onclick = async function () {
						var filenamex = tApp.getComponentFromDOM(document.querySelector("tapp-main").children[0].children[0]).data().files[tabindex] || document.querySelector("tapp-main").children[0].children[0].children[0].children[0].children[0].children[tabindex].innerText;

						tabindex = codeEditorHelper.getCurrentEditorIndex()
						

						document.getElementById("code-editor-status").innerText = "Saving...";
						if (!parentThis.parent.parent.data().storage_id[tabindex]) {
							filenamex = document.querySelector("tapp-main").children[0].children[0].children[0].children[0].children[0].children[tabindex].innerText
							let file = await codeEditorHelper.getFile(filenamex);
							if (!codeEditorHelper.getCurrentEditorOption(81)) await codeEditorHelper.updateFile(file.fileid, codeEditorHelper.getValue())
						} else {
							filenamex = tApp.getComponentFromDOM(document.querySelector("tapp-main").children[0].children[0]).data().files[tabindex];
							if (!codeEditorHelper.getCurrentEditorOption(81)) await DB.setCode(parentThis.parent.parent.data().storage_id[tabindex], codeEditorHelper.getValue())
						}

						let fileType = filenamex.split('.').pop().toLowerCase()
						updatePreview(fileType)
						setTimeout(function () {
							document.getElementById("code-editor-status").innerText = "Ready"
						}, 500)
					}
					async function updatePreview(fileType) {
						tabindex = codeEditorHelper.getCurrentEditorIndex()
						if (!window.lastUpdatePreview) window.lastUpdatePreview = 0
						if (window.lastUpdatePreview + 100 > Date.now()) return;
						window.lastUpdatePreview = Date.now()

						if (window.lastTab !== tabindex) {
							document.getElementById("console-bridge").dispatchEvent(new Event('change'));
						}
						window.lastTab = tabindex;

						if (fileType === "html") {
							async function replaceAsync(str, regex, asyncFn) {
								const promises = [];
								str.replace(regex, (match, ...args) => {
									const promise = asyncFn(match, ...args);
									promises.push(promise);
								});
								const data = await Promise.all(promises);
								return str.replace(regex, () => data.shift());
							}
							function showError(text) {
								window.consoleLogs = [[text]]
								document.getElementById("console-bridge").click()
							}
							let html = codeEditorHelper.getValue();
							var errored = false;
							html = await replaceAsync(html, /(?<=src=("|'))(.*)(?=("|'))/g, async function (module) {
								if (/^(http(s|):\/\/)/.test(module)) {
									return module;
								}
								if (module.startsWith("data:")) return module;
								module = module.replace(/^(.\/|\/)/g, "")

								if (module.includes("\"")) module = module.slice(0, module.indexOf("\""))

								let moduleIndex = self.parent.parent.data().files.findIndex(e => e === module);
								var moduleCode;
								if (moduleIndex === -1) {
									try {
										moduleCode = await codeEditorHelper.getFile(module);
										moduleCode = moduleCode.code
									} catch (e) {
										showError(`GET ${module} net::ERR_ABORTED 404 (File not found)'`)
										errored = true;
									}
								} else {
									moduleCode = await DB.getCode(self.parent.parent.data().storage_id[moduleIndex]);
								}
								if (module.endsWith(".png") || module.endsWith(".jpg") || module.endsWith(".jpeg") || module.endsWith(".gif")) {
									return `data:image/png;base64,${btoa(moduleCode)}`
								}
								return `data:text/plain;base64,` + plugins.Base64.encode(moduleCode);
							})
							html = await replaceAsync(html, /<link(.*)(?<=href=("|'))(.*)(?=("|'))/g, async function (module) {
								if (!module.includes("stylesheet")) return module;
								module = await replaceAsync(module, /(?<=href=("|'))(.*)/g, async function (url) {
									if (/^(http(s|):\/\/)/.test(url)) {
										return url;
									}
									url = url.replace(/^(.\/|\/)/g, "")
									let moduleIndex = self.parent.parent.data().files.findIndex(e => e === url);
									var moduleCode;
									if (moduleIndex === -1) {
										try {
											moduleCode = await codeEditorHelper.getFile(url);
											moduleCode = moduleCode.code
										} catch (e) {
											showError(`GET ${module} net::ERR_ABORTED 404 (File not found)'`)
											errored = true;
										}
									} else {
										moduleCode = await DB.getCode(self.parent.parent.data().storage_id[moduleIndex]);
									}
									return `data:text/plain;base64,` + plugins.Base64.encode(moduleCode);
								})
								return module;
							})
							if (document.getElementById("preview")) document.getElementById("preview").src = "data:text/html;base64," + plugins.Base64.encode(html)
							if (errored = true) {
								try {
									document.getElementById("preview-container").classList.remove("preview-mode-console")
									let consolew = document.querySelector(".console-wrapper");
									if (consolew) console.parentElement.removeChild(consolew)
								} catch (e) { }
							}
						} else if (fileType === "cpp") {
							await plugins.load("jscpp")
							console.log("running cpp")
							var code = "#include <iostream>" +
								"using namespace std;" +
								"int main() {" +
								"    int a;" +
								"    cin >> a;" +
								"    cout << a << endl;" +
								"    return 0;" +
								"}"
								;
							var input = "4321";
							var output = "";
							var config = {
								stdio: {
									write: function (s) {
										output += s;
									}
								}
							};
							var exitCode = JSCPP.run(code, input, config);
							alert(output + "\nprogram exited with code " + exitCode);
						} else if (fileType === "py") {
							document.getElementById("console-bridge").dispatchEvent(new Event('change'));
							window.consoleLogs = []
							try {
								let remove = document.querySelector("#python-execution-thread")
								if (remove) {
									remove.parentElement.removeChild(remove)
								}
								plugins.unload("brython")
							} catch (err) { }
							window.consoleLogs.push(["Starting python emulator..."])
							document.getElementById("console-bridge").click()
							if (await plugins.checkPluginStatus("brython") === false) {
								window.consoleLogs.push(["Running python files requires the brython plugin! Install it first in the plugins tab"])
								document.getElementById("console-bridge").click()
								return;
							}
							console.log("Starting python emulator")
							if (window.newLogCallback) window.newLogCallback(["Starting python emulator..."])
							let main = makeid(10)
							let preScript = `
import sys
import browser
import traceback
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
							postScript = postScript.replace(/    def/g, "    async def")
							postScript = postScript.replace(/....[a-zA-Z]+\([^\)]*\)(\.[^\)]*\))?/g, function (matched) {
								if (matched.startsWith("def ")) return matched

								let builtins = ["abs(", "aiter(", "all(", "any(", "anext(", "ascii(", "bin(", "bool(", "breakpoint(", "bytearray(", "bytes(", "callable(", "chr(", "classmethod(", "compile(", "complex(", "delattr(", "dict(", "dir(", "divmod(", "enumerate(", "eval(", "exec(", "filter(", "float(", "format(", "frozenset(", "getattr(", "globals(", "hasattr(", "hash(", "help(", "hex(", "id(", "input(", "int(", "isinstance(", "issubclass(", "iter(", "len(", "list(", "locals(", "map(", "max(", "memoryview(", "min(", "next(", "object(", "oct(", "open(", "ord(", "pow(", "print(", "property(", "range(", "repr(", "reversed(", "round(", "set(", "setattr(", "slice(", "sorted(", "staticmethod(", "str(", "sum(", "super(", "tuple(", "type(", "vars("]

								for (let i in builtins) {
									if (matched.slice(4).startsWith(builtins[i])) return matched
								}

								if (matched.slice(3).startsWith(".")) return matched
								if (matched.startsWith("ait ")) return matched
								return matched.substring(0, 4) + "await aio.run(" + matched.slice(4) + ")"
							})
							let pps = `
try:
	aio.run(${main}())
except Exception:
    print(traceback.format_exc())
`
							try {
								if (!window.__BRYTHON__) {
									await plugins.load("brython");
									brython({ pythonpath: ["/assets/plugins/brython/modules/"], cache: true, debug: 0 })
								}
							} catch (err) {
								window.consoleLogs.push(["We couldn't find the necessary plugins to run python files! Please install brython in the plugins panel."])
								document.getElementById("console-bridge").click()
								if (window.newLogCallback) window.newLogCallback(["We couldn't find the necessary plugins to run python files! Please install brython in the plugins panel."])
							}
							try {
								window.URL = window.URL || window.webkitURL;
								let code = preScript + "\n" + postScript + "\n" + pps
								if (document.getElementById("python-execution-thread")) {
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
								${await plugins.getCode("brython")}
								</script>
								<script type="text/python">
${code}
								</script>
								<script>
								console.oldLog = console.log
								console.log = function(){
									console.oldLog("err")
									window.newLog(arguments)
								}
								console.error = function(){
									window.newLog(arguments)
								}
								brython({pythonpath: ["/assets/plugins/brython/modules/"], cache: true, debug: 1})
								</script>
								`
								document.body.appendChild(iframe)
								iframe.contentWindow.newLog = function (log) {
									let arrLog = []
									for (let i in log) {
										arrLog.push(log[i])
									}
									window.consoleLogs.push(arrLog)
									window.document.getElementById("console-bridge").click()
									if (window.newLogCallback) window.newLogCallback(log)
								}
								iframe.contentWindow.pyjsCode = code
								iframe.contentWindow.enableInput = function () {
									document.querySelector(".console-input").disabled = false
									document.querySelector(".console-input").focus()
								}
								iframe.contentWindow.disableInput = function () {
									document.querySelector(".console-input").disabled = true
									document.querySelector(".console-input").value = ""
								}
								iframe.contentWindow.getInput = function () {
									return document.querySelector(".console-input").value
								}
							} catch (err) {
								window.consoleLogs.push([err.toString(), err.stack])
								document.getElementById("console-bridge").click()
								if (window.newLogCallback) window.newLogCallback([err.toString(), err.stack])
								throw err
							}
						} else if (fileType === "md") {
							if (document.getElementById("preview")) {
								try {
									await plugins.load("showdown")
								} catch (err) {
									codeEditorHelper.showAlertModal("Markdown plugin not found! You must install it before you can render markdown files.", [{
										text: "Ok", onclick: function () { codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute('data-editor-alert-modal-index')) }
									}], "codicon-error")
									return;
								}
								let md = codeEditorHelper.getValue();
								var converter = new showdown.Converter();
								let html = converter.makeHtml(md);
								document.getElementById("preview").src = "data:text/html;base64," + plugins.Base64.encode(html);
							}
						} else if (fileType === "js") {
							document.getElementById("console-bridge").dispatchEvent(new Event('change'));
							window.consoleLogs = []
							try {
								let remove = document.querySelector("#python-execution-thread")
								if (remove) {
									remove.parentElement.removeChild(remove)
								}
							} catch (err) { }
							window.consoleLogs.push(["Starting javascript engine..."])
							document.getElementById("console-bridge").click()
							let code = codeEditorHelper.getValue()
							if (document.getElementById("python-execution-thread")) {
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
console.oldLog = console.log
console.log = function(){
	window.newLog(arguments)
}
console.error = function(){
	window.newLog(arguments)
}
try{
	${code}
}catch(err){
	console.error(err)
}
							</script>
							`
							document.body.appendChild(iframe)
							iframe.contentWindow.newLog = function (log) {
								let arrLog = []
								for (let i in log) {
									arrLog.push(log[i])
								}
								window.consoleLogs.push(arrLog)
								window.document.getElementById("console-bridge").click()
								if (window.newLogCallback) window.newLogCallback(log)
							}
							iframe.contentWindow.onerror = function (err) {
								err = err.toString()
								window.consoleLogs.push([err])
								window.document.getElementById("console-bridge").click()
								return false;
							}
						} else if (fileType === "jsx") {
							jsxMain()
							async function jsxMain() {
								function showError(text) {
									window.consoleLogs = [[text]]
									document.getElementById("console-bridge").click()
								}
								let code = codeEditorHelper.getValue();
								await plugins.load("react");
								// parsing imports
								let imports = []
								code = code.replaceAll(/import([\s\S]*?)(?='|").*/g, function (e) {
									if (e.replaceAll("\"", "'").match(/(?<=')(.*)(?=')/g)[0] === "react") return "";
									let name = e.match(/(?<=import)(.*)(?=from)/g)[0];
									imports.push(e.replaceAll("\"", "'"))
									return `var ${name} = window.__importBridge.${name}`
								})
								var secondaryFilesCode = ""
								for (let i in imports) {
									let element = imports[i]
									let module = element.match(/(?<=')(.*)(?=')/g)[0];
									let name = element.match(/(?<=import)(.*)(?=from)/g)[0];
									console.log(module, name)
									if (!module.startsWith("./") || module.indexOf("/") !== 1) {
										return showError("DependencyNotFoundError: Could not find dependency: '" + module + "'")
									}
									module = module.slice(2);
									let moduleIndex = self.parent.parent.data().files.findIndex(e => e === module)
									if (moduleIndex === -1) {
										return showError("DependencyNotFoundError: Could not find dependency: '" + module + "'")
									}
									let moduleCode = await DB.getCode(self.parent.parent.data().storage_id[moduleIndex])
									if (name.startsWith("{") && name.endsWith("}")) {
										// do something
									} else {
										let compiledModuleCode = moduleCode.replaceAll("module.exports", "window.__importBridge." + name)
										compiledModuleCode = compiledModuleCode.replaceAll("export default", "window.__importBridge." + name + " = ")
										compiledModuleCode = Babel.transform(compiledModuleCode, {
											plugins: ["transform-react-jsx"]
										}).code;
										secondaryFilesCode += "<script>\n" + `(function(){\n${compiledModuleCode}\n})()` + "\n</script>";
										// do more things
									}
								}
								code = Babel.transform(code, {
									plugins: ["transform-react-jsx"]
								}).code
								if (document.getElementById("preview")) {
									let src = `
									<html>
										<body>
											<div id="root"></div>
											<script>
											window.__importBridge = {};
												${await plugins.getCode("react")}
											</script>
											${secondaryFilesCode}
											<script>
												try{
													${code}
												}catch(err) {
														err = err.toString()
														window.parent.consoleLogs = [];
														window.parent.consoleLogs.push([err])
														window.parent.document.getElementById("console-bridge").click()
												}
											</script>
										</body>
									</html>
									`
									document.getElementById("preview").srcdoc = src;
									document.getElementById("preview-container").classList.remove("preview-mode-console")
									let console = document.querySelector(".console-wrapper");
									if (console) console.parentElement.removeChild(console)
								}

							}
						} else if (fileType === "ts") {
							document.getElementById("console-bridge").dispatchEvent(new Event('change'));
							window.consoleLogs = []
							try {
								let remove = document.querySelector("#python-execution-thread")
								if (remove) {
									remove.parentElement.removeChild(remove)
								}
							} catch (err) { }
							window.consoleLogs.push(["Starting typescript engine..."])
							document.getElementById("console-bridge").click()
							let code = codeEditorHelper.getValue()
							if (document.getElementById("python-execution-thread")) {
								let elem = document.getElementById("python-execution-thread")
								elem.parentElement.removeChild(elem)
							}
							try {
								await plugins.load("typescript")
							} catch (err) {
								window.consoleLogs.push(["This file requires the Typescript plugin to run!"])
								document.getElementById("console-bridge").click();
								return;
							}
							code = window.ts.transpile(code);
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
console.oldLog = console.log
console.log = function(){
	window.newLog(arguments)
}
console.error = function(){
	window.newLog(arguments)
}
try{
	${code}
}catch(err){
	console.error(err)
}
							</script>
							`
							document.body.appendChild(iframe)
							iframe.contentWindow.newLog = function (log) {
								let arrLog = []
								for (let i in log) {
									arrLog.push(log[i])
								}
								window.consoleLogs.push(arrLog)
								window.document.getElementById("console-bridge").click()
								if (window.newLogCallback) window.newLogCallback(log)
							}
							iframe.contentWindow.onerror = function (err) {
								err = err.toString()
								window.consoleLogs.push([err])
								window.document.getElementById("console-bridge").click()
								return false;
							}
						}
					}
					document.getElementById("code-frame").contentWindow.document.onkeydown = async function (e) {
						tabindex = codeEditorHelper.getCurrentEditorIndex()
						window.codeEditorSaved = false;
						if (e.keyCode === 82 && e.ctrlKey) {
							window.codeEditorSaved = true;
						}
						if (e.key === 's' && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
							e.preventDefault();
							document.getElementById("code-editor-status").innerText = "Saving..."
							var filenamex = tApp.getComponentFromDOM(document.querySelector("tapp-main").children[0].children[0]).data().files[tabindex] || document.querySelector("tapp-main").children[0].children[0].children[0].children[0].children[0].children[tabindex].innerText;

							if (!parentThis.parent.parent.data().storage_id[tabindex]) {
								filenamex = document.querySelector("tapp-main").children[0].children[0].children[0].children[0].children[0].children[tabindex].innerText
								let file = await codeEditorHelper.getFile(filenamex);
								if (!codeEditorHelper.getCurrentEditorOption(81)) await codeEditorHelper.updateFile(file.fileid, codeEditorHelper.getValue())
							} else {
								filenamex = tApp.getComponentFromDOM(document.querySelector("tapp-main").children[0].children[0]).data().files[tabindex];
								if (!codeEditorHelper.getCurrentEditorOption(81)) await DB.setCode(parentThis.parent.parent.data().storage_id[tabindex], codeEditorHelper.getValue())
							}
							let fileType = filenamex.split('.').pop().toLowerCase()

							if (fileType === "html") updatePreview(fileType)
							else if (fileType === "jsx") updatePreview(fileType)
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
				let fileType = filename.split('.').pop().toLowerCase()
				codeEditorHelper.updateLanguage(languages[fileType])
			} else {
				document.getElementById("code-frame").contentWindow.addEventListener("message", async function (event) {
					if (event.data.message === "monacoloaded") {
						window.monacoAlreadyLoaded = true;
						loadCodeFromDb()
						addThings()
						let fileType = filename.split('.').pop().toLowerCase()
						codeEditorHelper.updateLanguage(languages[fileType])
						try {
							await plugins.load("betterEditor")
						} catch (err) {

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
		this.state.tabbedView = "Loading...";
		var tabs = [];
		this.x = false;
	}
	render() {
		var self = this;
		var tabs = [];

		async function getData() {
			if (self.x === true) return;
			self.x = true;
			if (self.parent.data() === undefined) {
				self.x = false;
				return setTimeout(getData, 100)
			} else {
				var data = self.parent.data()
				for (var i = 0; i < data.files.length; i++) {
					if (self.state[data.storage_id[i]] == null) {
						console.log("Created new editor instance: ", data.storage_id[i])
						self.state[data.storage_id[i]] = new Editor({ tabindex: i, storage_id: data.storage_id[i], onLoadCallback: onLoadCallback }, self)
					}
					tabs.push({
						name: data.files[i],
						component: self.state[data.storage_id[i]],
						tabDataset: {
							storage_id: data.storage_id[i]
						}
					})
				}



				let startingI = i;
				var userData = await codeEditorHelper.getAllUserFiles();
				for (i = i; i < userData.length + startingI; i++) {
					let file = userData[i - startingI]
					if (self.state[file.fileid] == null) {
						console.log("Created new editor instance: ", file.fileid, "with tabindex ", i)
						self.state[file.fileid] = new Editor({ tabindex: i, storage_id: "USERDATA" + file.fileid, file: file, onLoadCallback: onLoadCallback}, self)
					}
					tabs.push({
						name: file.filename,
						component: self.state[file.fileid],
						tabDataset: {
							storage_id: "USERDATA" + file.fileid
						}
					})
				}
				if (self.state.tabbedView == "Loading...") {
					self.setState("tabbedView", new TabbedView({
						tabs: tabs
					}, self))
					document.body.setAttribute('data-before', "Loading files...");
					document.body.classList.add("tester-testing")
				}
				var loadCount = 0;
				async function onLoadCallback(){
					loadCount++;
					if (loadCount === tabs.length + 1) {
						document.body.classList.remove("tester-testing")
						document.querySelector("#code-editor-component > div:nth-child(1) > div > div.tab-group > div.tab.tab-selected").click()
					}
				}
			}

		}
		getData()
		return `<div style="position: absolute; left: 0; width: 100%; transform: translateX(-50%);">
			${this.state.tabbedView}
		</div>`;
	}
}

module.exports = TabbedEditor;