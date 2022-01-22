const codeTemplateToCode = require("../utils/codeTemplateToCode.js");
const codeEditorHelper = require("../utils/codeEditor.js");
window.codeEditorHelper = codeEditorHelper
const plugins = require("../utils/plugins.js");

class CodePreview extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		let bridge = document.getElementById("console-bridge");
		if (bridge) {
			bridge.onclick = function(){
				document.getElementById("preview-container").classList = ["preview-mode-console"]
				if (!document.getElementById("preview-container").querySelector(".console-wrapper")) {
					let d = document.createElement("div");
					d.className = "console-wrapper";
					document.getElementById("preview-container").appendChild(d)
				}
				let newLogs = window.consoleLogs[window.consoleLogs.length - 1];
				let t = document.createElement("span");
				t.style = "display: block;";
				for (i in newLogs){
					if (newLogs[i].__class__) {
						if (newLogs[i].__package__){
							newLogs[i] = `<module ${newLogs[i].__name__}>`
						}else{
							newLogs[i] = `<class ${newLogs[i].__name__}>`
						}
					}else{

					}
				}
				t.innerText = newLogs.join("  ");
				document.getElementById("preview-container").querySelector(".console-wrapper").appendChild(t)
			}
			bridge.onchange = function(){
				document.getElementById("preview-container").classList = []
				if (document.getElementById("preview-container").querySelector(".console-wrapper")){
					let remove =  document.getElementById("preview-container").querySelector(".console-wrapper")
					remove.parentNode.removeChild(remove)
				}
			}
		}
		window.plugins = plugins;
		if (document.getElementById("preview")) document.getElementById("preview").srcdoc = codeEditorHelper.getValue();
		return `<div style="margin-top: 10px; height: 95%; background: white" id="preview-container"><iframe style="width: 98%; height: 100%" id="preview" srcdoc='Loading...'></iframe></div>`;
	}
}

module.exports = CodePreview;