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
			for (let i = 0; i < deleteTime * 10; i++) {
				clone.querySelector(".editor-alert-modal-loading-bar").style.width = 10 / deleteTime * i + 1 + "%";
				await new Promise(r => setTimeout(r, 50));
			}
			clone.querySelector(".editor-alert-modal-loading-bar").style.width = "100%";
			await new Promise(r => setTimeout(r, 500));
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
module.exports = { updateLanguage, updateContent, getValue, insertAtCursor, format, getCurrentEditorIndex, setCurrentEditorIndex, showAlertModal, removeAlertModal };