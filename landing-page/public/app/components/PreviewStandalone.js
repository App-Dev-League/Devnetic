const ModuleComponent=require("./ModuleComponent.js"),codeTemplateToCode=require("../utils/codeTemplateToCode.js"),Editor=require("./Editor.js"),CodePreview=require("./CodePreview.js"),codeEditorHelper=require("../utils/codeEditor.js");window.codeEditorHelper=codeEditorHelper;class CodeEditor extends ModuleComponent{constructor(e,t){super(e,t),null==this.state.editor&&(this.state.editor=new Editor({},this)),null==this.state.codePreview&&(this.state.codePreview=new CodePreview({},this))}render(e){var d;return null!=this.data()?(d=this,document.getElementById("code-editor-tab")&&(delete window.monacoAlreadyLoaded,delete window.addedEditorEventListeners,tApp.getComponentFromDOM(document.getElementById("code-editor-tab")).parent.setState("rerender",Date.now())),setTimeout(function(){function o(t){return new Promise(e=>setTimeout(e,t))}!async function e(){return window.monacoAlreadyLoaded?(document.querySelectorAll(".tab-group .tab")[d.data().previewIndex].click(),void async function e(){console.log("Starting app");let t=document.querySelectorAll(".tab-group .tab")[d.data().previewIndex].innerText;await o(300),document.getElementById("code-editor-run-btn").click(),await o(200),((!window.consoleLogs||0==window.consoleLogs.length)&&(t.endsWith(".js")||t.endsWith(".ts")||t.endsWith(".py")||t.endsWith(".pl")||t.endsWith(".cpp"))||t.endsWith(".jsx")&&"Loading... Press Run to see the output"===document.getElementById("preview").contentWindow.document.body.innerHTML)&&e()}()):setTimeout(e,500)}()},200),`<div id="code-editor-component">
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
					</div>`):"<div></div>"}}module.exports=CodeEditor;