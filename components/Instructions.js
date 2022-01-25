const codeTemplateToCode = require("../utils/codeTemplateToCode.js");
const codeBlock = require("./codeBlock.js");
const codeBlockHelper = require("../utils/codeBlocks.js");

class Instructions extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
	}
	// things to do here: make a helper function that escapes the HTML
	render(props) {
		window.currentHint = 0
		return `<div>
			<h1 class="info-title">${tApp.escape(this.state.title || "")}</h1>
			${(this.state.elements || []).map(element => {
				if(element.type == "code") {
					return `
								${new codeBlock({code: codeBlockHelper.escapeHtml(element.content || ""), language: element.lang, name: element.name})} 
							`
				} else {
					return `<pre class="info-text">${codeTemplateToCode(element.content || "")}</pre>`;
				}
			}).join("")}
			<button class="info-button" onclick="{{_this}}.parent.checknext();">Move On</button>
			<div class="hints">
				<h2>Stuck?</h2>
				${(this.state.hints || [{elements: [{type: "text", content: ""}]}]).map(element => {
					window.maxHints = this.state.hints.length - 1
					return `<div class="hint none">
						${element.elements.map(part => {
							if(part.type == "code") {
								return `
											${new codeBlock({code: codeBlockHelper.escapeHtml(part.content || ""), language: element.lang, name: element.name})} 
										`
							} else {
								return `<pre class="info-text">${codeTemplateToCode(part.content || "")}</pre>`;
							}
						}).join("")}
					</div>`
				}).join("")}
				<button class="short-answer-button" style="width: fit-content; margin-top: 20px" onclick="document.querySelectorAll('.hint')[window.currentHint].classList.remove('none'); if(window.maxHints !== window.currentHint){ window.currentHint++}else{this.classList.add('btndisabled')}">Get a hint!</button>
			</div>
		</div>`;
	}
}

module.exports = Instructions;