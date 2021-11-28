const codeTemplateToCode = require("../utils/codeTemplateToCode.js");
const codeBlock = require("./codeBlock.js");
const codeBlockHelper = require("../utils/codeBlocks.js");

class Instructions extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
	}
	// things to do here: make a helper function that escapes the HTML
	render(props) {
		return `<div>
			<h1 class="info-title">${tApp.escape(this.state.title || "")}</h1>
			${(this.state.elements || []).map(element => {
				if(element.type == "code") {
					return `
								${new codeBlock({code: codeBlockHelper.escapeHtml(element.content || "")})} 
							`
				} else {
					return `<pre class="info-text">${codeTemplateToCode(element.content || "")}</pre>`;
				}
			}).join("")}
			<button class="info-button" onclick="{{_this}}.parent.next();">Move On</button>
		</div>`;
	}
}

module.exports = Instructions;