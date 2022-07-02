const ModuleComponent=require("./ModuleComponent.js"),renderElement=require("../utils/renderElement.js");class Information extends ModuleComponent{constructor(e,t){super(e,t)}render(e){return null!=this.data()?`<div>
	<h1 class="info-title">${tApp.escape(this.data().title||"")}</h1>
	${(this.data().elements||[]).map(e=>renderElement(e)).join("")}
	<button class="info-button" onclick="{{_this}}.parent.next();">Continue</button>
</div>`:"<div></div>"}}module.exports=Information;