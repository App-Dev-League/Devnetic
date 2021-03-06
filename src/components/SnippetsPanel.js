const codeTemplateToCode = require("../utils/codeTemplateToCode.js");
const codeEditorHelper = require("../utils/codeEditor.js");
const codeBlock = require("./codeBlock.js")
const DB = require("../utils/Database.js");
const compileSnippet = require("../utils/compileSnippet.js");
const Input = require("./Input.js");

class SnippetsPanel extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
		var parentThis = this
		if (this.state.snippets == null) {
			this.state.snippets = []
		}
		if (this.state.showSnippets == null) {
			this.state.showSnippets = this.state.snippets
		}
		if(this.state.input == null) {
			this.state.input = new Input({
				classList: ["short-answer-input"],
				type: "text",
				properties: ["autofocus", "style=\"margin-top: 0; margin-bottom: 20px; font-size: 1em; border: 2px solid var(--blue);\"", "placeholder=\"Search...\""],
				onChange: function() {
					parentThis.showSearch(this.value, true)
				}
			});
		}
		function groupArrayOfObjects(list, key) {
			return list.reduce(function(rv, x) {
			  (rv[x[key]] = rv[x[key]] || []).push(x);
			  return rv;
			}, {});
		  };
		  
		async function getSnippets() {
			let snippetIds = await DB.getSnippetIds()
			for (let id of snippetIds) {
				let snippet = await DB.getSnippet(id)
				if (!snippet.category) snippet.category = "Miscellaneous"
				parentThis.state.snippets.push(snippet)
			}
			let currentCategory = ""
			var grouped = {}
			grouped = groupArrayOfObjects(parentThis.state.snippets,"category");
			var temp = []
			Object.entries(grouped).forEach(([key, value]) => {
				temp.push({categoryName: key})
				temp = temp.concat(value)
			})
			parentThis.state.snippets = temp
			parentThis.setState("showSnippets", parentThis.state.snippets)
		}
		getSnippets()
	}
	showModal(snippetId){
		let snippet = this.state.snippets.find(snippet => snippet.id == snippetId);
		let element = document.getElementById("snippets-modal");
		element = element.cloneNode(true);
		element.removeAttribute("id")

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
		element.querySelector("span").onclick = function () {
			element.parentNode.removeChild(element)
		}
		element.classList.remove("none");
		document.body.appendChild(element);
	}
	insertModal(element) {
		let inputs = element.querySelectorAll(".insert-snippet-input")
		let snippetId = element.dataset.snippetId
		let snippet = this.state.snippets.find(snippet => snippet.id == snippetId)

		var params = [];
		inputs.forEach(input => {
			params.push(input.value)
		})
		code = compileSnippet(snippet, params)
		document.getElementById("code-frame").contentWindow.codeEditor.trigger("keyboard", "type", {text: code.replaceAll("\t", "")}); 
		document.getElementById("code-frame").contentWindow.codeEditor.getAction("editor.action.formatDocument").run();

		element.parentNode.removeChild(element)
	}
	showSearch(query, normal) {
		query = query.toLowerCase()
		let showSnippets = []
		this.state.snippets.forEach(element => {
			if (element.categoryName) {
				showSnippets.push(element)
			}else{
				let name = element.name.toLowerCase()
				if (name.includes(query)) {
					showSnippets.push(element)
				}	
			}
		})
		if (normal === true) this.setState("showSnippets", showSnippets)
		else {
			document.querySelectorAll(".snippet-block").forEach(element => {element.classList.add("none")})
			this.state.showSnippets.forEach(element => {
				document.getElementById("snippet-id-"+element.id).classList.remove("none")
			})
			if (this.state.showSnippets.length === 0){
				let prev = document.getElementById("snippets-panel-no-result");
				if (prev) prev.parentNode.removeChild(prev)
				let newElement = document.createElement("h4")
				newElement.id="snippets-panel-no-result";
				newElement.style = "display: block; text-align: center"
				newElement.innerHTML = "We couldn't find any snippets that matched your query :(<br><h6 style='display: block; text-align: center'>You may need to unlock this snippet</h6>"
				document.getElementById("snippets-panel").appendChild(newElement)
			}else{
				let prev = document.getElementById("snippets-panel-no-result");
				if (prev) prev.parentNode.removeChild(prev)
			}
		}
	}
	render(props) {
		return `<div class="snippets-panel" id="snippets-panel">
		${this.state.input}
		${this.state.showSnippets.map(element => {
			if (element.categoryName) {
				return `<h2 style="margin-top: 20px; margin-bottom: 10px;">${element.categoryName}</h2>`
			}
			element.example = element.example.replaceAll("<", "&lt;").replaceAll(">", "&gt;")
			return `<div class="snippet-block" id="snippet-id-${element.id}">
			<span class="snippet-title" style="margin-bottom: 10px; display: block">${element.name}</span>
				<div class="snippet-code pointer snippet-btn" style="margin-bottom: 20px" onclick='{{_this}}.parent.children[1].showModal("${element.id}")'>
					${new codeBlock({ code: element.example, language: element.lang})}
				</div>
			</div>
				`
		}).join(" ")}
		</div>`;
	}
}

module.exports = SnippetsPanel;

