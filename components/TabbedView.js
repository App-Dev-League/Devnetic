const codeTemplateToCode = require("../utils/codeTemplateToCode.js");

class TabbedView extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
		if(this.state.tabs == null) {
			this.state.tabs = [{
				name: "",
				component: null
			}];
		}
		if(this.state.selected == null) {
			this.state.selected = 0;
		}
		if(this.state.currentTabComponent == null) {
			this.state.currentTabComponent = this.state.tabs[0].component;
		}
	}
	updateTab(index) {
		this.setState('selected', index);
		if (this.state.forceReRender === true) {
			document.querySelector(`[tapp-component="${this.id}"]`).querySelector(".selected-tab").innerHTML = ""
		}
		this.setState("currentTabComponent", this.state.tabs[index].component);
	}

	render(props) {
		return `<div class="project-module-tabs">
			<div class="tab-group">
				${this.state.tabs.map((tab, index) => {
					let dataset = tab.tabDataset || {};
					let stringDataset = ""
					Object.entries(dataset).forEach(([key, value]) => {
						stringDataset += `data-${key}="${value}" `
					})
					return `<div class="tab${index == this.state.selected ? " tab-selected" : ""}" ${stringDataset} onclick="{{_this}}.updateTab(${index})">${tab.name}</div>`;
				}).join("")}
			</div>
			<div class="selected-tab">
				${
					this.state.currentTabComponent
				}
			</div>
		</div>`;
	}
}

module.exports = TabbedView;