const codeTemplateToCode = require("../utils/codeTemplateToCode.js");
const codeEditorHelper = require("../utils/codeEditor.js");
const codeBlock = require("./codeBlock.js")
const DB = require("../utils/Database.js");

class SnippetsPanel extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
		if (this.state.snippets == null) {
			this.state.snippets = []
		}

		var parentThis = this
		async function getSnippets() {
			let snippetIds = await DB.getSnippetIds()
			console.log(snippetIds)
			snippetIds.forEach(async function (id) {
				let snippet = await DB.getSnippet(id)
				console.log(snippet)
				parentThis.state.snippets.push(snippet)
			})
			parentThis.state.snippets
		}
		getSnippets()
	}
	showModal(snippetId){
		let snippet = this.state.snippets.find(snippet => snippet.id == snippetId);
		let element = document.getElementById("snippets-modal");
		element.dataset.snippetId = snippetId;
		element.querySelector("h3").innerText = snippet.name+" Snippet";
		element.querySelector(".inputs").innerHTML = "";
		snippet.attributes.forEach(value => {
			let elm = document.createElement("input");
			elm.className = "short-answer-input";
			elm.classList.add("insert-snippet-input")
			elm.placeholder = value.label
			elm.id = "insert-snippet-input-"+value.id
			element.querySelector(".inputs").appendChild(elm);
		})
		element.classList.remove("none")
	}
	insertModal() {
		let inputs = document.querySelectorAll(".insert-snippet-input")
		let snippetId = document.getElementById("snippets-modal").dataset.snippetId
		let snippet = this.state.snippets.find(snippet => snippet.id == snippetId)
		let code = snippet.html
		console.log("as;dlkfja;sdlkfj;asldkjf")

		inputs.forEach(input => {
			code = code.replaceAll(`{{${input.id.slice(21)}}}`, input.value)
		})

		document.getElementById("code-frame").contentWindow.codeEditor.trigger("keyboard", "type", {text: code.replaceAll("\t", "")}); 
		document.getElementById("code-frame").contentWindow.codeEditor.getAction("editor.action.formatDocument").run();

		document.getElementById("snippets-modal").classList.add("none")
	}
	render(props) {
		return `<div class="snippets-panel">
		${this.state.snippets.map(element => {
			element.example = element.example.replaceAll("<", "&lt").replaceAll(">", "&gt;")
			return `<span class="snippet-title" style="margin-bottom: 10px; display: block">${element.name}</span>
				<div class="snippet-code pointer" style="margin-bottom: 20px" onclick='{{_this}}.parent.children[1].showModal("${element.id}")'>
					${new codeBlock({ code: element.example })}
				</div>
				`
		}).join("")}
		<div id="snippets-modal" class="none">
			<div class="explanation-modal" style="left: 0; top: 25vh;">
				<center>
					<h3>Incorrect!</h3>
					<div class="inputs">
					</div>
					<button class="button-correct" onclick="tApp.getComponentFromDOM(this).parent.children[1].insertModal()">Insert</button>
				</center>
			</div>
		</div>
		</div>`;
	}
}

module.exports = SnippetsPanel;

//document.getElementById("code-frame").contentWindow.codeEditor.trigger("keyboard", "type", {text: this.children[0].children[0].innerText.replaceAll("\t", "")}); document.getElementById("code-frame").contentWindow.codeEditor.getAction("editor.action.formatDocument").run();