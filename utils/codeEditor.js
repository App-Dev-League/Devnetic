function updateLanguage(language) {
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
	document.getElementById("code-frame").contentWindow.codeEditor.trigger('keyboard', 'type', {text: content});
	return true;
}

function format() {
	document.getElementById("code-frame").contentWindow.codeEditor.getAction('editor.action.formatDocument').run();
	return true;
}

module.exports = { updateLanguage, updateContent, getValue, insertAtCursor, format };