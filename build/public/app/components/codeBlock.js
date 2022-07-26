const codeBlockHelper=require("../utils/codeBlocks.js");class codeBlock extends tApp.Component{constructor(e,t){super(e,t),this.codeId="";var o=this;setTimeout(function(){codeBlockHelper.updateCodeBlock(document.getElementById(o.codeId))},100)}componentHasUpdated(){codeBlockHelper.updateCodeBlock(document.getElementById(this.codeId))}componentWillUpdate(){}render(e){const d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";window.codeBlockHelper=codeBlockHelper,this.codeId=function(){let t="";var o=d.length;for(let e=0;e<30;e++)t+=d.charAt(Math.floor(Math.random()*o));return t}(),this.codeId;var t="",o=(this.state.language&&(t="language-"+this.state.language),"padding-top: 25px");return this.state.name||(o=""),`
				<div class="snippet-code">
                <span style="position: relative; display: block; text-align: center; top: 4px; z-index: 1; font-weight: var(--chakra-fontWeights-semibold); height: 0">${this.state.name||""}</span>
					<pre id="${this.codeId}" class="${t}" style="${o}">
${this.state.code}
					</pre>
				</div>`}}module.exports=codeBlock;