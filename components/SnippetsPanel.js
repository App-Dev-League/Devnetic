const codeTemplateToCode = require("../utils/codeTemplateToCode.js");
const codeEditorHelper = require("../utils/codeEditor.js");
const codeBlock = require("./codeBlock.js")

class SnippetsPanel extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
		if(this.state.codeBlock == null) {
			this.state.codeBlock = new codeBlock();
		}
	}
	render(props) {
		var snippets = [
			{
				name: "Header tag",
				code: `
<h1></h1>
				`
			},
			{
				name: "Boilerplate HTML",
				code: `
<!DOCTYPE>
<html>
	<head>
	</head>

	<body>
	</body>
</html>
				`
			},
			{
				name: "TEST",
				code: `
<!DOCTYPE>

<html>
	<div class="asdf" id="asdf"></div>
	<style>
	.asdf {
		width: 50vw;
		height: 50vh;
		background: black;
		animation: idk 2s infinite;
	}
	@keyframes idk {
		0% {
			transform: none
		}
		50% {
			transform: translate(100px)
		}
		100% {
			transform: none
		}
	}
	</style>
</html>


<script>
document.getElementById("asdf").style.background = "blue"
</script>
				`
			}
		]
		return `<div class="snippets-panel">
		${snippets.map(element => {
			element.code = element.code.replaceAll("<", "&lt").replaceAll(">", "&gt;")
			return `<span class="snippet-title" style="margin-bottom: 10px; display: block">${element.name}</span>
				<div class="snippet-code pointer" style="margin-bottom: 20px" onclick='document.getElementById("code-frame").contentWindow.codeEditor.trigger("keyboard", "type", {text: this.children[0].children[0].innerText.replaceAll("\t", "")}); document.getElementById("code-frame").contentWindow.codeEditor.getAction("editor.action.formatDocument").run();'>
					${new codeBlock({code: element.code})}
				</div>
				`
		}).join("")}
		</div>`;
	}
}

module.exports = SnippetsPanel;