class ModulePage extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		return `<div>
	${this.state.component}
</div>`;
	}
	setComponent(component) {
		if(this.state.component != null) {
			//this.state.component.destroy();
		}
		this.setState("component", component);
	}
	async next() {
		if(this.state.next != null) {
			await this.state.Database.updateState(this.state.module, this.state.position);
			let score = await this.state.Database.getScore();
			document.querySelector("#score").innerHTML = `${score.points} XP, ${score.coins} Coins`;
			window.location.hash = this.state.next;
		}
	}
}

module.exports = ModulePage;