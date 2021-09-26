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
	}
	render(props) {
		return `<div class="project-module-tabs">
			<div class="tab-group">
				${this.state.tabs.map((tab, index) => {
					return `<div class="tab${index == this.state.selected ? " tab-selected" : ""}" onclick="{{_this}}.setState('selected', ${index});">${tab.name}</div>`;
				}).join("")}
			</div>
			<div class="selected-tab">
				${
					this.state.tabs[this.state.selected].component
				}
			</div>
		</div>`;
	}
}

module.exports = TabbedView;