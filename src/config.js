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
		"codeBlocks.js",
		"codeEditor.js",
		"codeTemplateToCode.js",
		"compileSnippet.js",
		"doesFileExist.js",
		"Database.js",
		"plugins.js",
		"shuffleArray.js"
	], {
		path: "./utils/"
	});
	await install("./assets/libraries/ejs.js")


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
	require("./assets/libraries/ejs.js");

	var config = {
		target: document.querySelector("tapp-main"),
		ignoreRoutes: [],
		forbiddenRoutes: [],
		errorPages: {
			notFound: "#/404",
			forbidden: "#/403"
		},
		caching: {
			backgroundPages: [
				"/tApp.js",
				"/require-browser.js",
				"/",
				"/config.js",
				"/index.html",
				"/manifest.json",

				...([
					"ai", "index", "intro-to-cs", "menu",
					"my-projects", "webdev-projects", "webdev"
				].map(file => `/views/${file}.html`)),

				...([
					"codeBlocks", "codeEditor", "codeTemplateToCode",
					"compileSnippet", "Database", "doesFileExist",
					"plugins", "shuffleArray"
				].map(file => `/utils/${file}.js`)),

				"/assets/fonts/codicon.ttf",

				...([
					"Black.ttf", "BlackItalic.ttf", "Bold.woff2", "BoldItalic.ttf",
					"ExtraBold.woff2", "ExtraBoldItalic.ttf", "ExtraLight.ttf",
					"ExtraLightItalic.ttf", "Italic.ttf", "Light.ttf", "LightItalic.ttf",
					"Regular.woff2", "SemiBold.woff2", "SemiBoldItalic.ttf"
				].map(file => `/assets/fonts/Nunito/Nunito-${file}`)),

				"/assets/fonts/Nunito/OFL.txt",

				...([
					"codeBlock", "CodeEditor", "CodePreview", "Congratulations",
					"Editor", "ExplanationModal", "Information", "Input", 
					"Instructions", "ModuleComponent", "ModulePage", "MultipleChoice",
					"MultipleChoiceOption", "PluginPanel", "ShortAnswer", "SnippetUnlock",
					"SnippetsPanel", "TabbedView"
				].map(file => `/components/${file}.js`)),

				"/assets/html/code-editor.html",

				"/assets/libraries/highlightjs/atom-one-dark.css",
				"/assets/libraries/highlightjs/highlight.min.js",
				"/assets/libraries/monaco-editor/vs/loader.js",

				...([
					"ejs", "jquery.min"
				].map(file => `/assets/libraries/${file}.js`)),

				// ...([
				// 	"betterEditor/betterEditor.min.js", "betterEditor/betterEditor.png",
				// 	"betterEditor/VERSION.txt", "brython/brython.min.js",
				// 	"brython/brython.svg", "brython/VERSION.txt", "captCC/captCC.min.js",
				// 	"captCC/captCC.svg", "captCC/VERSION.txt", "hexy/hexy.min.js",
				// 	"hexy/logo.png", "hexy/VERSION.txt", "jscpp/jscpp.min.js",
				// 	"jscpp/jscpp.svg", "jscpp/VERSION.txt", "react/react.min.js",
				// 	"react/react.svg", "react/VERSION.txt", "showdown/showdown.min.js",
				// 	"showdown/markdown-logo.png", "showdown/VERSION.txt",
				// 	"typescript/typescript.min.js", "typescript/typescript.svg",
				// 	"typescript/VERSION.txt", "webperl/webperl.min.js",
				// 	"webperl/webperl.png", "webperl/VERSION.txt"
				// ].map(file => `/assets/plugins/${file}`)),

				...([
					"icon", "screenshot"
				].map(file => `/assets/img/${file}.png`)),
				
				...([
					"0", "1", "2", "3", "4", "5", "6", "7"
				].map(file => `/data/modules/ai/${file}.json`)),

				...([
					"0", "1", "2", "3", "4", "5", "6", "7"
				].map(file => `/data/modules/webdev/${file}.json`)),

				...([
					"0", "1", "2", "3", "4", "5", "6", "7"
				].map(file => `/data/modules/webdev-projects/${file}.json`)),

				...([
					"0", "1"
				].map(file => `/data/modules/intro-to-cs/${file}.json`)),

				...([
					"img0/0-0.png", "img0/1-0.png", "img0/2-0.png",
					"img0/2-1.png", "img0/2-2.png", "img0/2-3.png",
					"img0/4-0.png", "img0/4-1.png", "img0/4-2.png",
					"img0/4-3.png", "img0/8-0.png", "img0/8-1.png",
					"img0/8-2.png", "img0/8-3.png", "img1/0-0.png",
					"img1/3-0.png", "img1/5-0.png", "img1/5-1.png",
					"img1/5-2.png", "img1/6-0.png", "img1/7-0.png",
					"img1/8-0.png", "img3/2-0.png", "img4/1-0.png",
					"/img5/0-0.png", "/img5/1-0.png", "/img5/1-1.png",
					"/img5/2-0.png", "/img5/2-1.png", "/img5/4-0.png",
					"/img5/4-1.png", "/img5/5-0.png", "/img5/5-1.png",
					"/img5/5-2.png", "/img5/6-0.png", "/img5/6-1.png",
					"/img5/7-0.png", "/img5/7-1.gif", "/img6/0-0.png",
					"/img6/0-1.png", "/img6/0-2.png", "/img6/1-0.png",
					"/img6/2-0.png", "/img6/2-1.png", "/img6/3-0.png",
					"/img6/3-1.png", "/img6/3-2.png", "/img6/4-0.png",
					"/img6/5-0.png", "/img7/0-0.png", "/img7/1-0.png",
					"/img7/2-0.png", "/img7/3-0.png", "/img7/4-0.png",
					"/img7/5-0.png"
				].map(file => `/data/modules/webdev-assets/${file}`)),

				...([
					"img0/0-0.png", "img0/1-0.png", "img1/0-1.png",
					"img1/1-1.png", "img2/0-2.png", "img2/1-2.png",
					"img2/2-2.png", "img2/3-2.png", "img2/4-2.png",
					"img2/5-2.png", "img3/0-3.png", "img4/0-0.png",
					"img4/0-1.png", "img4/1-0.png", "img4/1-1.png",
					"img4/2-0.png", "img4/2-1.png", "img4/2-2.png",
					"img4/3-0.png", "img4/3-1.png", "img4/3-2.png",
 					"img5/0-0.png", "img5/0-1.png", "img5/0-2.png",
					"img5/0-3.png", "img5/0-4.png", "img5/1-0.png",
					"img5/1-1.png", "img5/1-2.png", "img5/1-3.png",
					"img5/1-4.png", "img5/1-5.png", "img5/2-0.gif",
					"img5/2-1.png", "img5/2-2.png", "img5/2-3.png",
					"img5/3-0.png", "img5/3-1.png", "img5/3-2.png",
					"img5/3-3.png", "img5/3-4.png", "img5/3-5.png",
					"img6/0-0.png", "img6/1-0.png", "img6/2-0.png",
					"img6/3-0.png", "img6/4-0.png", "img6/4-1.png",
					"img6/5-0.png", "img6/5-1.png", "img6/6-0.png",
					"img7/0-0.png", "img7/0-1.png", "img7/0-2.png",
					"img7/0-3.png", "img7/1-0.png", "img7/1-1.png",
					"img7/1-2.png", "img7/1-3.png", "img7/1-4.png",
					"img7/1-5.png", "img7/2-0.png", "img7/3-0.png",
					"img7/3-1.png", "img7/3-2.png", "img7/3-3.png",
					"img7/4-0.png", "img7/4-1.png", "img7/4-2.png",
					"img7/4-3.png", "img7/4-4.png", "img7/4-5.png",
					"img7/4-6.png", "img7/4-7.png"
				].map(file => `/data/modules/ai-assets/${file}`)),

				...([
					"img0/0-0.png"
				].map(file => `/data/modules/intro-to-cs-assets/${file}`)),
			],
			periodicUpdate: 60 * 60 * 1000,
			persistent: true
		}
	}

	if (window.environment == "development") config.caching = null;
	tApp.configure(config);

	tApp.route("/", function (request) {
		tApp.redirect("#/");
	});

	tApp.route("#/", function (request) {
		tApp.get("./views/index.html").then(res => res.text()).then(async html => {
			let templated = await recurseEjs(html);
			tApp.render(templated);
		})
	});
	tApp.route("#/track/<track>", function (request) {
		tApp.get(`./views/${request.data.track}.html`).then(res => res.text()).then(async html => {
			let templated = await recurseEjs(html);
			tApp.render(templated);
		}).catch((err) => {
			tApp.renderPath("#/404");
		});
	});
	tApp.route("#/my-projects", function(request) {
		tApp.get("./views/my-projects.html").then(res => res.text()).then(async html => {
			let templated = await recurseEjs(html, {myProjectsPage: true});
			tApp.render(templated);
		})
	})
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
		if (request.data.track === "customUserProjects") {
			showPage({
				type: "project",
				moduleLength: 1,
				next: {
					hasNext: true,
					module: request.data.module,
					position: 1
				},
				data: {
					"type": "code_editor",
					"storage_id": [],
					"files": [],
					"default": [],
					"display_type": "web",
					"elements": [],
					"hints": [],
					"validation": [],
					"points": 0,
					"coins": 0
				}
			}, true)
		} else {
			Database.getModuleData(request.data.track, request.data.module, request.data.position).then(async (res) => {
				showPage(res)
			}).catch((err) => {
				tApp.renderPath("#/404");
			})
		}
		async function showPage(res, isUserProject = false) {
			let { data, type, moduleLength, next, moduleData } = res;
			document.getElementById("module-progress-bar").style.width = request.data.position / moduleLength * 100 + "%";
			window.tAppRequestInstance = request;
			window.currentModuleData = moduleData;
			let currentTraverse = 0;
			document.querySelectorAll(".module-progress-bar-timeline-element").forEach((el) => {
				if (!el.classList.contains("template")) el.parentElement.removeChild(el)
			})
			if (!isUserProject) {
				window.currentModuleData.pages.forEach(element => {
					let parent = document.getElementById("module-progress-bar-wrapper");
					let template = parent.querySelector(".template");
					let newElement = template.cloneNode(true);
					newElement.classList.remove("template");
					newElement.style.left = (currentTraverse / window.currentModuleData.pages.length * 100) + "%";
					if (request.data.position > currentTraverse) newElement.classList.add("filled");
					else newElement.classList.remove("filled");
	
					if (element.type === "information") {
						newElement.querySelector(".name").innerText = element.title || "";
						newElement.querySelector(".descriptor").innerHTML = "<b>Type: </b>Learn"
					}
					if (element.type === "multiple_choice") {
						newElement.querySelector(".name").innerText = element.question.slice(0, 10) + "..." || "";
						newElement.querySelector(".descriptor").innerHTML = "<b>Type: </b>Question"
					}
					if (element.type === "snippet_unlock") {
						newElement.querySelector(".name").innerText = element.name.slice(0, 10) + "..." || "";
						newElement.querySelector(".descriptor").innerHTML = "<b>Type: </b>Snippet"
					}
					if (element.type === "short_answer") {
						newElement.querySelector(".name").innerText = element.question.slice(0, 10) + "..." || "";
						newElement.querySelector(".descriptor").innerHTML = "<b>Type: </b>Question"
					}
					if (element.type === "congratulations") {
						newElement.querySelector(".name").innerText = "Lesson summary"
						newElement.querySelector(".descriptor").innerHTML = "<b>Type: </b>Summary"
					}
					if (element.type === "code_editor") {
						newElement.querySelector(".name").innerText = element.elements[0].content.replaceAll("[[h3]]", "").replaceAll("[[/]]", "")
						newElement.querySelector(".descriptor").innerHTML = "<b>Type: </b>Project"
					}
					currentTraverse++;
					parent.appendChild(newElement);
				})
			}

			if (request.data.position >= moduleLength) {
				let redoLesson = await confirmRedoLesson()
				if (redoLesson === true) {
					return tApp.redirect(`#/learn/${request.data.track}/${request.data.module}/0`);
				} else if (redoLesson === "stay") {
					return tApp.redirect(`#/track/${request.data.track}`);
				} 
				if (next.hasNext) {
					tApp.redirect(`#/learn/${request.data.track}/${next.module}/${next.position}`);
				} else {
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
					} else {
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
					data.isUserProject = isUserProject;
					modulePage.setComponent(new CodeEditor({}, modulePage), data);
				}
				tApp.render(modulePage.toString());
			} else {
				tApp.renderPath("#/404");
				console.error("Unknown type " + type);
			}
		}
	});
	tApp.route("#/DEV-SHOW-ALL", async function (request) {
		var totalPage = ""
		var data = {}
		var actions = {
			"Webdev Lessons": "webdev",
			"Webdev Projects": "webdev-projects",
			"AI Lessons": "ai"
		}


		var menuData = {}
		for (let p = 0; p < Object.entries(actions).length; p++) {
			var key = Object.entries(actions)[p][0]
			var value = Object.entries(actions)[p][1]
			data[value] = []
			var totalPages = 0;
			var userPages = 0;
			let count = await DB.getModuleCount(value);
			var modules = []
			for (let i = 0; i < count; i++) {
				let module = await DB.getModuleData(value, i, 0);
				let modulePosition = await DB.getModulePosition(value, i);

				data[value].push(modulePosition)

				module.currentUserPosition = modulePosition;
				modules.push(module);
				let length = module.moduleLength;
				totalPages += length;
			}
			if (!data[value]) {
				menuData[value] = {
					totalPages: totalPages,
					userPages: 0,
					data: modules
				}
			} else {
				data[value].forEach(element => {
					if (element !== null) userPages += element
				})
				menuData[value] = {
					totalPages: totalPages,
					userPages: userPages,
					data: modules
				}
			}
		}


		var promises = []

		Object.entries(menuData).forEach(([key, value]) => {
			value.data.forEach((lesson, index) => {
				for (let i = 0; i < lesson.moduleLength - 1; i++) {
					promises.push(
						new Promise((resolve, reject) => {
							Database.getModuleData(key, index, i).then((res) => {
								try {
									let { data, type, moduleLength, next, moduleData } = res;
									window.tAppRequestInstance = request;
									if (type == "lesson" || type == "project") {
										if (data.code_template != null) {
											data.code = codeTemplateToCode(data.code_template);
										}


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
											} else {
												data.correct = indexList.findIndex(index => index === data.correct);
											}
											modulePage.setComponent(new MultipleChoice({}, modulePage), data);
										} else if (data.type == "short_answer") {
											modulePage.setComponent(new ShortAnswer({}, modulePage), data);
										} else if (data.type == "snippet_unlock") {
											modulePage.setComponent(new SnippetUnlock({}, modulePage), data);
										} else if (data.type == "congratulations") {
											modulePage.setComponent(new Congratulations({}, modulePage), data);
										}
										if (modulePage) totalPage += modulePage.toString();
										resolve()
									}
								} catch (err) {
									resolve()
								}
							})
						})
					)
				}
			})
		})

		await Promise.all(promises)
		await new Promise((resolve, reject) => { setTimeout(() => { resolve() }, 500) })
		console.log("Done")
		tApp.render(totalPage);

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
		if (window.environment !== "development") {
			tApp.install().then(() => {
				tApp.update();
			});
		}
	});
})();
function recurseEjs(html, parameters={}) {
	return new Promise(async (resolve, reject) => {
		parameters.include = async function (path) {
			let res = await tApp.get(path);
			let results = await recurseEjs(await res.text(), parameters)
			return results;
		}
		let rtemplated = await ejs.render(html, parameters, { async: true });
		resolve(rtemplated)
	})
}
function confirmRedoLesson() {
	return new Promise((resolve, reject) => {
		let template = document.getElementById("snippets-modal")
		let modal = template.cloneNode(true);
		modal.removeAttribute("id")
		modal.classList.remove("none")
		modal.querySelector("h3").innerHTML = "You have already completed this module!";
		modal.querySelector("h3").style.fontSize = "1.5em"
		modal.querySelector(".button-correct").innerHTML = "Redo Module";
		let continueButton = modal.querySelector(".button-correct").cloneNode()
		continueButton.innerHTML = "Next Module"
		continueButton.style.marginLeft = "10px"
		continueButton.style.backgroundColor = "var(--blue-selected)"
		modal.querySelector(".button-correct").parentNode.appendChild(continueButton)
		modal.querySelector("span").onclick = function () {
			resolve("stay")
			modal.parentNode.removeChild(modal)
		}
		modal.querySelector(".button-correct").onclick = async function () {
			modal.parentElement.removeChild(modal)
			resolve(true)
		}
		continueButton.onclick = function (){
			modal.parentElement.removeChild(modal)
			resolve(false)
		}
		document.body.appendChild(modal);
	})
}