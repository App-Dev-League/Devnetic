class LessonPage extends tApp.Component {
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
	next() {
		if(this.state.next != null) {
			window.location.hash = this.state.next;
		}
	}
}

module.exports = LessonPage;