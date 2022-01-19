const codeTemplateToCode = require("../utils/codeTemplateToCode.js");
const codeEditorHelper = require("../utils/codeEditor.js");


class CodePreview extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
	}
	update(value){
		let x = tApp.getComponentFromDOM(document.querySelector("tapp-main").children[0].children[0]).data().storage_id
		if (document.getElementById("preview")) document.getElementById("preview").srcdoc = value
		document.getElementById("popout").href = `#/preview/html/${x[codeEditorHelper.getCurrentEditorIndex()]}`
	}
	render(props) {
		return `<div style="margin-top: 10px; height: 95%; background: white" class="preview-wrapper">
		<a id="popout" target="_blank" href="#/preview/html/${`#/preview/html/${tApp.getComponentFromDOM(document.querySelector("tapp-main").children[0].children[0]).data().storage_id[codeEditorHelper.getCurrentEditorIndex()]}`}"><svg class="pop-out-icon-preview" xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><path d="M328 97.233L211.184 214.05c-7.03 7.029-18.427 7.029-25.456 0-7.03-7.03-7.03-18.427 0-25.456L302.322 72H262v-.03c-8.37-.517-15-7.47-15-15.97 0-8.766 7.05-15.886 15.789-15.999L263 40h82c8.284 0 15 6.716 15 15v82c0 .336-.011.67-.033 1h-.09c-.985 7.893-7.718 14-15.877 14-8.16 0-14.892-6.107-15.876-14H328V97.233zM328.03 228c.517-8.37 7.47-15 15.97-15s15.453 6.63 15.97 15h.03v96c0 19.882-16.118 36-36 36H76c-19.882 0-36-16.118-36-36V76c0-19.882 16.118-36 36-36h95v.03c8.37.517 15 7.47 15 15.97s-6.63 15.453-15 15.97V72H80a8 8 0 00-8 8v240a8 8 0 008 8h240a8 8 0 008-8v-92h.03z" fill="#009BDE" fill-rule="evenodd"/></svg>		</a>
		<iframe style="width: 98%; height: 100%" id="preview" srcdoc='Loading...'></iframe></div>`;
	}
}

module.exports = CodePreview;