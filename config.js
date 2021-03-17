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
		return `<div class="mc-answer mc-answer-{{state.index}}" onclick="{{_this}}.update();">
	<p>{{{ tApp.escape({{_parent}}.parent.state.multiple_choice.answers[state.index]) }}}</p>
</div>`;
	}
	update() {
		console.log(this.state.index);
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
	}
	render(props) {
		return `<div>
	<h1 class="mc-question">{{{ tApp.escape(parent.state.multiple_choice.question) }}}</h1>
	<div class="mc-codeblock">
		<pre>{{ parent.state.multiple_choice.code }}</pre>
	</div>
	<div class="mc-answer-container">
		${this.state.options[0]}
		${this.state.options[1]}
		${this.state.options[2]}
		${this.state.options[3]}
	</div>
</div>`;
	}
}

class LessonPage extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
	}
	render(props) {
		return `${this.state.component}`;
	}
	setComponent(component) {
		if(this.state.component != null) {
			this.state.component.destroy();
		}
		this.state.component = component;
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
tApp.route("#/learn/<lesson>/<position>", function(request) {
	getLessonData(request.data.lesson, request.data.position).then((data) => {
		data.code = codeTemplateToCode(data.code_template);
		
		if(data.type == "multiple_choice") {
			lessonPage.setComponent(new MultipleChoice({}, lessonPage));
			lessonPage.setState("multiple_choice", data);
			tApp.renderTemplateHTML("{{ lessonPage }}", {lessonPage: lessonPage.toString()});
		}
	}).catch((err) => {
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