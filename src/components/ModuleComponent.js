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
	async componentHasUpdated() {
		if (this.constructor.name === "Information") {
			let element = document.querySelector(`[tApp-component="${this.id}"]`);
			let questionCount = element.querySelectorAll(".multiple-choice-wrapper").length;
			this.state.questionCount = questionCount;
			this.updateNextButtonStatus()
		}


		if (this.constructor.name === "Information" || this.constructor.name === "Congratulations" || this.constructor.name === "ShortAnswer" || this.constructor.name === "SnippetUnlock" || this.constructor.name === "MultipleChoice") {
			await fetchMenuData()
			const track = window.location.hash.split("/")[2];
			const trackName = swap(window.rawModuleData.actions)[track]
			const panel  = document.getElementById("progress-panel");
			const lessonIndex = Number(window.location.hash.split("/")[3]);
			const pageIndex = Number(window.location.hash.split("/")[4]);

			let trackData = window.rawModuleData[track].module_meta_data;
			panel.innerHTML = `<span class="panel-title">${trackName}</span><div class="panel-body"></div>`
			const body = panel.querySelector(".panel-body");
			trackData.forEach((lesson, index) => {
				let accordion = document.createElement("div");
				accordion.classList.add("accordion");
				if (index === lessonIndex) accordion.classList.add("open")
				accordion.innerHTML = `
					<span class="accordion-title">${window.rawModuleData[track].weeks[index]}<i class="fa-solid fa-chevron-right"></i></span>
				`
				body.appendChild(accordion, body.firstChild);
				
				trackData[index].pageBreakdown.forEach((info, i) => {
					let div = document.createElement("div");
					div.innerHTML = `${info.title.replace(/Week...-/, "")}`
					div.classList.add("accordion-entry");
					div.title = info.title.replace(/Week...-/, "")
					if (index === lessonIndex && i === pageIndex) div.classList.add("highlight")
					accordion.appendChild(div)
				})

				accordion.querySelector(".accordion-title").onclick = function () {
					this.parentElement.classList.toggle("open")
				}
			})

			document.getElementById("progress-panel-mobile-btn").classList.remove("none")
		} else {
			document.getElementById("progress-panel-mobile-btn").classList.add("none")
		}
	}
}
function swap(json){
	var ret = {};
	for(var key in json){
	  ret[json[key]] = key;
	}
	return ret;
  }

module.exports = ModuleComponent;