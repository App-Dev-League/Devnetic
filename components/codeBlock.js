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
        console.log("CodeBlock Component has loaded!")
        codeBlockHelper.updateCodeBlock(document.getElementById(this.codeId))
    }
    componentWillUpdate(){
        console.log("Component will be updated")
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
		return `
				<div class="snippet-code">
					<pre id="${this.codeId}">
${this.state.code}
					</pre>
				</div>`;
	}
}

module.exports = codeBlock;