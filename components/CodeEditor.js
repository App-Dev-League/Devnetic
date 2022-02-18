const ModuleComponent = require("./ModuleComponent.js");

const codeTemplateToCode = require("../utils/codeTemplateToCode.js");
const Editor = require("./Editor.js");
const SnippetsPanel = require("./SnippetsPanel.js");
const Instructions = require("./Instructions.js");
const CodePreview = require("./CodePreview.js");
const TabbedView = require("./TabbedView.js");
const PluginPanel = require("./PluginPanel.js")
const codeEditorHelper = require("../utils/codeEditor.js");

class CodeEditor extends ModuleComponent {
	constructor(state, parent) {
		super(state, parent);
		if (this.state.editor == null) {
			this.state.editor = new Editor({}, this);
		}
		if (this.state.snippetsPanel == null) {
			this.state.snippetsPanel = new SnippetsPanel({}, this);
		}
		if (this.state.instructions == null) {
			this.state.instructions = new Instructions({}, this);
		}
		if (this.state.codePreview == null) {
			this.state.codePreview = new CodePreview({}, this);
		}
		if (this.state.pluginPanel == null) {
			this.state.pluginPanel = new PluginPanel({}, this);
		}
		if (this.state.tabbedView == null) {
			// this.state.tabbedView = new TabbedView({
			// 	tabs: [{
			// 		name: "Instructions",
			// 		component: this.state.instructions
			// 	}, {
			// 		name: "Preview",
			// 		component: this.state.codePreview
			// 	}, {
			// 		name: "Snippets",
			// 		component: this.state.snippetsPanel
			// 	}]
			// }, this);
			this.state.tabbedView = new TabbedView({
				tabs: [{
					name: "Instructions",
					component: this.state.instructions
				}, {
					name: "Preview",
					component: this.state.codePreview
				}, {
					name: "Snippets",
					component: this.state.snippetsPanel
				}, {
					name: "Plugins",
					component: this.state.pluginPanel
				}],
				forceReRender: true
			}, this);
		}
	}
	async checknext() {
		function sleep(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
		}
		let parentThis = this;
		var stopManagingQueue = false;
		async function main() {
			window.newLogCallback = function (msg) {
				if (!window.logQueue) window.logQueue = []
				logQueue.push(msg)
			}
			// the problem is that sometimes there isn't a listener for the log queue event. Normally, on startup there should be two messages of "uh oh there wasn't a listener"
			// but, on problem times, there's three. (fixed)
			async function manageLogQueue() {
				while (true) {
					await sleep(100);
					if (stopManagingQueue) break;
					if (!window.logQueue) continue;
					if (window.logQueue.length > 0) {
						let msg = window.logQueue.shift()
						if (window.newLogListener) window.newLogListener(msg)
						else {
							console.log("Uh oh there wasn't a listener for my beautiful log. The log was " + msg)
							if (msg !== "The log was Launching tester..." && msg !== "Starting python emulator..." ) {
								window.logQueue.unshift(msg);
							}
						}
					}
				}
			}
			manageLogQueue();
			function waitForXInputs(count, elem, debug) {
				return new Promise((resolve, reject) => {
					let soFar = 0;
					if (!elem) elem = document.querySelector(".console-wrapper");
					const callback = function (mutationsList, observer) {
						let changed = true;
						if (changed === true) soFar++;
						if (soFar === count) {
							resolve(true)
						}
					};
					window.newLogListener = callback;
				})
			}
			function waitForChildChanges(count, elem, debug) {
				return new Promise((resolve, reject) => {
					let soFar = 0;
					if (!elem) elem = document.querySelector(".console-wrapper");
					const callback = function (mutationsList, observer) {
						let changed = false;
						for (let mutation of mutationsList) {
							if (mutation.type === 'childList') {
								changed = true
							}
						}
						if (changed === true) soFar++;
						if (debug === true) console.log("Current sofar: " + soFar)
						if (soFar === count) {
							resolve(true)
							observer.disconnect()
						}
					};

					const observer = new MutationObserver(callback);
					observer.observe(elem, { childList: true, subtree: true });
				})
			}
			function applyFilters(filters, latest) {
				filters.forEach(element => {
					if (element === "lowerCase") latest = latest.toLowerCase()
					else if (element === "trim") latest = latest.toString().trim()
					else if (element === "parseFloat") latest = parseFloat(latest)
					else if (element === "parseInt") latest = parseInt(latest)
					else if (element === "number") latest = Number(latest)
					else if (element === "extract_numbers") {
						var numberPattern = /\d+/g;
						latest = latest.toString().match(numberPattern)[0]
					}
					else if (element === "typeof") latest = typeof latest;
					else if (element === "remove-tabs") latest = latest.replaceAll("\t", "")
					else if (element === "remove-newlines") latest = latest.replace(/(\r\n|\n|\r)/gm, "");
					else if (element === "convert-to-double-quotes") latest = latest.replaceAll("\'", "\"")
				})
				return latest;
			}
			function setInput(text) {
				return new Promise(async (resolve, reject) => {
					for (let i = 0; i<1000; i++) {
						await sleep(10)
						if (!document.querySelector(".console-input")) continue
						document.querySelector(".console-input").value = text
						resolve(true)
						break
					}
					reject("Could not set input")
				})
			}
			let data = parentThis.data()
			let logIndex = 0;
			var testVars = {};
			for (let i in data.validation) {
				testVars = {}
				logIndex = 0
				let tester = data.validation[i]
				if (tester.validate !== true) continue;
				if (tester.type === "validate-output") {
					document.body.classList.add("tester-testing")
					await sleep(1)
					for (let p in tester.actions) {
						let action = tester.actions[p];
						let runwhen = action.runwhen
						if (action.run) {
							let index = action.editorIndex
							// switching to correct editor
							document.querySelectorAll(".project-module-tabs")[0].children[0].children[index].click()
							// switching to the preview tab
							document.querySelectorAll(".project-module-tabs")[1].children[0].children[1].click()
							//window.consoleLogs.push(["Launching tester..."])
							document.getElementById("console-bridge").click()
							if (window.newLogCallback) window.newLogCallback(["Launching tester..."])
							// clicking run btn
							document.getElementById("code-editor-run-btn").click()
							await waitForChildChanges(1, document.querySelectorAll(".selected-tab")[1])
							await waitForChildChanges(1, document.getElementById("preview-container"));
							for (let i = 0; i<1000; i++) {
								await sleep(100)
								if (!document.querySelector(".console-wrapper")) continue
								else break;
							}
							console.log("waiting for console wrapper changes")
							
						} else if (action.input) {
							if (runwhen.startsWith("in") && runwhen.endsWith("outputs")) {
								runwhen = parseInt(runwhen.replace("in", "").replace("outputs", ""))
								logIndex += runwhen
								console.log(logIndex, runwhen)
								await waitForXInputs(runwhen)
							}
							action.input = tApp.compileTemplate(action.input, {
								tester: {
									variables: testVars
								}
							});
							action.input = action.input.replaceAll(/(?<={{)(.*)(?=}})/g, function (e) {
								let tmpFunction = new Function("tester", `return ${e}`)
								return tmpFunction({variables: testVars})
							}).replaceAll("{{", "").replaceAll("}}", "")
							await setInput(action.input)
							// pressing enter key
							let ke = new KeyboardEvent('keyup', {
								bubbles: true, cancelable: true, keyCode: 13
							});
							document.querySelector(".console-input").dispatchEvent(ke);
						} else if (action.expect) {
							if (runwhen.startsWith("in") && runwhen.endsWith("outputs")) {
								runwhen = parseInt(runwhen.replace("in", "").replace("outputs", ""))
								logIndex += runwhen
								await waitForXInputs(runwhen, undefined, true)
							}
							if (!action.add) action.add = 1
							let latest = window.consoleLogs[logIndex + action.add]
							if (action.filters) {
								latest = applyFilters(action.filters, latest)
							}
							if (latest !== action.expect) {
								window.consoleLogs.push(["Tester returned following problems: " + action.onerror.replaceAll("{{output}}", latest)])
								document.getElementById("console-bridge").click()
								if (window.newLogCallback) window.newLogCallback(["Tester returned following problems: " + action.onerror.replaceAll("{{output}}", latest)])
								return false;
							}
						} else if (action.setVar) {
							if (runwhen.startsWith("in") && runwhen.endsWith("outputs")) {
								runwhen = parseInt(runwhen.replace("in", "").replace("outputs", ""))
								await waitForXInputs(runwhen)
							}
							if (!action.add) action.add = 1
							let latest = window.consoleLogs[logIndex + action.add]
							if (action.filters) {
								latest = applyFilters(action.filters, latest)
							}
							testVars[action.setVar] = latest
						}
					}
					document.body.classList.remove("tester-testing")
				} else if (tester.type === "validate-code") {
					for (let p in tester.correct) {
						// switching to correct editor
						document.querySelectorAll(".project-module-tabs")[0].children[0].children[tester.editorIndex].click()
						// switching to the preview tab
						document.querySelectorAll(".project-module-tabs")[1].children[0].children[1].click()
						await sleep(500)
						let element = tester.correct[p];
						let expected = element.value;
						let actual = applyFilters(element.apply, codeEditorHelper.getValue());
						if (expected !== actual) return false;
					}
				}
				document.body.classList.remove("tester-testing")
			}
			return true;
		}
		var results
		try {
			results = await main()
		}catch(err) {
			document.body.classList.remove("tester-testing")
			stopManagingQueue = true
			window.consoleLogs.push(["A server error occured while validating your code! This most likely means that something is wrong with your code."])
			document.getElementById("console-bridge").click()
			if (window.newLogCallback) window.newLogCallback(["A server error occured while validating your code! This most likely means that something is wrong with your code."])
			return
		}
		document.body.classList.remove("tester-testing")
		stopManagingQueue = true
		console.log("test results", results)
		if (results === false) {
			window.consoleLogs.push(["Test cases failed :( try re-writing your code."])
			document.getElementById("console-bridge").click()
			if (window.newLogCallback) window.newLogCallback(["Test cases failed :( try re-writing your code."])
		} else {
			window.consoleLogs.push(["Test cases passed! Moving you to the next lesson..."])
			document.getElementById("console-bridge").click()
			if (window.newLogCallback) window.newLogCallback(["Test cases passed! Moving you to the next lesson..."])
			await sleep(1000)
			parentThis.parent.next()
		}
	}
	render(props) {
		if (this.data() != null) {
			if (document.getElementById("code-editor-tab")) {
				delete window.monacoAlreadyLoaded
				delete window.addedEditorEventListeners
				tApp.getComponentFromDOM(document.getElementById("code-editor-tab")).parent.setState("rerender", Date.now())
			}

			this.state.instructions.state.elements = this.data().elements;
			this.state.instructions.state.hints = this.data().hints;
			return `<div id="code-editor-component">
						${this.state.editor}
						<div class="vertical-divider"></div>
						${this.state.tabbedView}
					</div>`;
		}
		return "<div></div>";
	}
}

module.exports = CodeEditor;