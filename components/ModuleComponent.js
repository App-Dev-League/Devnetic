class ModuleComponent extends tApp.Component {
	data() {
		return this.parent.state.data;
	}
}

module.exports = ModuleComponent;