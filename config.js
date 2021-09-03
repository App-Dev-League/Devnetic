(async () => {
	await installAll([
		"ExplanationModal.js",
		"LessonPage.js",
		"Information.js",
		"MultipleChoice.js",
		"MultipleChoiceOption.js",
		"ShortAnswer.js",
		"SnippetUnlock.js",
		"Congratulations.js"
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
	const SnippetUnlock = require("./components/SnippetUnlock.js");
	const Congratulations = require("./components/Congratulations.js");
	const codeTemplateToCode = require("./utils/codeTemplateToCode.js");
	const shuffleArray = require("./utils/shuffleArray.js");
	const Database = require("./utils/Database.js");

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

	tApp.route("#/learn/<lesson>/", async function(request) {
		tApp.redirect(`#/learn/${request.data.lesson}/${await Database.getLessonPosition(request.data.lesson)}/`);
	});

	let lessonPage = new LessonPage();
	let information = new Information({}, lessonPage);
	let multipleChoice = new MultipleChoice({}, lessonPage);
	let shortAnswer = new ShortAnswer({}, lessonPage);
	let snippetUnlock = new SnippetUnlock({}, lessonPage);
	let congratulations = new Congratulations({}, lessonPage);
	tApp.route("#/learn/<lesson>/<position>", function(request) {
		Database.getLessonData(request.data.lesson, request.data.position).then((res) => {
			let data = res[0];
			let type = res[1];
			if(type == "lesson") {
				if(data.code_template != null) {
					data.code = codeTemplateToCode(data.code_template);
				}
				lessonPage.state.multiple_choice = null;
				lessonPage.state.short_answer = null;
				lessonPage.state.Database = Database;
				lessonPage.state.next = "#/learn/" + request.data.lesson + "/" + (parseInt(request.data.position) + 1);
				lessonPage.state.lesson = request.data.lesson;
				lessonPage.state.position = request.data.position;
				if(data.type == "information") {
					lessonPage.state.information = data;
					lessonPage.setComponent(information);
				} else if(data.type == "multiple_choice") {
					let shuffled = shuffleArray([...data.answers]);
					let indexList = [];
					for(let i = 0; i < shuffled.length; i++) {
						indexList.push(data.answers.findIndex(answer => answer === shuffled[i]));
					}
					let answers = [];
					for(let i = 0; i < indexList.length; i++) {
						answers.push(data.answers[indexList[i]]);
					}
					let descriptions = [];
					for(let i = 0; i < indexList.length; i++) {
						descriptions.push(data.descriptions[indexList[i]]);
					}
					data.answers = answers;
					data.descriptions = descriptions;
					data.correct = indexList.findIndex(index => index === data.correct);
					lessonPage.state.multiple_choice = data;
					lessonPage.setComponent(multipleChoice);
				} else if(data.type == "short_answer") {
					lessonPage.state.short_answer = data;
					lessonPage.setComponent(shortAnswer);
				} else if(data.type == "snippet_unlock") {
					lessonPage.state.snippet_unlock = data;
					lessonPage.setComponent(snippetUnlock);
				} else if(data.type == "congratulations") {
					lessonPage.state.congratulations = data;
					lessonPage.setComponent(congratulations);
				}
				tApp.render(lessonPage.toString());
			} else {
				alert("Error! Unknown type " + type);
			}
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

	let score = await Database.getScore();
	document.querySelector("#score").innerHTML = `${score.points} XP, ${score.coins} Coins`;

	tApp.start().then(() => {
		/*tApp.install().then(() => {
			tApp.update();
		});*/
	});
})();