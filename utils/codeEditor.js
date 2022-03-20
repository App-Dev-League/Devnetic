function updateLanguage(language) {
	if (!document.getElementById("code-frame")) return false
	document.getElementById("code-frame").contentWindow.monaco.editor.setModelLanguage(document.getElementById("code-frame").contentWindow.monaco.editor.getModels()[0], language)
	return true;
}

function updateContent(content) {
	document.getElementById("code-frame").contentWindow.codeEditor.setValue(content);
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
	if (deleteTime) {
		setTimeout(async function () {
			clone.querySelector(".editor-alert-modal-loading-bar").style.setProperty('--deletetime', deleteTime + "s");
			clone.querySelector(".editor-alert-modal-loading-bar").classList.add("loading-bar-active");
			await new Promise(r => setTimeout(r, deleteTime * 1000));
			clone.querySelector(".editor-alert-modal-loading-bar").style.width = "100%";
			clone.querySelector(".editor-alert-modal-loading-bar").classList.remove("loading-bar-active");
			if (!document.getElementById(clone.id)) return;
			removeAlertModal(clone.getAttribute("data-editor-alert-modal-index"));
		}, 10)
	}
	clone.querySelector(".text").innerHTML = message;
	buttons.forEach(element => {
		let button = document.createElement("button");
		button.innerHTML = element.text;
		button.onclick = element.onclick;
		button.classList.add("editor-alert-modal-btn")
		clone.querySelector(".editor-alert-modal-footer").appendChild(button);
	})
	container.prepend(clone)
	return true;
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
function uploadFile(options) {
	var filename = options.filename;
	var level = options.level;
	var data = options.data;
	var onsuccess = options.onsuccess || function () { };
	var onerror = options.onerror || function () { };
	var fileid = makeid(100);

	if (level === "lesson") {
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
function getLessonFile(id) {
	return new Promise((resolve, reject) => {
		openConnection().then(db => {
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
		})
	})
}
function getPageFile(id) {
	return new Promise((resolve, reject) => {
		openConnection().then(db => {
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
		} catch (err) {	 }
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
						if (event.target.result){
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
		} catch (err) {	 }
		if (succeeded === true) {
			db.close();
			return resolve();
		}
		try {
			await new Promise(async (resolve, reject) => {
				try {
					let old = await getLessonFile(id);
					const txn = db.transaction(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module, 'readwrite');

					const store = txn.objectStore(window.tAppRequestInstance.data.track + "-" + window.tAppRequestInstance.data.module);
					const index = store.index('fileids');
					let query = index.openKeyCursor(id);
					query.onsuccess = function (event) {
						if (event.target.result){
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
		} catch (err) {	 }
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
			if (storeName) {
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
			}
		};
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
module.exports = { updateLanguage, updateContent, getValue, insertAtCursor, format, getCurrentEditorIndex, setCurrentEditorIndex, showAlertModal, removeAlertModal, uploadFile, getLessonFile, getPageFile, getAllUserFiles, deleteFile, updateFile, getFile};