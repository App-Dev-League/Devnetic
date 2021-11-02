const codeTemplateToCode = require("../utils/codeTemplateToCode.js");
const codeEditorHelper = require("../utils/codeEditor.js");


class CodePreview extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
		if(this.state.code == null) {
			this.state.code = "Loading...";
		}
	}
	render(props) {
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
					}
				  }, false);
			}catch(err){
				setTimeout(addEvent, 500)
			}
		}
		addEvent()

		window.startedRefresh = true
		return `<div style="margin-top: 10px; height: 95%; background: white"><iframe style="width: 98%; height: 100%" id="preview" srcdoc='Loading...'></iframe></div>`;
	}
}

module.exports = CodePreview;