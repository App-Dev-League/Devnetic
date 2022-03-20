(async () => {
	await installAll([
		"CodeEditor.js",
		"CodePreview.js",
		"Congratulations.js",
		"Editor.js",
		"ExplanationModal.js",
		"Information.js",
		"Input.js",
		"Instructions.js",
		"ModuleComponent.js",
		"ModulePage.js",
		"MultipleChoice.js",
		"MultipleChoiceOption.js",
		"ShortAnswer.js",
		"SnippetsPanel.js",
		"SnippetUnlock.js",
		"TabbedView.js",
		"codeBlock.js",
		"PluginPanel.js"
	], {
		path: "./components/"
	});

	await installAll([
		"Database.js",
		"codeEditor.js",
		"codeTemplateToCode.js",
		"compileSnippet.js",
		"shuffleArray.js",
		"codeBlocks.js",
		"plugins.js"
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
	const plugins = require("./utils/plugins.js");

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

	tApp.route("/", function (request) {
		tApp.redirect("#/");
	});

	tApp.route("#/", function (request) {
		tApp.renderFile("./views/index.html");
	});
	tApp.route("#/track/<track>", function (request) {
		tApp.renderFile(`./views/${request.data.track}.html`).catch((err) => {
			tApp.renderPath("#/404");
		});
	});

	tApp.route("#/learn/<track>/<module>/", async function (request) {
		tApp.redirect(`#/learn/${request.data.track}/${request.data.module}/${await Database.getModulePosition(request.data.track, request.data.module)}/`);
	});
	window.DB = Database;
	tApp.route("#/preview/html/<id>/autoupdate", async function (request) {
		let id = request.data.id
		if (!id.endsWith(".html") && !id.endsWith(".jsx")) {
			return tApp.render(`
			<h1>Error</h1>
			<p>Currently, only HTML and JSX files are only supported in window preview mode :(</p>`);
		}
		let html = await Database.getCode(id);
		if (!html) tApp.render("<h4>We couldn't find your file!</h4>")
		var loadScript = `
			document.getElementById("preview").srcdoc = await window.DB.getCode("${id}")`
		if (id.endsWith(".jsx")) {
			loadScript = `
			const plugins = require("./utils/plugins.js");
			   async function main(){
					await plugins.load("react");
					let code = await window.DB.getCode("${id}")
					code = Babel.transform(code, {
						plugins: ["transform-react-jsx"]
					}).code;
					document.getElementById("preview").srcdoc = "<html> <body> <div id='root'></div> <script>"+plugins.getCode("react")+"<\\/script><script>"+code+"<\\/script></body></html>";
			   }
			   main()
			`
		}
		tApp.render(`<div>
		<script>
		async function load(){
		${loadScript}
		}
		load();
		window.addEventListener('storage', load)
		</script>
		<style>header{display: none !important}</style><script></script><iframe id="preview" srcdoc="Loading...." style="width: 100vw; height: 100vh; border: none; background: white; position: fixed; z-index: 500; top: 0; left 0; display: block"></iframe></div>
		<script>
		document.getElementById("preview").onload = function(){
			document.title = document.getElementById("preview").contentDocument.title;
		}
		</script>
		`);
	})
	tApp.route("#/preview/html/<id>", async function (request) {
		let id = request.data.id
		let html = await Database.getCode(id);
		if (!html) tApp.render("<h4>We couldn't find your file!</h4>")
		html = html.replace(/"/g, '&quot;')
		tApp.render(`<div><style>header{display: none !important}</style><script></script><iframe id="preview" srcdoc="${html}" style="width: 100vw; height: 100vh; border: none; background: white; position: fixed; z-index: 500; top: 0; left 0; display: block"></iframe></div>`);
	})
	let modulePage = new ModulePage({
		Database: Database
	});

	tApp.route("#/learn/<track>/<module>/<position>", function (request) {
		request.data.module = parseInt(request.data.module);
		request.data.position = parseInt(request.data.position);
		Database.getModuleData(request.data.track, request.data.module, request.data.position).then((res) => {
			let { data, type, moduleLength, next } = res;
			window.tAppRequestInstance = request;
			if (request.data.position >= moduleLength) {
				if (next.hasNext) {
					alert("You have already completed this module! We will now take you to the next module.");
					tApp.redirect(`#/learn/${request.data.track}/${next.module}/${next.position}`);
				} else {
					alert("You have already completed all modules! We will now take you back to the main page.");
					tApp.redirect(`#/`);
				}
			} else if (type == "lesson" || type == "project") {
				if (data.code_template != null) {
					data.code = codeTemplateToCode(data.code_template);
				}
				if (next.hasNext) {
					modulePage.state.next = `#/learn/${request.data.track}/${next.module}/${next.position}`;
				} else {
					modulePage.state.next = `#/`;
				}
				modulePage.state.track = request.data.track;
				modulePage.state.module = request.data.module;
				modulePage.state.position = request.data.position;
				if (data.type == "information") {
					modulePage.setComponent(new Information({}, modulePage), data);
				} else if (data.type == "multiple_choice") {
					let shuffled = shuffleArray([...data.answers]);
					let indexList = [];
					for (let i = 0; i < shuffled.length; i++) {
						indexList.push(data.answers.findIndex(answer => answer === shuffled[i]));
					}
					let answers = [];
					for (let i = 0; i < indexList.length; i++) {
						answers.push(data.answers[indexList[i]]);
					}
					let descriptions = [];
					for (let i = 0; i < indexList.length; i++) {
						descriptions.push(data.descriptions[indexList[i]]);
					}
					data.answers = answers;
					data.descriptions = descriptions;
					if (Array.isArray(data.correct)) {
						let correct = [...data.correct];
						data.correct = [];
						correct.forEach(element => data.correct.push(indexList.findIndex(index => index === element)))
					}else{
						data.correct = indexList.findIndex(index => index === data.correct);
					}
					modulePage.setComponent(new MultipleChoice({}, modulePage), data);
				} else if (data.type == "short_answer") {
					modulePage.setComponent(new ShortAnswer({}, modulePage), data);
				} else if (data.type == "snippet_unlock") {
					modulePage.setComponent(new SnippetUnlock({}, modulePage), data);
				} else if (data.type == "congratulations") {
					modulePage.setComponent(new Congratulations({}, modulePage), data);
				} else if (data.type == "code_editor") {
					modulePage.setComponent(new CodeEditor({}, modulePage), data);
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

	tApp.route("#/404", function (request) {
		tApp.render(`
			<h1>Error 404</h1>
			<p>Page not found.</p>
		`);
	});

	tApp.route("#/403", function (request) {
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