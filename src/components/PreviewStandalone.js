const ModuleComponent = require("./ModuleComponent.js");

const codeTemplateToCode = require("../utils/codeTemplateToCode.js");
const Editor = require("./Editor.js");
const CodePreview = require("./CodePreview.js");
const codeEditorHelper = require("../utils/codeEditor.js");

window.codeEditorHelper = codeEditorHelper;

class CodeEditor extends ModuleComponent {
    constructor(state, parent) {
        super(state, parent);
        if (this.state.editor == null) {
            this.state.editor = new Editor({}, this);
        }
        if (this.state.codePreview == null) {
            this.state.codePreview = new CodePreview({}, this);
        }
    }
    render(props) {
        if (this.data() != null) {
            if (document.getElementById("code-editor-tab")) {
                delete window.monacoAlreadyLoaded
                delete window.addedEditorEventListeners
                tApp.getComponentFromDOM(document.getElementById("code-editor-tab")).parent.setState("rerender", Date.now())
            }
            return `<div id="code-editor-component">
						${this.state.editor}
						<div class="vertical-divider"></div>
						${this.state.codePreview}
                        <style>
                        #preview-container {
                            position: fixed;
                            width: 100%;
                            left: 0;
                            top: 0;
                            height: 100vh;
                            z-index: 100;
                            margin-top: 0 !important;
                        }
                        header {
                            display: none
                        }
                        .vertical-divider {
                            display: none
                        }
                        .project-module-tabs {
                            display: none;
                        }
                        html {
                            background: black;
                        }
                        #preview {
                            width: 100% !important;
                        }
                        </style>
                        <script>
                        autoStartPreview()
                           async function autoStartPreview() {
                               if (!window.monacoAlreadyLoaded) return setTimeout(autoStartPreview, 500);
                               document.querySelectorAll(".tab-group .tab")[${this.data().previewIndex}].click()
                               setTimeout(() => {
                                    console.log("autoStartPreview")
                                    document.getElementById("code-editor-run-btn").click();
                               }, 1000)
                           }
                        </script>
					</div>`;
        }
        return "<div></div>";
    }
}

module.exports = CodeEditor;