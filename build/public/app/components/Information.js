const ModuleComponent=require("./ModuleComponent.js"),renderElement=require("../utils/renderElement.js"),renderMdd=require("../utils/renderMdd.js");class Information extends ModuleComponent{constructor(e,t){super(e,t)}render(e){return null!=this.data()?`<div class="information-wrapper animate-out">
				<div class="stack-width-wrapper">
					<div class="stack-width">
						<h1 class="info-title">${tApp.escape(this.data().title||"")}</h1>
						${this.data().mdd?renderMdd(this.data().mdd):(this.data().elements||[]).map((e,t)=>renderElement(e,t)).join("")}
						<button class="info-button" id="continue-button" onclick="{{_this}}.parent.next();">Continue</button>
					</div>
				</div>
			</div>`:"<div></div>"}}module.exports=Information;