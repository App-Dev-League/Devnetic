(async () => {
	await installAll([
		"CodeEditor.js",
		"CodePreview.js",
		"Congratulations.js",
		"Editor.js",
		"ExplanationModal.js",
		"Information.js",
		"Instructions.js",
		"ModulePage.js",
		"MultipleChoice.js",
		"MultipleChoiceOption.js",
		"ShortAnswer.js",
		"SnippetsPanel.js",
		"SnippetUnlock.js",
		"TabbedView.js"
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

	const ModulePage = require("./components/ModulePage.js");
	const Information = require("./components/Information.js");
	const MultipleChoice = require("./components/MultipleChoice.js");
	const ShortAnswer = require("./components/ShortAnswer.js");
	const SnippetUnlock = require("./components/SnippetUnlock.js");
	const Congratulations = require("./components/Congratulations.js");
	const CodeEditor = require("./components/CodeEditor.js");

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

	tApp.route("#/learn/<module>/", async function(request) {
		tApp.redirect(`#/learn/${request.data.module}/${await Database.getModulePosition(request.data.module)}/`);
	});

	let modulePage = new ModulePage();
	let information = new Information({}, modulePage);
	let multipleChoice = new MultipleChoice({}, modulePage);
	let shortAnswer = new ShortAnswer({}, modulePage);
	let snippetUnlock = new SnippetUnlock({}, modulePage);
	let congratulations = new Congratulations({}, modulePage);
	let codeEditor = new CodeEditor({}, modulePage);

	tApp.route("#/learn/<module>/<position>", function(request) {
		Database.getModuleData(request.data.module, request.data.position).then((res) => {
			let data = res[0];
			let type = res[1];
			if(type == "lesson" || type == "project") {
				if(data.code_template != null) {
					data.code = codeTemplateToCode(data.code_template);
				}
				modulePage.state.multiple_choice = null;
				modulePage.state.short_answer = null;
				modulePage.state.Database = Database;
				modulePage.state.next = "#/learn/" + request.data.module + "/" + (parseInt(request.data.position) + 1);
				modulePage.state.module = request.data.module;
				modulePage.state.position = request.data.position;
				if(data.type == "information") {
					modulePage.state.information = data;
					modulePage.setComponent(information);
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
					modulePage.state.multiple_choice = data;
					modulePage.setComponent(multipleChoice);
				} else if(data.type == "short_answer") {
					modulePage.state.short_answer = data;
					modulePage.setComponent(shortAnswer);
				} else if(data.type == "snippet_unlock") {
					modulePage.state.snippet_unlock = data;
					modulePage.setComponent(snippetUnlock);
				} else if(data.type == "congratulations") {
					modulePage.state.congratulations = data;
					modulePage.setComponent(congratulations);
				} else if(data.type == "code_editor") {
					modulePage.state.code_editor = data;
					modulePage.setComponent(codeEditor);
				}
				tApp.render(modulePage.toString());
			} else {
				tApp.renderPath("#/404");
				console.error("Unknown type " + type);
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