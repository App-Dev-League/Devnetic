const codeTemplateToCode = require("../utils/codeTemplateToCode.js");
const codeBlock = require("./codeBlock.js");
const codeBlockHelper = require("../utils/codeBlocks.js");
const renderElement = require("../utils/renderElement.js");

class Instructions extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		window.currentHint = 0
		if (this.parent.data().isUserProject) return `<div>You can do whatever you want here! Supported files: 
		<br>
		 - .js
		 <br>
		 - .ts
		 <br>
		 - .html
		 <br>
		 - .css
		 <br>
		 - .jsx
		 <br>
		 - .py
		 <br>
		 - .md
		 <br>
		 - .pl
		 <br>
		 - .cpp
		</div>`;
		return `<div class="animate-out">
			<h1 class="info-title">${tApp.escape(this.state.title || "")}</h1>
			${(this.state.elements || []).map((element, i) => {
				return renderElement(element, i)
			}).join("")}
			<button class="info-button" id="continue-button" onclick="{{_this}}.parent.checknext();">${this.state.nextText}</button>
			<div class="hints">
				<h2>Stuck?</h2>
				${(this.state.hints || [{elements: [{type: "text", content: ""}]}]).map(element => {
					window.maxHints = this.state.hints.length - 1
					return `<div class="hint none">
						${element.elements.map((part, i) => {
							return renderElement(element, i)
						}).join("")}
					</div>`
				}).join("")}
				<button class="short-answer-button" style="width: fit-content; margin-top: 20px" onclick="document.querySelectorAll('.hint')[window.currentHint].classList.remove('none'); if(window.maxHints !== window.currentHint){ window.currentHint++}else{this.classList.add('btndisabled')}">Get a hint!</button>
			</div>
		</div>`;
	}
}

module.exports = Instructions;