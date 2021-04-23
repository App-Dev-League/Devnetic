function getLessonData(lesson, position) {
	return new Promise(async (resolve, reject) => {
		let data = await tApp.get(`/data/lessons/${lesson}.json`).catch((err) => {
			reject(err);
		});
		let parsedData = await data.json().catch((err) => {
			reject(err);
		});
		resolve(parsedData[position]);
	});
}

function getLessonPosition(lesson) {
	return 0;
}

function codeTemplateToCode(template) {
	template = tApp.escape(template);
	template = template.replaceAll("[[/]]", '</span>');
	template = template.replaceAll("[[red]]", '<span class="c-red">');
	template = template.replaceAll("[[darkred]]", '<span class="c-darkred">');
	template = template.replaceAll("[[lightorange]]", '<span class="c-lightorange">');
	template = template.replaceAll("[[orange]]", '<span class="c-orange">');
	template = template.replaceAll("[[darkorange]]", '<span class="c-darkorange">');
	template = template.replaceAll("[[yellow]]", '<span class="c-yellow">');
	template = template.replaceAll("[[green]]", '<span class="c-green">');
	template = template.replaceAll("[[darkgreen]]", '<span class="c-darkgreen">');
	template = template.replaceAll("[[turquoise]]", '<span class="c-turquoise">');
	template = template.replaceAll("[[darkturquoise]]", '<span class="c-darkturquoise">');
	template = template.replaceAll("[[lightblue]]", '<span class="c-lightblue">');
	template = template.replaceAll("[[blue]]", '<span class="c-blue">');
	template = template.replaceAll("[[lightpurple]]", '<span class="c-lightpurple">');
	template = template.replaceAll("[[purple]]", '<span class="c-purple">');
	template = template.replaceAll("[[white]]", '<span class="c-white">');
	template = template.replaceAll("[\\[", '[[');
	return template;
}

class MultipleChoiceOption extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		return `<div class="mc-answer mc-answer-${this.state.index}" onclick="{{_this}}.update();">
	<p>${tApp.escape(this.parent.parent.state.multiple_choice.answers[this.state.index])}</p>
</div>`;
	}
	update() {
		this.parent.parent.setState("multiple_choice.selectedAnswer", this.state.index);
	}
}

class ExplanationModel extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
		if(this.state.title == null) {
			this.state.title = "";
		}
		if(this.state.description == null) {
			this.state.description = "";
		}
	}
	render(props) {
		return `<div class="explanation-wrapper">
	<div class="explanation-modal">
		<h3>${tApp.escape(this.state.title)}</h3>
		<p>${tApp.escape(this.state.description)}</h3>
		<button onclick="{{_this}}.parent.parent.setState('multiple_choice.selectedAnswer', null);" style="color: black">Try Again</button>
	</div>
</div>`;
	}
}

class MultipleChoice extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
		if(this.state.options == null) {
			this.state.options = {};
		}
		if(this.state.options[0] == null) {
			this.state.options[0] = new MultipleChoiceOption({index: 0}, this);
		}
		if(this.state.options[1] == null) {
			this.state.options[1] = new MultipleChoiceOption({index: 1}, this);
		}
		if(this.state.options[2] == null) {
			this.state.options[2] = new MultipleChoiceOption({index: 2}, this);
		}
		if(this.state.options[3] == null) {
			this.state.options[3] = new MultipleChoiceOption({index: 3}, this);
		}
		if(this.state.explanation == null) {
			this.state.explanation = new ExplanationModel({}, this);
		}
	}
	render(props) {
		let returnStr = `<div>
	<h1 class="mc-question">${tApp.escape(this.parent.state.multiple_choice.question)}</h1>
	<div class="mc-codeblock">
		<pre>${this.parent.state.multiple_choice.code}</pre>
	</div>
	<div class="mc-answer-container">
		${this.state.options[0]}
		${this.state.options[1]}
		${this.state.options[2]}
		${this.state.options[3]}
	</div>`;
		if(this.parent.state.multiple_choice.selectedAnswer != null) {
			returnStr += this.state.explanation.toString();
			if(this.parent.state.multiple_choice.selectedAnswer == this.parent.state.multiple_choice.correct) {
				this.state.explanation.state.title = "Correct!";
				/*returnStr = `<div>
		<h1 class="mc-question">Correct!</h1>
		<center><button onclick="{{_this}}.parent.setState('multiple_choice.selectedAnswer', null);" style="color: black">Back</button></center>
	</div>`;*/
			} else {
				this.state.explanation.state.title = "Incorrect!";
				/*returnStr = `<div>
		<h1 class="mc-question">Incorrect!</h1>
		<center><button onclick="{{_this}}.parent.setState('multiple_choice.selectedAnswer', null);" style="color: black">Back</button></center>
	</div>`;*/
			}
		}
		returnStr += "</div>";
		return returnStr;
	}
}

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
}

tApp.configure({
	target: document.querySelector("tapp-main"),
	ignoreRoutes: [],
	forbiddenRoutes: [],
	errorPages: {
		notFound: "#/404",
		forbidden: "#/403"
	},
	/*
	caching: {
		backgroundPages: ["/", "/config.js", "/tApp.js", "/assets/img/icon1.png", "/assets/img/icon2.png", "/views/index.html", "/views/multiple_choice.html"],
		periodicUpdate: 60 * 1000,
		persistent: true
	}
	*/
	caching: null
});

tApp.route("/", function(request) {
	tApp.redirect("#/");
});

tApp.route("#/", function(request) {
	tApp.renderFile("./views/index.html");
});

tApp.route("#/learn/<lesson>/", function(request) {
	tApp.redirect(`#/learn/${request.data.lesson}/${getLessonPosition(request.data.lesson)}/`);
});

let lessonPage = new LessonPage();
let multipleChoice = new MultipleChoice({}, lessonPage);
tApp.route("#/learn/<lesson>/<position>", function(request) {
	getLessonData(request.data.lesson, request.data.position).then((data) => {
		data.code = codeTemplateToCode(data.code_template);
		
		if(data.type == "multiple_choice") {
			lessonPage.setState("multiple_choice", data);
			lessonPage.setComponent(multipleChoice);
			tApp.renderTemplateHTML("{{ lessonPage }}", {
				lessonPage: lessonPage.toString()
			});
		}
	}).catch((err) => {
		console.log(err);
		// console.error(err);
		tApp.renderPath("#/404");
	})
});

tApp.route("#/404", function(request) {
	tApp.render(`
		<h1>Error 404</h1>
		<p>Page not found.</p>
	`);
});

tApp.route("#/403", function(request) {
	tApp.render(`
		<h1>Error 403</h1>
		<p>Access denied.</p>
	`);
});

tApp.start().then(() => {
	/*tApp.install().then(() => {
		tApp.update();
	});*/
});