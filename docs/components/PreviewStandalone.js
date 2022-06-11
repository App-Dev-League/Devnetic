const ModuleComponent=require("./ModuleComponent.js"),codeTemplateToCode=require("../utils/codeTemplateToCode.js"),Editor=require("./Editor.js"),CodePreview=require("./CodePreview.js"),codeEditorHelper=require("../utils/codeEditor.js");window.codeEditorHelper=codeEditorHelper;class CodeEditor extends ModuleComponent{constructor(e,t){super(e,t),null==this.state.editor&&(this.state.editor=new Editor({},this)),null==this.state.codePreview&&(this.state.codePreview=new CodePreview({},this))}render(e){return null!=this.data()?(document.getElementById("code-editor-tab")&&(delete window.monacoAlreadyLoaded,delete window.addedEditorEventListeners,tApp.getComponentFromDOM(document.getElementById("code-editor-tab")).parent.setState("rerender",Date.now())),`<div id="code-editor-component">
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
                               startApp()
                               async function startApp() {
                                    document.getElementById("code-editor-run-btn").click();
                                    await sleep(200);
                                    if (!window.consoleLogs || window.consoleLogs.length == 0) {
                                        await sleep(200);
                                        startApp();
                                    }
                               }
                           }
                           function sleep (ms){ return new Promise(resolve => setTimeout(resolve, ms))}
                        </script>
					</div>`):"<div></div>"}}module.exports=CodeEditor;