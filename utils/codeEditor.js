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
    }
}

module.exports = editorFunctions;