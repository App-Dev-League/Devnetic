const codeTemplateToCode=require("../utils/codeTemplateToCode.js"),codeBlock=require("./codeBlock.js"),codeBlockHelper=require("../utils/codeBlocks.js"),renderElement=require("../utils/renderElement.js");class Instructions extends tApp.Component{constructor(t,e){super(t,e)}render(t){return window.currentHint=0,this.parent.data().isUserProject?`<div>You can do whatever you want here! Supported files: 
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
			${(this.state.elements||[]).map(t=>renderElement(t)).join("")}
			<button class="info-button" id="continue-button" onclick="{{_this}}.parent.checknext();">${this.state.nextText}</button>
			<div class="hints">
				<h2>Stuck?</h2>
				${(this.state.hints||[{elements:[{type:"text",content:""}]}]).map(e=>(window.maxHints=this.state.hints.length-1,`<div class="hint none">
						${e.elements.map(t=>renderElement(e)).join("")}
					</div>`)).join("")}
				<button class="short-answer-button" style="width: fit-content; margin-top: 20px" onclick="document.querySelectorAll('.hint')[window.currentHint].classList.remove('none'); if(window.maxHints !== window.currentHint){ window.currentHint++}else{this.classList.add('btndisabled')}">Get a hint!</button>
			</div>
		</div>`}}module.exports=Instructions;