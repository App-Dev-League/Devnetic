const codeBlockHelper = require("../utils/codeBlocks.js");

class codeBlock extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
        this.codeId = ""
        var goodThis = this;
        setTimeout(function(){
            codeBlockHelper.updateCodeBlock(document.getElementById(goodThis.codeId))
        }, 100)
	}
    componentHasUpdated(){
        codeBlockHelper.updateCodeBlock(document.getElementById(this.codeId))
    }
    componentWillUpdate(){
    }

	render(props) {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        function generateString(length) {
            let result = '';
            const charactersLength = characters.length;
            for ( let i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
        window.codeBlockHelper = codeBlockHelper;
        this.codeId = generateString(30);
        var codeId = this.codeId;
        var language = ""
        if (this.state.language) language = "language-"+this.state.language;
        var extraStyles = "padding-top: 25px"
        if (!this.state.name) extraStyles = ""
		return `
				<div class="snippet-code">
                <span style="position: relative; display: block; text-align: center; top: 4px; z-index: 1; font-weight: var(--chakra-fontWeights-semibold); height: 0">${this.state.name || ""}</span>
					<pre id="${this.codeId}" class="${language}" style="${extraStyles}">
${this.state.code}
					</pre>
				</div>`;
	}
}

module.exports = codeBlock;