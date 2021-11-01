const codeTemplateToCode = require("../utils/codeTemplateToCode.js");
const Editor = require("./Editor.js");
const SnippetsPanel = require("./SnippetsPanel.js");
const Instructions = require("./Instructions.js");
const CodePreview = require("./CodePreview.js");
const TabbedView = require("./TabbedView.js");

class CodeEditor extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
		if(this.state.editor == null) {
			this.state.editor = new Editor();
		}
		if(this.state.snippetsPanel == null) {
			this.state.snippetsPanel = new SnippetsPanel({}, this);
		}
		if(this.state.instructions == null) {
			this.state.instructions = new Instructions({}, this);
		}
		if(this.state.codePreview == null) {
			this.state.codePreview = new CodePreview({}, this);
		}
		if(this.state.tabbedView == null) {
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
				}]
			}, this);
		}
	}
	render(props) {
		if(this.parent.state.code_editor != null) {
			this.state.instructions.state.elements = this.parent.state.code_editor.elements;
			return `<div>
						${this.state.editor}
						<div class="vertical-divider"></div>
						${this.state.tabbedView}
					</div>`;
		}
		return "<div></div>";
	}
}

module.exports = CodeEditor;