class ModulePage extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		return `<div>
	${this.state.component}
</div>`;
	}
	setComponent(component, data) {
		if(this.state.component != null) {
			this.state.component.destroy();
		}
		this.state.data = data;
		this.setState("component", component);
	}
	async next() {
		if (document.getElementById("continue-button") && document.getElementById("continue-button").classList.contains("continue-button-disabled")) return;
		if(this.state.next != null) {
			if(this.state.data.type == "snippet_unlock" && this.state.data.snippet != null) {
				await this.state.Database.storeSnippet(this.state.data.snippet);
			}
			await this.state.Database.updateState(this.state.track, this.state.module, this.state.position);
			let score = await this.state.Database.getScore();
			document.querySelector("#score").innerHTML = `${score.points} XP, ${score.coins} Coins`;
			window.location.hash = this.state.next;
		}
	}
}

module.exports = ModulePage;