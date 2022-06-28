const ModuleComponent=require("./ModuleComponent.js"),codeTemplateToCode=require("../utils/codeTemplateToCode.js"),codeBlock=require("./codeBlock.js");class SnippetUnlock extends ModuleComponent{constructor(e,t){super(e,t)}render(e){return null!=this.data()?(this.parent.state.Database.storeSnippet(this.data().snippet),`<div>
	<h1 class="info-title">Snippet Unlocked: ${tApp.escape(this.data().name||"")}!</h1>
	<pre class="info-text">${codeTemplateToCode(this.data().description||"")}</pre>
	<div class="codeblock-wrapper">
	${new codeBlock({code:this.data().code,language:this.data().lang,name:this.data().name},this)}
		</div>
	<button class="info-button" onclick="{{_this}}.parent.next();">Continue</button>
</div>`):"<div></div>"}}module.exports=SnippetUnlock;