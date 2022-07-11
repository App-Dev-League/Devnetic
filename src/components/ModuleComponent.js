class ModuleComponent extends tApp.Component {
	constructor(state, parent) {
		super(state, parent)
		this.state.questionCount = 0;
		this.state.completedQuestions = 0;
	}
	data() {
		return this.parent.state.data;
	}
	increaseCompletedQuestions() {
		this.state.completedQuestions++;
		this.updateNextButtonStatus();
	}
	updateNextButtonStatus() {
		if (this.state.completedQuestions === this.state.questionCount) {
			document.getElementById("continue-button").classList.remove("continue-button-disabled")
			document.getElementById("continue-button").title = "Continue to next page"
		} else {
			document.getElementById("continue-button").classList.add("continue-button-disabled")
			document.getElementById("continue-button").title = "You must finish answering all the questions before moving on!"
		}
	}
	componentHasUpdated() {
		if (this.constructor.name === "Information") {
			let element = document.querySelector(`[tApp-component="${this.id}"]`);
			let questionCount = element.querySelectorAll(".multiple-choice-wrapper").length;
			this.state.questionCount = questionCount;
			this.updateNextButtonStatus()
		}
	}
}

module.exports = ModuleComponent;