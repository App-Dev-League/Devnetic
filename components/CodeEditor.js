const ModuleComponent = require("./ModuleComponent.js");

const codeTemplateToCode = require("../utils/codeTemplateToCode.js");
const Editor = require("./Editor.js");
const SnippetsPanel = require("./SnippetsPanel.js");
const Instructions = require("./Instructions.js");
const CodePreview = require("./CodePreview.js");
const TabbedView = require("./TabbedView.js");
const PluginPanel = require("./PluginPanel.js")

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
				}]
			}, this);
		}
	}
	async checknext() {
		function sleep(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
		}
		let parentThis = this;
		async function main() {
			function waitForXInputs(count) {
				return new Promise((resolve, reject) => {
					let soFar = 0;
					let elem = document.querySelector(".console-wrapper");
					const callback = function (mutationsList, observer) {
						let changed = false;
						for (let mutation of mutationsList) {
							if (mutation.type === 'childList') {
								changed = true
							}
						}
						if (changed === true) soFar++;
						if (soFar === count) {
							resolve(true)
							observer.disconnect()
						}
					};

					const observer = new MutationObserver(callback);
					observer.observe(elem, { childList: true, subtree: true });
				})
			}
			let data = parentThis.data()
			let good = true;
			let logIndex = 0
			for (let i in data.validation) {
				logIndex = 0
				let tester = data.validation[i]
				if (tester.validate !== true) continue;
				for (let p in tester.actions) {
					let action = tester.actions[p];
					let runwhen = action.runwhen
					if (action.run) {
						let index = action.editorIndex
						// switching to correct editor
						document.querySelectorAll(".project-module-tabs")[0].children[0].children[index].click()
						// switching to the preview tab
						document.querySelectorAll(".project-module-tabs")[1].children[0].children[1].click()
						window.consoleLogs.push(["Launching tester..."])
						document.getElementById("console-bridge").click()
						// clicking run btn
						document.getElementById("code-editor-run-btn").click()
						await sleep(1000)
					} else if (action.input) {
						if (runwhen.startsWith("in") && runwhen.endsWith("outputs")) {
							runwhen = parseInt(runwhen.replace("in", "").replace("outputs", ""))
							logIndex += runwhen
							await waitForXInputs(runwhen)
						}
						document.querySelector(".console-input").value = action.input
						// pressing enter key
						let ke = new KeyboardEvent('keyup', {
							bubbles: true, cancelable: true, keyCode: 13
						});
						document.querySelector(".console-input").dispatchEvent(ke);
					} else if (action.expect) {
						if (runwhen.startsWith("in") && runwhen.endsWith("outputs")) {
							runwhen = parseInt(runwhen.replace("in", "").replace("outputs", ""))
							logIndex += runwhen
							console.log(runwhen)
							await waitForXInputs(runwhen)
						}
						console.log("logindex",logIndex+1)
						let latest = window.consoleLogs[logIndex+1]
						if (action.filters) {
							action.filters.forEach(element => {
								if (element === "lowerCase") latest = latest.toLowerCase()
								if (element === "trim") latest = latest.toString().trim()
								if (element === "parseFloat") latest = parseFloat(latest)
								if (element === "parseInt") latest = parseInt(latest)
								if (element === "number") latest = Number(latest)
								if (element === "extract_numbers") {
									var numberPattern = /\d+/g;
									latest = latest.toString().match( numberPattern )[0]
								}
							})
						}
						if (latest !== action.expect) {
							good = false;
							window.consoleLogs.push(["Tester returned following problems: " + action.onerror])
							document.getElementById("console-bridge").click()
							return false;
						}
					}
				}
			}
			return true;
		}
		let results = await main()
		if (results === false) {
			window.consoleLogs.push(["Test cases failed :( try re-writing your code."])
			document.getElementById("console-bridge").click()
		}else{
			window.consoleLogs.push(["Test cases passed! Moving you to the next lesson..."])
			document.getElementById("console-bridge").click()
			await sleep(1000)
			parentThis.parent.next()
		}
	}
	render(props) {
		if (this.data() != null) {
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