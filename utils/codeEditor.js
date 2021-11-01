const editorFunctions = {
    updateLanguage: function(language) {
        window.monaco.editor.setModelLanguage(window.monaco.editor.getModels()[0], language)
    }
}

module.exports = editorFunctions;