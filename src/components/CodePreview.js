const codeTemplateToCode = require("../utils/codeTemplateToCode.js");
const codeEditorHelper = require("../utils/codeEditor.js");
const doesFileExist = require("../utils/doesFileExist.js");
window.codeEditorHelper = codeEditorHelper
const plugins = require("../utils/plugins.js");

const buttons = `
<a class="codicon codicon-debug-console" title="Run Console" style="cursor: pointer; position: absolute; top: -20px; color: var(--white); z-index: 1;" onclick="{{_this}}.showRunConsole()"></a>
<a class="codicon codicon-library" title="Dependency Manager" style="cursor: pointer; position: absolute; top: -20px; color: var(--white); z-index: 1; left: 32px" onclick="{{_this}}.showDependencyManager()"></a>
`

class CodePreview extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
		if (this.state.runCmdBtn == null) {
			this.state.runCmdBtn = ""
		}
	}
	update(value) {
		let x = tApp.getComponentFromDOM(document.querySelector("tapp-main").children[0].children[0]).data().storage_id
		var tabindex = codeEditorHelper.getCurrentEditorIndex();
		if (document.getElementById("preview") && value) document.getElementById("preview").src = "data:text/html;base64," + plugins.Base64.encode(value)
		document.getElementById("popout").href = `#/preview/html/${x[codeEditorHelper.getCurrentEditorIndex()]}/autoupdate`
		document.getElementById("popout").onclick = function () {
			window.open(`#/preview/html/${tApp.getComponentFromDOM(document.querySelector("tapp-main").children[0].children[0]).data().storage_id[tabindex]}/autoupdate`, '1', `width=${window.innerWidth},height=${window.innerHeight},toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0`);
			return false;
		}
		var filename = tApp.getComponentFromDOM(document.querySelector("tapp-main").children[0].children[0]).data().files[tabindex] || document.querySelector("tapp-main").children[0].children[0].children[0].children[0].children[0].children[tabindex].innerText;
		if (filename.slice(-3) == ".js") {
			this.setState("runCmdBtn", buttons)
		} else {
			this.setState("runCmdBtn", "")
		}
	}
	showRunConsole() {
		let template = document.getElementById("snippets-modal")
		let modal = template.cloneNode(true);
		modal.removeAttribute("id")
		modal.classList.remove("none")
		modal.querySelector("h3").innerHTML = "Run Console";
		modal.querySelector(".button-correct").innerHTML = "Run";
		modal.querySelector("span").onclick = function () {
			modal.parentNode.removeChild(modal)
		}
		modal.querySelector(".button-correct").onclick = async function () {
			if (!document.getElementById("python-execution-thread")) {
				codeEditorHelper.showAlertModal("The Javscript engine must first be running to be able to use the run console", [{
					text: "Ok", onclick: function () { codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute('data-editor-alert-modal-index')) }
				}], "codicon-error", 5)
				modal.parentElement.removeChild(modal)
				return;
			}
			var sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
			let cmd = this.parentElement.querySelector(".inputs input").value + "//runid="

			let currentScript = document.getElementById("python-execution-thread").contentWindow.document.querySelector("script").innerHTML;
			if (currentScript.endsWith(window.previousJSRunId)) {
				currentScript = currentScript.substring(0, currentScript.lastIndexOf("\n"));
			}
			let scriptTag = document.getElementById("python-execution-thread").contentWindow.document.querySelector("script")
			window.previousJSRunId = makeid(50)
			currentScript += "\n" + cmd+window.previousJSRunId;
			scriptTag.parentElement.removeChild(scriptTag);
			let newScriptTag = document.getElementById("python-execution-thread").contentWindow.document.createElement("script");
			newScriptTag.innerHTML = currentScript;
			await sleep(100)
			document.getElementById("python-execution-thread").contentWindow.document.body.appendChild(newScriptTag);

			modal.parentElement.removeChild(modal)
		}
		let elm = document.createElement("input");
		elm.className = "short-answer-input";
		elm.classList.add("insert-snippet-input")
		elm.placeholder = "Enter JS command here";
		modal.querySelector(".inputs").appendChild(elm);

		document.body.appendChild(modal);
		function makeid(length) {
			var result           = '';
			var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			var charactersLength = characters.length;
			for ( var i = 0; i < length; i++ ) {
			  result += characters.charAt(Math.floor(Math.random() * 
		 charactersLength));
		   }
		   return result;
		}
	}
	showDependencyManager() {
		let template = document.getElementById("snippets-modal")
		let modal = template.cloneNode(true);
		modal.removeAttribute("id")
		modal.classList.remove("none")
		modal.querySelector("h3").innerHTML = "JS Dependency Manager";
		modal.querySelector("h3").style.marginBottom = "10px"
		modal.querySelector(".button-correct").innerHTML = "Add";

		
		Object.entries(window.currentFileMetaData.dependencies || {}).forEach(([key, value]) => {
			let dependency = document.createElement("span");
			dependency.style.display = "block"
			dependency.style.textAlign = "left"
			dependency.innerHTML = key;
			let deleteBtn = document.createElement("span");
			deleteBtn.style = "float: right; font-weight: bold; cursor: pointer; font-size: 0.8em; color: red; margin-right: 10px;"
			deleteBtn.innerHTML = "X"
			deleteBtn.onclick = function() {
				delete window.currentFileMetaData.dependencies[key];
				this.parentElement.parentElement.removeChild(this.parentElement);
				tApp.getComponentFromDOM(document.getElementById("code-editor-tab")).save({
					dependencies: window.currentFileMetaData.dependencies
				})
			}
			dependency.appendChild(deleteBtn)
			modal.querySelector(".inputs").appendChild(dependency)
		})
		
		
		modal.querySelector("span").onclick = function () {
			modal.parentNode.removeChild(modal)
		}
		modal.querySelector(".button-correct").onclick = async function () {
			let value = modal.querySelector("input").value;
			if (!(await doesFileExist(value))) return alert("File does not exist!") 
			window.currentFileMetaData.dependencies = window.currentFileMetaData.dependencies || {};
			window.currentFileMetaData.dependencies[value] = true;
			tApp.getComponentFromDOM(document.getElementById("code-editor-tab")).save({
				dependencies: window.currentFileMetaData.dependencies
			})
			modal.parentElement.removeChild(modal)
		}
		let elm = document.createElement("input");
		elm.className = "short-answer-input";
		elm.classList.add("insert-snippet-input")
		elm.placeholder = "Enter dependency cdn url here";
		modal.querySelector(".inputs").appendChild(elm);

		document.body.appendChild(modal);
	}
	popout() {
		window.open(`#/preview/${tAppRequestInstance.data.track}/${tAppRequestInstance.data.module}/${tAppRequestInstance.data.position}/${codeEditorHelper.getCurrentEditorIndex()}`,'1',`width=${window.innerWidth},height=${window.innerHeight},toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0`)
	}
	newTab() {
		window.open(`#/preview/${tAppRequestInstance.data.track}/${tAppRequestInstance.data.module}/${tAppRequestInstance.data.position}/${codeEditorHelper.getCurrentEditorIndex()}`)
	}
	render(props) {
		var self = this;
		let bridge = document.getElementById("console-bridge");
		if (bridge) {
			bridge.onclick = function () {
				var quitFunction = function () {
					try {
						let elem = document.getElementById("python-execution-thread")
						elem.parentElement.removeChild(elem)
						window.consoleLogs.push(["Forced execution thread to quit"])
						document.getElementById("console-bridge").click()
						if (window.newLogCallback) window.newLogCallback(["Forced execution thread to quit"])
						document.querySelector(".console-input").disabled = true
						document.querySelector(".console-input").value = ""
					} catch (err) { }
				}
				if (!document.getElementById("preview-container")) return;
				document.getElementById("preview-container").classList = ["preview-mode-console"]
				if (!document.getElementById("preview-container").querySelector(".console-wrapper")) {
					let d = document.createElement("pre");
					d.classList = ["console-wrapper"];
					document.getElementById("preview-container").appendChild(d)
					let stop = document.createElement("button");
					stop.classList = ["console-stop"];
					stop.innerText = "Stop";
					stop.onclick = quitFunction
					document.getElementById("preview-container").querySelector(".console-wrapper").appendChild(stop)
				}
				if (!document.getElementById("preview-container").querySelector(".console-input")) {
					let input = document.createElement("input");
					input.classList.add("console-input");
					input.placeholder = "Type here. Press enter to send."
					input.disabled = true;
					input.spellcheck = false;

					var ctrlDown = false, ctrlKey = 17, cmdKey = 91, vKey = 86, cKey = 67;
					input.addEventListener("keyup", function (event) {
						if (event.keyCode === 13) {
							window.consoleLogs.push(["> " + input.value])
							document.getElementById("console-bridge").click()
							if (window.newLogCallback) window.newLogCallback(["> " + input.value])
							document.getElementById("python-execution-thread").contentWindow.document.getElementById("python-sandbox-bridge").click()
						}
						if (event.keyCode == ctrlKey || event.keyCode == cmdKey) ctrlDown = false;
					})
					input.addEventListener("keydown", function (e) {
						if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = true;
						if (ctrlDown && (e.keyCode == cKey)) {
							quitFunction()
						}
					})
					input.addEventListener('contextmenu', function (e) {
						e.preventDefault();
						navigator.clipboard.writeText(window.getSelection().toString())
						if (window.getSelection) { window.getSelection().removeAllRanges(); }
						else if (document.selection) { document.selection.empty(); }
						return false;
					}, false);
					document.getElementById("preview-container").querySelector(".console-wrapper").appendChild(input)
				}
				let newLogs = window.consoleLogs[window.consoleLogs.length - 1];
				let t = document.createElement("span");
				t.style = "display: block;";
				for (let i in newLogs) {
					console.log(newLogs[i])
					if (newLogs[i].__class__) {
						if (newLogs[i].__package__) {
							newLogs[i] = `<module ${newLogs[i].__name__}>`
						} else {
							newLogs[i] = `<class '${newLogs[i].__name__ || newLogs[i].$infos.__name__}'>`
						}
					} else {
						newLogs[i] = `${newLogs[i]}`
					}
				}
				t.innerText = newLogs.join("  ");
				document.getElementById("preview-container").querySelector(".console-wrapper").appendChild(t)
				let wrapper = document.querySelector(".console-wrapper")
				var isScrolledToBottom = wrapper.scrollHeight - wrapper.clientHeight <= wrapper.scrollTop + 40;
				if (isScrolledToBottom) wrapper.scrollTop = wrapper.scrollHeight - wrapper.clientHeight;
				if (window.consoleLogs.length > 1000) {
					window.consoleLogs.shift();
					document.querySelector(".console-wrapper").removeChild(document.querySelector(".console-wrapper").firstChild)
				}
			}
			bridge.onchange = function () {
				if (!document.getElementById("preview-container")) return;
				document.getElementById("preview-container").classList = []
				if (document.getElementById("preview-container").querySelector(".console-wrapper")) {
					let remove = document.getElementById("preview-container").querySelector(".console-wrapper")
					remove.parentNode.removeChild(remove)
				}
			}
		}
		window.plugins = plugins;
		if (!document.getElementById("code-editor-tab")) {
			setTimeout(function(){
				self.setState("update", Date.now())
			}, 100)
			return `<div></div>`
		}
		let tabindex = tApp.getComponentFromDOM(document.getElementById("code-editor-tab")).state.tabindex;
		if (!tApp.getComponentFromDOM(document.getElementById("code-editor-component")).data().storage_id[tabindex]){
			let filename = document.querySelector("tapp-main").children[0].children[0].children[0].children[0].children[0].children[tabindex].innerText;
			var fileType = filename.split('.').pop().toLowerCase();
		} else {
			var fileType = tApp.getComponentFromDOM(document.getElementById("code-editor-component")).data().storage_id[tabindex].split('.').pop().toLowerCase();
		}
		if (fileType !== "html" && fileType !== "md" && fileType !== "jsx" && fileType !== "png" && fileType !== "jpeg" && fileType !== "jpg" && fileType !== "gif") {
			if (!document.getElementById("preview-container")) {
				setTimeout(function () {
					document.getElementById("preview-container").classList = ["preview-mode-console"]
					if (!document.getElementById("preview-container").querySelector(".console-wrapper")) {
						let d = document.createElement("div");
						d.className = "console-wrapper";
						document.getElementById("preview-container").appendChild(d)
					}
					window.consoleLogs.forEach(newLogs => {
						let t = document.createElement("span");
						t.style = "display: block;";
						for (let i in newLogs) {
							if (newLogs[i].__class__) {
								if (newLogs[i].__package__) {
									newLogs[i] = `<module ${newLogs[i].__name__}>`
								} else {
									newLogs[i] = `<class ${newLogs[i].__name__}>`
								}
							} else {

							}
						}
						t.innerText = newLogs.join("  ");
						document.getElementById("preview-container").querySelector(".console-wrapper").appendChild(t)
					})
				}, 200)
			};
		}


		let btn = this.state.runCmdBtn
		if (btn === "" && fileType === "js") {
			btn = buttons
		}

		return `<div style="margin-top: 10px; height: 95%; background: white; overflow: visible" id="preview-container">
		${btn}
    	<a id="popout" class="codicon codicon-link-external" target="_blank" onclick="{{_this}}.popout()" title="Preview fullscreen in new window"></a>
    	<a id="popout-newtab" class="codicon codicon-link" target="_blank" onclick="{{_this}}.newTab()" title="Preview in new tab"></a>
    <iframe style="width: 98%; height: 100%" id="preview" srcdoc="Loading... Press Run to see the output"></iframe>
	</div>`;
	}
}

module.exports = CodePreview;