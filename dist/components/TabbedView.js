const codeTemplateToCode=require("../utils/codeTemplateToCode.js");class TabbedView extends tApp.Component{constructor(t,e){super(t,e),null==this.state.tabs&&(this.state.tabs=[{name:"",component:null}]),null==this.state.selected&&(this.state.selected=0),null==this.state.currentTabComponent&&(this.state.tabs[0]?this.state.currentTabComponent=this.state.tabs[0].component:this.state.currentTabComponent="")}updateTab(t){this.setState("selected",t),!0===this.state.forceReRender&&(document.querySelector(`[tapp-component="${this.id}"]`).querySelector(".selected-tab").innerHTML=""),this.setState("currentTabComponent",this.state.tabs[t].component)}render(t){return`<div class="project-module-tabs">
			<div class="tab-group">
				${this.state.tabs.map((t,e)=>{var s=t.tabDataset||{};let a="";return Object.entries(s).forEach(([t,e])=>{a+=`data-${t}="${e}" `}),`<div class="tab${e==this.state.selected?" tab-selected":""}" ${a} onclick="{{_this}}.updateTab(${e})">${t.name}</div>`}).join("")}
			</div>
			<div class="selected-tab">
				${this.state.currentTabComponent}
			</div>
		</div>`}}module.exports=TabbedView;