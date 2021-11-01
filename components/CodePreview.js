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
		function loadCoad(){
			setTimeout(function(){
				try {
					document.getElementById("preview").srcdoc = codeEditorHelper.getValue();
				}catch(err){
					return loadCoad()
				}
				loadCoad();
			}, 1000)
		}
		if (window.startedRefresh !== true) {
			loadCoad()
		}
		window.startedRefresh = true
		return `<div style="margin-top: 45px; height: 95%; background: white"><iframe style="width: 98%; height: 100%" id="preview" srcdoc='Loading...'></iframe></div>`;
	}
}

module.exports = CodePreview;