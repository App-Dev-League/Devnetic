const editorFunctions = {
    updateLanguage: function(language) {
        document.getElementById("code-frame").contentWindow.monaco.editor.setModelLanguage(document.getElementById("code-frame").contentWindow.monaco.editor.getModels()[0], language)
        return true;
    },
    updateContent: function(content) {
        document.getElementById("code-frame").contentWindow.codeEditor.setValue(content);
        return true
    },
    getValue: function() {
        return document.getElementById("code-frame").contentWindow.codeEditor.getValue()
    },
    insertAtCursor: function(content) {
        document.getElementById("code-frame").contentWindow.codeEditor.trigger('keyboard', 'type', {text: content});
        return true;
    },
    format: function() {
        document.getElementById("code-frame").contentWindow.codeEditor.getAction('editor.action.formatDocument').run();
        return true;
    }
}

module.exports = editorFunctions;