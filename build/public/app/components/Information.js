const ModuleComponent=require("./ModuleComponent.js"),renderElement=require("../utils/renderElement.js");class Information extends ModuleComponent{constructor(t,e){super(t,e)}render(t){return null!=this.data()?`<div class="stack-width">
	<h1 class="info-title">${tApp.escape(this.data().title||"")}</h1>
	${(this.data().elements||[]).map(t=>renderElement(t)).join("")}
	<button class="info-button" id="continue-button" onclick="{{_this}}.parent.next();">Continue</button>
</div>`:"<div></div>"}}module.exports=Information;