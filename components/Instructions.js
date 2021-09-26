const codeTemplateToCode = require("../utils/codeTemplateToCode.js");

class Instructions extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		return `<div>
			<h1 class="info-title">${tApp.escape(this.state.title || "")}</h1>
			${(this.state.elements || []).map(element => {
				if(element.type == "code") {
					return `<div class="codeblock info-codeblock">
								<pre>${codeTemplateToCode(element.content || "")}</pre>
							</div>`
				} else {
					return `<pre class="info-text">${codeTemplateToCode(element.content || "")}</pre>`;
				}
			}).join("")}
			<button class="info-button" onclick="{{_this}}.parent.next();">Move On</button>
		</div>`;
	}
}

module.exports = Instructions;