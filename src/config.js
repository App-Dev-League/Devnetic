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
		"PluginPanel.js",
		"PreviewStandalone.js",
	], {
		path: "./components/"
	}, newFileCallback);

	await installAll([
		"codeBlocks.js",
		"codeEditor.js",
		"codeTemplateToCode.js",
		"compileSnippet.js",
		"doesFileExist.js",
		"Database.js",
		"plugins.js",
		"shuffleArray.js",
		"renderElement.js"
	], {
		path: "./utils/"
	}, newFileCallback);
	await install("./assets/libraries/ejs.js")


	const ModulePage = require("./components/ModulePage.js");
	const Information = require("./components/Information.js");
	const MultipleChoice = require("./components/MultipleChoice.js");
	const ShortAnswer = require("./components/ShortAnswer.js");
	const SnippetUnlock = require("./components/SnippetUnlock.js");
	const Congratulations = require("./components/Congratulations.js");
	const CodeEditor = require("./components/CodeEditor.js");
	const Preview = require("./components/PreviewStandalone.js");

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
			backgroundPages: [],
			persistent: true
		}
	}

	window.filesToCache = ["will_be_replaced_in_build"];

	if (window.environment == "development") config.cachingConfig = null;
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
			console.log(err)
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

	let modulePage = new ModulePage({
		Database: Database
	});

	tApp.route("#/preview/<track>/<module>/<position>/<fileIndex>", async function (request) {
		if (request.data.track === "demos") {
			modulePage.state.track = "demos"
			modulePage.state.module = 0;
			modulePage.state.position = 0;
			let filePath = "./data/modules/"+request.data.module + "/" + request.data.position + "/" + request.data.fileIndex
			let fileData = await tApp.get(filePath);
			fileData = await fileData.text();

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
					"storage_id": [
						"temp_demo_cache."+request.data.fileIndex.split(".").at(-1)
					],
					"files": [
						request.data.fileIndex
					],
					"default": [],
					"display_type": "web",
					"elements": [],
					"hints": [],
					"validation": [],
					"points": 0,
					"coins": 0,
					"demo_data": {
						"filename": request.data.fileIndex,
						"fileData": fileData
					}
				}
			}, false, true)
			return tApp.render(modulePage.toString())
		} else {
			request.data.module = parseInt(request.data.module);
			request.data.position = parseInt(request.data.position);
			request.data.fileIndex = parseInt(request.data.fileIndex);
	
			modulePage.state.track = request.data.track;
			modulePage.state.module = request.data.module;
			modulePage.state.position = request.data.position;
		}
		
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
				console.log(err)
				tApp.renderPath("#/404");
			})
		}
		async function showPage(res, isUserProject = false, isDemo = false) {
			let { data, type, moduleLength, next, moduleData } = res;
			window.tAppRequestInstance = request;
			window.currentModuleData = moduleData;
			data.isUserProject = isUserProject;
			data.isDemo = isDemo
			data.previewIndex = request.data.fileIndex;
			if (isDemo) data.previewIndex = 0;
			modulePage.setComponent(new Preview({}, modulePage), data);
		}
		tApp.render(modulePage.toString())
	})

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
				console.log(err)
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
			if (window.isElectron) {
				checkIfNewerElectronVersion();
			} else {
				checkIfNewerVersion();
				tApp.install().then(() => {
					tApp.update();
				});
			}
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
let redirectFunction = tApp.redirect;
tApp.redirect = function (path, title) {
	redirectFunction(path, title);
	onWindowHashChange()
}