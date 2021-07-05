(async () => {
	await installAll([
		"ExplanationModal.js",
		"LessonPage.js",
		"Information.js",
		"MultipleChoice.js",
		"MultipleChoiceOption.js",
		"ShortAnswer.js"
	], {
		path: "./components/"
	});

	await installAll([
		"codeTemplateToCode.js",
		"shuffleArray.js",
		"Database.js",
	], {
		path: "./utils/"
	});

	const LessonPage = require("./components/LessonPage.js");
	const Information = require("./components/Information.js");
	const MultipleChoice = require("./components/MultipleChoice.js");
	const ShortAnswer = require("./components/ShortAnswer.js");
	const codeTemplateToCode = require("./utils/codeTemplateToCode.js");
	const Database = require("./utils/Database.js");

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
	let information = new Information({}, lessonPage);
	let multipleChoice = new MultipleChoice({}, lessonPage);
	let shortAnswer = new ShortAnswer({}, lessonPage);
	tApp.route("#/learn/<lesson>/<position>", function(request) {
		getLessonData(request.data.lesson, request.data.position).then((data) => {
			if(data.code_template != null) {
				data.code = codeTemplateToCode(data.code_template);
			}
			lessonPage.state.multiple_choice = null;
			lessonPage.state.short_answer = null;
			lessonPage.state.next = "#/learn/" + request.data.lesson + "/" + (parseInt(request.data.position) + 1);
			if(data.type == "information") {
				lessonPage.state.information = data;
				lessonPage.setComponent(information);
			} else if(data.type == "multiple_choice") {
				lessonPage.state.multiple_choice = data;
				lessonPage.setComponent(multipleChoice);
			} else if(data.type == "short_answer") {
				lessonPage.state.short_answer = data;
				lessonPage.setComponent(shortAnswer);
			}
			tApp.render(lessonPage.toString());
		}).catch((err) => {
			// console.log(err);
			console.error(err);
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
})();