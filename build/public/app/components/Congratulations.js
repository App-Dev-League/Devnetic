const ModuleComponent=require("./ModuleComponent.js"),renderElement=require("../utils/renderElement.js");class Congratulations extends ModuleComponent{constructor(e,t){super(e,t)}render(e){return null!=this.data()?`<div class="information-wrapper">
			<div class="left-panel" id="progress-panel">
				<span class="panel-title"></span>
			</div>
			<div class="stack-width-wrapper">
				<div class="stack-width">
					<h1 class="info-title">${tApp.escape(this.data().title||"")}</h1>
					${(this.data().elements||[]).map(e=>renderElement(e)).join("")}
					<button class="info-button" id="continue-button" onclick="{{_this}}.parent.next();">Next Module</button>
				</div>
			</div>
			</div>`:"<div></div>"}}module.exports=Congratulations;