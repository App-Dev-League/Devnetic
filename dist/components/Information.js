const ModuleComponent=require("./ModuleComponent.js"),codeBlock=require("./codeBlock.js"),codeBlockHelper=require("../utils/codeBlocks.js"),codeTemplateToCode=require("../utils/codeTemplateToCode.js");class Information extends ModuleComponent{constructor(e,t){super(e,t)}render(e){return null!=this.data()?`<div>
	<h1 class="info-title">${tApp.escape(this.data().title||"")}</h1>
	${(this.data().elements||[]).map(t=>{if("code"==t.type)return`<div class="codeblock-wrapper">
			${new codeBlock({code:codeBlockHelper.escapeHtml(t.content||""),language:t.lang,name:t.name})}
</div>`;if("divider"==t.type)return t.height?`<div style="width: 100%; height: ${t.height}px; background-color: rgba(0,0,0,0)"></div>`:'<div style="width: 100%; height: 20px; background-color: rgba(0,0,0,0)"></div>';if("image"!=t.type)return`<pre class="info-text">${codeTemplateToCode(t.content||"")}</pre>`;{let e=t,o=(e.width||(e.width="90%"),"");return Object.entries(e).forEach(([e,t])=>{"src"!==e&&"type"!==e&&(o+=e+`: ${t};`)}),`<div class="image-wrapper info-text"><img src="${t.src}" style="display: block; margin-left: auto; margin-right: auto; ${o}"></div>`}}).join("")}
	<button class="info-button" onclick="{{_this}}.parent.next();">Continue</button>
</div>`:"<div></div>"}}module.exports=Information;