const doesFileExist = require("./doesFileExist.js")

window.currentReadOnly = false;
window.onhashchange = function () {
	window.currentReadOnly = false;
	delete window.unsavedFileCaches;
	delete window.tabSavedData;
}
function updateLanguage(language) {
	if (!document.getElementById("code-frame")) return false
	new Promise((resolve, reject) => {
		m();
		function m() {
			if (document.getElementById("code-frame").contentWindow.monaco) resolve();
			else {
				setTimeout(m, 100);
			}
		}
	}).then(e => {
		document.getElementById("code-frame").contentWindow.monaco.editor.setModelLanguage(document.getElementById("code-frame").contentWindow.monaco.editor.getModels()[0], language)
	})
	return true;
}
function updateReadOnly(readOnly) {
	if (!document.getElementById("code-frame")) return false

	new Promise((resolve, reject) => {
		m();
		function m() {
			if (document.getElementById("code-frame").contentWindow.codeEditor) resolve();
			else {
				setTimeout(m, 100);
			}
		}
	}).then(e => {
		document.getElementById("code-frame").contentWindow.codeEditor.updateOptions({ readOnly: readOnly })
		window.currentReadOnly = readOnly;
	})
	return true;
}
function getCurrentEditorOption(optionNum) {
	if (optionNum === 81) {
		return window.currentReadOnly;
	}
	// option numbers defined here: https://microsoft.github.io/monaco-editor/api/enums/monaco.editor.EditorOption.html#readOnly
	return document.getElementById("code-frame").contentWindow.codeEditor.getOption(optionNum);
}
function updateContent(content) {
	new Promise((resolve, reject) => {
		m();
		function m() {
			if (document.getElementById("code-frame").contentWindow.codeEditor) resolve();
			else {
				setTimeout(m, 100);
			}
		}
	}).then(e => {
		document.getElementById("code-frame").contentWindow.codeEditor.setValue(content);
	})
	return true
}
function getValue() {
	return document.getElementById("code-frame").contentWindow.codeEditor.getValue()
}
function insertAtCursor(content) {
	document.getElementById("code-frame").contentWindow.codeEditor.trigger('keyboard', 'type', { text: content });
	return true;
}
function format() {
	document.getElementById("code-frame").contentWindow.codeEditor.getAction('editor.action.formatDocument').run();
	return true;
}
function getCurrentEditorIndex() {
	return document.getElementById("code-frame").contentWindow.currentEditorIndex;
}
function setCurrentEditorIndex(index) {
	document.getElementById("code-frame").contentWindow.currentEditorIndex = index;
	return true
}

// alert modals
function showAlertModal(message, buttons, icon, deleteTime) {
	let template = document.getElementById("editor-alert-modal-template");
	let clone = template.cloneNode(true);
	let container = document.getElementById("editor-alert-modal-containers");
	let currentIndex = container.children[0].getAttribute("data-editor-alert-modal-index");
	if (!currentIndex) currentIndex = -1;
	let newIndex = Number(currentIndex) + 1;
	clone.setAttribute("data-editor-alert-modal-index", newIndex);
	clone.id = "editor-alert-modal-" + makeid(50);
	clone.style.display = "block";
	clone.style.bottom = "0";
	clone.style.opacity = "0";
	clone.style.zIndex = 10 + newIndex;
	if (icon) clone.querySelector(".codicon.codicon-info").classList = "codicon " + icon;
	setTimeout(function () {
		clone.style.opacity = "1"
		clone.style.bottom = 10 + newIndex * 100 + "px";
	}, 10)
	if (deleteTime && deleteTime !== "indeterminate") {
		setTimeout(async function () {
			clone.querySelector(".editor-alert-modal-loading-bar").style.setProperty('--deletetime', deleteTime + "s");
			clone.querySelector(".editor-alert-modal-loading-bar").classList.add("loading-bar-active");
			await new Promise(r => setTimeout(r, deleteTime * 1000));
			clone.querySelector(".editor-alert-modal-loading-bar").style.width = "100%";
			clone.querySelector(".editor-alert-modal-loading-bar").classList.remove("loading-bar-active");
			if (!document.getElementById(clone.id)) return;
			removeAlertModal(clone.getAttribute("data-editor-alert-modal-index"));
		}, 10)
	} else if (deleteTime === "indeterminate") {
		//clone.querySelector(".editor-alert-modal-loading-bar").classList.add("loading-bar-active");
		clone.querySelector(".editor-alert-modal-loading-bar-wrapper").classList.add("loading-bar-indeterminate");
	}
	clone.querySelector(".text").innerHTML = message;
	buttons.forEach(element => {
		let button = document.createElement("button");
		button.innerHTML = element.text;
		button.onclick = element.onclick;
		button.classList.add("editor-alert-modal-btn")
		if (element.color) button.style.backgroundColor = element.color;
		clone.querySelector(".editor-alert-modal-footer").appendChild(button);
	})
	container.prepend(clone)
	return clone;
}
function removeAlertModal(index) {
	index = Number(index);
	let container = document.getElementById("editor-alert-modal-containers");
	let element = document.querySelector("[data-editor-alert-modal-index='" + index + "']")
	element.querySelector(".editor-alert-modal-loading-bar").classList.remove("loading-bar-active");
	element.style.opacity = "0"
	element.style.bottom = "0";
	setTimeout(function () {
		element.parentElement.removeChild(element)
	}, 300)
	let topIndex = container.children[0].getAttribute("data-editor-alert-modal-index");
	for (let i = index + 1; i < Number(topIndex) + 1; i++) {
		let update = document.querySelector("[data-editor-alert-modal-index='" + i + "']")
		update.setAttribute("data-editor-alert-modal-index", i - 1);
		update.style.bottom = 10 + (i - 1) * 100 + "px";
	}
}

// idb-based custom, user-created file storage
function uploadFile(options) {
	var filename = options.filename;
	var level = options.level;
	var data = options.data;
	var onsuccess = options.onsuccess || function () { };
	var onerror = options.onerror || function () { };
	var fileid = makeid(100);

	if (level === "module") {
		var storeName = window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module;
	} else if (level === "page") {
		var storeName = window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module + "-" + window.tAppRequestInstance.data.position;
	}
	getAllUserFiles().then(files => {
		for (let i in files) {
			let file = files[i];
			if (file.filename === filename) {
				onerror("File already exists");
				return;
			}
		}
		openConnectionWithNewVersion(storeName).then(db => {
			const txn = db.transaction(storeName, 'readwrite');
			const store = txn.objectStore(storeName);
			let query = store.put({ fileid: fileid, code: data, filename: filename });
			query.onsuccess = function (event) {
				onsuccess(event);
			};
			query.onerror = function (event) {
				console.log(event.target.errorCode);
				onerror(event);
			}
			txn.oncomplete = function () {
				db.close();
			};
		})

	})
	return fileid;
}
function getModuleFile(id) {
	return new Promise((resolve, reject) => {
		openConnection().then(db => {
			try {
				const txn = db.transaction(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module, 'readwrite');
				const store = txn.objectStore(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module);
				const index = store.index('fileids');
				let query = index.get(id);
				query.onsuccess = function (event) {
					resolve(event.target.result)
				};
				query.onerror = function (event) {
					console.log(event.target.errorCode);
				}
				txn.oncomplete = function () {
					db.close();
				};
			} catch (err) {
				db.close();
				reject("Object store does not exist yet!")
			}
		})
	})
}
function getPageFile(id) {
	return new Promise((resolve, reject) => {
		openConnection().then(db => {
			try {
				const txn = db.transaction(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module + "-" + window.tAppRequestInstance.data.position, 'readwrite');
				const store = txn.objectStore(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module + "-" + window.tAppRequestInstance.data.position);
				const index = store.index('fileids');
				let query = index.get(id);
				query.onsuccess = function (event) {
					resolve(event.target.result)
				};
				query.onerror = function (event) {
					console.log(event.target.errorCode);
				}
				txn.oncomplete = function () {
					db.close();
				};
			} catch (err) {
				db.close();
				reject("Object store does not exist yet!")
			}
		})
	})
}
function getAllUserFiles() {
	return new Promise(async (resolve, reject) => {
		let files = [];
		let db = await openConnection()

		try {
			await new Promise(async (resolve, reject) => {
				try {
					const txn = db.transaction(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module + "-" + window.tAppRequestInstance.data.position, 'readwrite');

					const store = txn.objectStore(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module + "-" + window.tAppRequestInstance.data.position);
					let query = store.getAll();
					query.onsuccess = function (event) {
						files = files.concat(event.target.result);
						resolve()
					};
					query.onerror = function (event) {
						console.log(event.target.errorCode);
					}
				} catch (e) { reject(); }
			})
		} catch (err) { }
		try {
			await new Promise(async (resolve, reject) => {
				try {
					const txn = db.transaction(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module, 'readwrite');
					const store = txn.objectStore(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module);
					let query = store.getAll();
					query.onsuccess = function (event) {
						files = files.concat(event.target.result);
						resolve()
					};
					query.onerror = function (event) {
						console.log(event.target.errorCode);
					}
				} catch (e) { return reject(); }
			})
		} catch (err) { }
		db.close();
		resolve(files);
	})
}
function deleteFile(id) {
	return new Promise(async (resolve, reject) => {
		let db = await openConnection()

		try {
			await new Promise(async (resolve, reject) => {
				try {
					const txn = db.transaction(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module + "-" + window.tAppRequestInstance.data.position, 'readwrite');

					const store = txn.objectStore(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module + "-" + window.tAppRequestInstance.data.position);
					const index = store.index('fileids');
					let query = index.openKeyCursor(id);
					query.onsuccess = function (event) {
						if (event.target.result) store.delete(event.target.result.primaryKey);
						resolve();
					};
					query.onerror = function (event) {
						console.log(event.target.errorCode);
						reject();
					}
				} catch (e) { reject(e); }
			})
		} catch (err) { }
		try {
			await new Promise(async (resolve, reject) => {
				try {
					const txn = db.transaction(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module, 'readwrite');
					const store = txn.objectStore(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module);
					const index = store.index('fileids');
					let query = index.openKeyCursor(id);
					query.onsuccess = function (event) {
						if (event.target.result) store.delete(event.target.result.primaryKey);
						resolve();
					};
					query.onerror = function (event) {
						console.log(event.target.errorCode);
						reject();
					}
				} catch (e) { return reject(e); }
			})
		} catch (err) {
		}
		db.close();

		resolve();
	})
}
function updateFile(id, data) {
	return new Promise(async (resolve, reject) => {
		let db = await openConnection()
		let succeeded = false;
		try {
			await new Promise(async (resolve, reject) => {
				try {
					let old = await getPageFile(id);
					const txn = db.transaction(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module + "-" + window.tAppRequestInstance.data.position, 'readwrite');

					const store = txn.objectStore(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module + "-" + window.tAppRequestInstance.data.position);
					const index = store.index('fileids');
					let query = index.openKeyCursor(id);
					query.onsuccess = async function (event) {
						if (event.target.result) {
							old.code = data
							store.put(old, event.target.result.primaryKey);
							succeeded = true;
						}
						resolve();
					};
					query.onerror = function (event) {
						console.log(event.target.errorCode);
						reject();
					}
				} catch (e) { reject(e); }
			})
		} catch (err) { }
		if (succeeded === true) {
			db.close();
			return resolve();
		}
		try {
			await new Promise(async (resolve, reject) => {
				try {
					let old = await getModuleFile(id);
					const txn = db.transaction(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module, 'readwrite');

					const store = txn.objectStore(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module);
					const index = store.index('fileids');
					let query = index.openKeyCursor(id);
					query.onsuccess = function (event) {
						if (event.target.result) {
							old.code = data
							store.put(old, event.target.result.primaryKey);
							succeeded = true;
						}
						resolve();
					};
					query.onerror = function (event) {
						console.log(event.target.errorCode);
						reject();
					}
				} catch (e) { reject(e); }
			})
		} catch (err) { }
		db.close();
		if (succeeded === true) {
			return resolve();
		}
		else reject();
	})
}
function renameFile(id, newName) {
	return new Promise(async (resolve, reject) => {
		var erred = false;
		try {
			await getFile(newName);
			erred = "A file with that name already exists! Nothing was changed."
		} catch (err) {
		}
		if (erred) reject(erred);
		let db = await openConnection()
		let succeeded = false;
		try {
			await new Promise(async (resolve, reject) => {
				try {
					let old = await getPageFile(id);
					const txn = db.transaction(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module + "-" + window.tAppRequestInstance.data.position, 'readwrite');

					const store = txn.objectStore(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module + "-" + window.tAppRequestInstance.data.position);
					const index = store.index('fileids');
					let query = index.openKeyCursor(id);
					query.onsuccess = async function (event) {
						if (event.target.result) {
							old.filename = newName
							store.put(old, event.target.result.primaryKey);
							succeeded = true;
						}
						resolve();
					};
					query.onerror = function (event) {
						console.log(event.target.errorCode);
						reject();
					}
				} catch (e) { reject(e); }
			})
		} catch (err) { }
		if (succeeded === true) {
			db.close();
			return resolve();
		}
		try {
			await new Promise(async (resolve, reject) => {
				try {
					let old = await getModuleFile(id);
					const txn = db.transaction(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module, 'readwrite');

					const store = txn.objectStore(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module);
					const index = store.index('fileids');
					let query = index.openKeyCursor(id);
					query.onsuccess = function (event) {
						if (event.target.result) {
							old.filename = newName
							store.put(old, event.target.result.primaryKey);
							succeeded = true;
						}
						resolve();
					};
					query.onerror = function (event) {
						console.log(event.target.errorCode);
						reject();
					}
				} catch (e) { reject(e); }
			})
		} catch (err) { }
		db.close();
		if (succeeded === true) {
			return resolve();
		}
		else reject();
	})
}
function getFile(name) {
	return new Promise(async (resolve, reject) => {
		let file;
		let db = await openConnection()
		if (name.endsWith(" •")) name = name.slice(0, -2);
		try {
			await new Promise(async (resolve, reject) => {
				try {
					const txn = db.transaction(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module + "-" + window.tAppRequestInstance.data.position, 'readwrite');

					const store = txn.objectStore(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module + "-" + window.tAppRequestInstance.data.position);
					let query = store.getAll();
					query.onsuccess = function (event) {
						file = event.target.result.find(x => x.filename === name);
						resolve()
					};
					query.onerror = function (event) {
						console.log(event.target.errorCode);
					}
				} catch (e) { reject(); }
			})
		} catch (err) { }
		if (file) {
			db.close();
			return resolve(file)
		}
		try {
			await new Promise(async (resolve, reject) => {
				try {
					const txn = db.transaction(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module, 'readwrite');
					const store = txn.objectStore(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module);
					let query = store.getAll();
					query.onsuccess = function (event) {
						file = event.target.result.find(x => x.filename === name);
						resolve()
					};
					query.onerror = function (event) {
						console.log(event.target.errorCode);
					}
				} catch (e) { return reject(); }
			})
		} catch (err) { }
		db.close();
		if (file) return resolve(file);
		else reject("Could not find file with that filename!")
	})
}
function getFileWithId(id) {
	return new Promise(async (resolve, reject) => {
		let file;
		let db = await openConnection()

		try {
			await new Promise(async (resolve, reject) => {
				try {
					const txn = db.transaction(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module + "-" + window.tAppRequestInstance.data.position, 'readwrite');

					const store = txn.objectStore(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module + "-" + window.tAppRequestInstance.data.position);
					let query = store.getAll();
					query.onsuccess = function (event) {
						file = event.target.result.find(x => x.fileid === id);
						resolve()
					};
					query.onerror = function (event) {
						console.log(event.target.errorCode);
					}
				} catch (e) { reject(); }
			})
		} catch (err) { }
		if (file) {
			db.close();
			return resolve(file)
		}
		try {
			await new Promise(async (resolve, reject) => {
				try {
					const txn = db.transaction(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module, 'readwrite');
					const store = txn.objectStore(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module);
					let query = store.getAll();
					query.onsuccess = function (event) {
						file = event.target.result.find(x => x.fileid === id);
						resolve()
					};
					query.onerror = function (event) {
						console.log(event.target.errorCode);
					}
				} catch (e) { return reject(); }
			})
		} catch (err) { }
		db.close();
		if (file) return resolve(file);
		else reject("Could not find file with that fileid!")
	})
}
function exportToJson() {
	return new Promise(async (resolve, reject) => {
		let idbDatabase = await openConnection();
		const exportObject = {}
		if (idbDatabase.objectStoreNames.length === 0) {
			resolve(JSON.stringify(exportObject))
		} else {
			const transaction = idbDatabase.transaction(
				idbDatabase.objectStoreNames,
				'readonly'
			)

			transaction.addEventListener('error', reject)

			for (const storeName of idbDatabase.objectStoreNames) {
				const allObjects = []
				transaction
					.objectStore(storeName)
					.openCursor()
					.addEventListener('success', event => {
						const cursor = event.target.result
						if (cursor) {
							// Cursor holds value, put it into store data
							allObjects.push(cursor.value)
							cursor.continue()
						} else {
							// No more values, store is done
							exportObject[storeName] = allObjects

							// Last store was handled
							if (
								idbDatabase.objectStoreNames.length ===
								Object.keys(exportObject).length
							) {
								idbDatabase.close();
								resolve(exportObject)
							}
						}
					})
			}
		}
	})
}
function importFromJson(json) {
	return new Promise(async (resolve, reject) => {
		// deleting database
		let request = indexedDB.deleteDatabase("USERCODE")
		await new Promise((resolve, reject) => {
			request.onsuccess = function (event) {
				resolve()
			}
			request.onerror = function (event) {
				reject()
			}
		})

		// creating database
		var importObject = json;
		if (typeof importObject === "string") importObject = {}
		let storeList = Object.keys(importObject);
		if (storeList.length === 0) {
			storeList = ["tmp"]
			importObject["tmp"] = []
		}
		console.log(importObject, storeList)

		var idbDatabase = await openConnectionWithNewVersion(storeList);
		const transaction = idbDatabase.transaction(
			idbDatabase.objectStoreNames,
			'readwrite'
		)
		transaction.addEventListener('error', reject)




		for (const storeName of idbDatabase.objectStoreNames) {
			if (!importObject[storeName] || importObject[storeName].length === 0) {
				delete importObject[storeName]
				if (Object.keys(importObject).length === 0) {
					// Added all object stores
					idbDatabase.close();
					resolve()
				}
			} else {
				let count = 0
				for (const toAdd of importObject[storeName]) {
					const request = transaction.objectStore(storeName).add(toAdd)
					request.addEventListener('success', () => {
						count++
						if (count === importObject[storeName].length) {
							// Added all objects for this store
							console.log(Object.keys(importObject).length, storeName)
							delete importObject[storeName]
							if (Object.keys(importObject).length === 0) {
								// Added all object stores
								idbDatabase.close();
								resolve()
							}
						}
					})
				}
			}
		}
	})
}

// projects
function newMyProject(name) {
	let myProjects = localStorage.getItem("myProjects");
	if (!myProjects) myProjects = "{}";
	myProjects = JSON.parse(myProjects);
	if (myProjects[name]) return "Project with that name already exists!"
	myProjects[name] = {
		name: name,
		track: "customUserProjects",
		module: Math.floor(Math.random() * 100000000000),
		position: 0,
		starred: false,
		lastAccessed: Date.now()
	}
	localStorage.setItem("myProjects", JSON.stringify(myProjects));
	return true;
}
function deleteMyProject(name) {
	return new Promise(async (resolve, reject) => {
		let myProjects = localStorage.getItem("myProjects");
		if (!myProjects) myProjects = "{}";
		myProjects = JSON.parse(myProjects);
		if (!myProjects[name]) reject("Project with that name does not exist!")
		let myProject = myProjects[name];
		delete myProjects[name];
		localStorage.setItem("myProjects", JSON.stringify(myProjects));

		try {
			let db = await openConnectionWithNewVersion()
			db.deleteObjectStore(myProject.track + "-" + myProject.module + "-" + myProject.position);
			db.close();
		} catch (err) {
			console.log(err)
		}
		resolve(true);
	})
}
function renameMyProject(currentName, newName) {
	let myProjects = localStorage.getItem("myProjects");
	if (!myProjects) myProjects = "{}";
	myProjects = JSON.parse(myProjects);
	if (!myProjects[currentName]) throw ("Project with that name does not exist!")
	if (myProjects[newName]) throw ("Project with that name already exists")
	let myProject = myProjects[currentName];
	myProjects[newName] = myProject;
	myProjects[newName].name = newName;
	delete myProjects[currentName];
	localStorage.setItem("myProjects", JSON.stringify(myProjects));
}
function getMyProjects() {
	let myProjects = localStorage.getItem("myProjects");
	if (!myProjects) myProjects = "{}";
	myProjects = JSON.parse(myProjects);
	return myProjects;
}
function sizeOfMyProject(name) {
	return new Promise(async (resolve, reject) => {
		let myProjects = localStorage.getItem("myProjects");
		if (!myProjects) myProjects = "{}";
		myProjects = JSON.parse(myProjects);
		if (!myProjects[name]) reject("Project with that name does not exist!")
		let myProject = myProjects[name];
		let storeName = myProject.track + "-" + myProject.module + "-" + myProject.position

		let db = await openConnection()
		var tx;
		try {
			tx = db.transaction([storeName], 'readonly');
		} catch (e) {
			resolve(0)
		}
		const store = tx.objectStore(storeName);
		const cursorReq = store.openCursor();
		let count = 0;
		let size = 0;
		cursorReq.onsuccess = function (e) {
			const cursor = cursorReq.result;
			if (cursor) {
				count++;
				size += byteCount(JSON.stringify(cursor.value))
				cursor.continue();
			}
		};
		cursorReq.onerror = function (e) {
			close()
			reject(e);
		};
		tx.oncomplete = function (e) {
			close()
			resolve(size);
		};
		tx.onabort = function (e) {
			close()
			reject(e);
		};
		tx.onerror = function (e) {
			close()
			reject(e);
		};
		function close() {
			db.close();
		}
	});
};
function lastAccessedUserProject(projectId) {
	projectId = Number(projectId);
	let myProjects = localStorage.getItem("myProjects");
	if (!myProjects) myProjects = "{}";
	myProjects = JSON.parse(myProjects);
	Object.entries(myProjects).forEach(([key, value]) => {
		if (value.module === projectId) {
			myProjects[key].lastAccessed = Date.now()
		}
	})
	localStorage.setItem('myProjects', JSON.stringify(myProjects));
	return true;
}
function getProjectFileBreakdown(name) {
	return new Promise(async (resolve, reject) => {
		let myProjects = localStorage.getItem("myProjects");
		if (!myProjects) myProjects = "{}";
		myProjects = JSON.parse(myProjects);
		if (!myProjects[name]) reject("Project with that name does not exist!")
		let myProject = myProjects[name];
		let storeName = myProject.track + "-" + myProject.module + "-" + myProject.position

		let db = await openConnection()
		var tx;
		try {
			tx = db.transaction([storeName], 'readonly');
		} catch (e) {
			resolve(0)
		}
		const store = tx.objectStore(storeName);
		const cursorReq = store.openCursor();
		let fileTypes = {}
		cursorReq.onsuccess = function (e) {
			const cursor = cursorReq.result;
			if (cursor) {
				fileTypes[cursor.value.filename.split(".")[cursor.value.filename.split(".").length-1]] = true;
				cursor.continue();
			}
		};
		cursorReq.onerror = function (e) {
			close()
			reject(e);
		};
		tx.oncomplete = function (e) {
			close()
			resolve(Object.keys(fileTypes));
		};
		tx.onabort = function (e) {
			close()
			reject(e);
		};
		tx.onerror = function (e) {
			close()
			reject(e);
		};
		function close() {
			db.close();
		}
	});
}

// metadata processing
function getMetaDataFromText(text) {
	let data = {};
	if (!text.startsWith("______DEVNETIC_PROJECT_META_DATA______")) return data;
	text = text.slice(38);
	let endMetaData = text.indexOf("______DEVNETIC_PROJECT_META_DATA_END______");
	text = text.slice(0, endMetaData);
	try {
		data = JSON.parse(text);
		return data;
	} catch (e) { return {}; }
}
function embedMetaDataIntoText(data) {
	data = JSON.stringify(data);
	return "______DEVNETIC_PROJECT_META_DATA______" + data + "______DEVNETIC_PROJECT_META_DATA_END______";
}
function getTextWithoutMetaData(text) {
	if (!text.startsWith("______DEVNETIC_PROJECT_META_DATA______")) return text;
	let endMetaData = text.indexOf("______DEVNETIC_PROJECT_META_DATA_END______");
	text = text.slice(endMetaData + "______DEVNETIC_PROJECT_META_DATA_END______".length);
	return text;
}
function showDependencyManager(filetype) {
	let template = document.getElementById("snippets-modal")
	let modal = template.cloneNode(true);
	modal.removeAttribute("id")
	modal.classList.remove("none")
	if (filetype === "js") {
		modal.querySelector("h3").innerHTML = "Javascript Dependency Manager";
	} else {
		modal.querySelector("h3").innerHTML = "Python Dependency Manager";
	}
	modal.querySelector("h3").style.marginBottom = "10px"
	modal.querySelector(".button-correct").innerHTML = "Add";


	Object.entries(window.currentFileMetaData.dependencies || {}).forEach(([key, value]) => {
		let dependency = document.createElement("span");
		dependency.style.display = "block"
		dependency.style.textAlign = "center"
		dependency.innerHTML = key;
		let deleteBtn = document.createElement("span");
		deleteBtn.style = "float: right; font-weight: bold; cursor: pointer; font-size: 0.8em; color: red; margin-right: 10px;"
		deleteBtn.innerHTML = "X"
		deleteBtn.onclick = function () {
			delete window.currentFileMetaData.dependencies[key];
			this.parentElement.parentElement.removeChild(this.parentElement);
			tApp.getComponentFromDOM(document.getElementById("code-editor-tab")).save({
				dependencies: window.currentFileMetaData.dependencies
			})
		}
		dependency.appendChild(deleteBtn)
		modal.querySelector(".inputs").appendChild(dependency)
	})


	modal.querySelector("span").onclick = function () {
		modal.parentNode.removeChild(modal)
	}
	modal.querySelector(".button-correct").onclick = async function () {
		let value = modal.querySelector("input").value;
		if (!(await doesFileExist(value)) && filetype === "js") return alert("File does not exist!")
		window.currentFileMetaData.dependencies = window.currentFileMetaData.dependencies || {};
		window.currentFileMetaData.dependencies[value] = true;
		tApp.getComponentFromDOM(document.getElementById("code-editor-tab")).save({
			dependencies: window.currentFileMetaData.dependencies
		})
		modal.parentElement.removeChild(modal)
	}
	let elm = document.createElement("input");
	elm.className = "short-answer-input";
	elm.classList.add("insert-snippet-input")
	elm.placeholder = "Enter dependency cdn url here";
	modal.querySelector(".inputs").appendChild(elm);

	document.body.appendChild(modal);
	modal.querySelector("input").focus()
}


// internal functions
function makeid(length) {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() *
			charactersLength));
	}
	return result;
}
function getCurrentIDBVersion() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open('USERCODE');
		request.onsuccess = (event) => {
			let db = event.target.result;
			let version = db.version;
			db.close();
			resolve(version);
		};
	})
}
function openConnectionWithNewVersion(storeName) {
	return new Promise(async (resolve, reject) => {
		let newVersion = await getCurrentIDBVersion() + 1;
		const request = indexedDB.open('USERCODE', newVersion);
		request.onsuccess = (event) => {
			let db = event.target.result;
			if (!storeName) resolve(db)
		};
		request.onupgradeneeded = (event) => {
			let db = event.target.result;
			if (typeof storeName === "string") {
				try {
					let store = db.createObjectStore(storeName, {
						autoIncrement: true
					});
					store.createIndex('fileids', 'fileid', {
						unique: true
					});
					var transaction = event.target.transaction;

					transaction.oncomplete =
						function (event) {
							resolve(db)
						}
				} catch (err) {
					var transaction = event.target.transaction;

					transaction.oncomplete =
						function (event) {
							resolve(db)
						}
				}
			} else if (typeof storeName === "object") {
				storeName.forEach(name => {
					let store = db.createObjectStore(name, {
						autoIncrement: true
					});
					store.createIndex('fileids', 'fileid', {
						unique: true
					});
				})
				var transaction = event.target.transaction;

				transaction.oncomplete = function (event) {
					resolve(db)
				}
			} else {
				resolve(db)
			}
		};
		request.onerror = (event) => {
			console.log(event)
		}
	})
}
function openConnection() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open('USERCODE');
		request.onsuccess = (event) => {
			let db = event.target.result;
			resolve(db)
		};
		request.onupgradeneeded = (event) => {
			let db = event.target.result;
		};
	})
}
function byteCount(s) {
	return encodeURI(s).split(/%..|./).length - 1;
}
module.exports = {
	updateLanguage, updateContent, getValue, insertAtCursor, format, getCurrentEditorIndex, setCurrentEditorIndex, showAlertModal, removeAlertModal, uploadFile, getModuleFile, getPageFile, getAllUserFiles, deleteFile, updateFile, getFile, renameFile, getFileWithId, updateReadOnly, getCurrentEditorOption, newMyProject, deleteMyProject, getMyProjects, getMetaDataFromText, embedMetaDataIntoText, getTextWithoutMetaData, sizeOfMyProject, exportToJson, importFromJson, showDependencyManager, renameMyProject, lastAccessedUserProject,getProjectFileBreakdown,
	internals: {
		openConnectionWithNewVersion
	}
};