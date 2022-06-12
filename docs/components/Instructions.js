const codeTemplateToCode=require("../utils/codeTemplateToCode.js"),codeBlock=require("./codeBlock.js"),codeBlockHelper=require("../utils/codeBlocks.js");class Instructions extends tApp.Component{constructor(e,t){super(e,t)}render(e){return window.currentHint=0,this.parent.data().isUserProject?`<div>You can do whatever you want here! Supported files: 
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
		</div>`:`<div>
			<h1 class="info-title">${tApp.escape(this.state.title||"")}</h1>
			${(this.state.elements||[]).map(t=>{if("code"==t.type)return`
								${new codeBlock({code:codeBlockHelper.escapeHtml(t.content||""),language:t.lang,name:t.name})} 
							`;if("image"!=t.type)return`<pre class="info-text">${codeTemplateToCode(t.content||"")}</pre>`;{let e=t,n=(e.width||(e.width="90%"),"");return Object.entries(e).forEach(([e,t])=>{"src"!==e&&"type"!==e&&(n+=e+`: ${t};`)}),`<div class="image-wrapper info-text"><img src="${t.src}" style="display: block; margin-left: auto; margin-right: auto; ${n}"></div>`}}).join("")}
			<button class="info-button" onclick="{{_this}}.parent.checknext();">${this.state.nextText}</button>
			<div class="hints">
				<h2>Stuck?</h2>
				${(this.state.hints||[{elements:[{type:"text",content:""}]}]).map(e=>(window.maxHints=this.state.hints.length-1,`<div class="hint none">
						${e.elements.map(t=>{if("code"==t.type)return`
											${new codeBlock({code:codeBlockHelper.escapeHtml(t.content||""),language:e.lang,name:e.name})} 
										`;if("image"!=t.type)return`<pre class="info-text">${codeTemplateToCode(t.content||"")}</pre>`;{let e=t,n=(e.width||(e.width="90%"),"");return Object.entries(e).forEach(([e,t])=>{"src"!==e&&"type"!==e&&(n+=e+`: ${t};`)}),`<div class="image-wrapper info-text"><img src="${t.src}" style="display: block; margin-left: auto; margin-right: auto; ${n}"></div>`}}).join("")}
					</div>`)).join("")}
				<button class="short-answer-button" style="width: fit-content; margin-top: 20px" onclick="document.querySelectorAll('.hint')[window.currentHint].classList.remove('none'); if(window.maxHints !== window.currentHint){ window.currentHint++}else{this.classList.add('btndisabled')}">Get a hint!</button>
			</div>
		</div>`}}module.exports=Instructions;