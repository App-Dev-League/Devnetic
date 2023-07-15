const ModuleComponent=require("./ModuleComponent.js"),codeTemplateToCode=require("../utils/codeTemplateToCode.js"),Editor=require("./Editor.js"),CodePreview=require("./CodePreview.js"),codeEditorHelper=require("../utils/codeEditor.js");window.codeEditorHelper=codeEditorHelper;class CodeEditor extends ModuleComponent{constructor(e,t,o){super(e,t),null==this.state.editor&&(this.state.editor=new Editor({},this)),null==this.state.codePreview&&(this.state.codePreview=new CodePreview({},this)),this.isLive=o}render(e){var i;return document.getElementById("preview-demo-loading-cover").classList.add("none"),null!=this.data()?(i=this,document.getElementById("code-editor-tab")&&(delete window.monacoAlreadyLoaded,delete window.addedEditorEventListeners,tApp.getComponentFromDOM(document.getElementById("code-editor-tab")).parent.setState("rerender",Date.now())),setTimeout(function(){function o(t){return new Promise(e=>setTimeout(e,t))}!async function e(){return window.monacoAlreadyLoaded?(document.querySelectorAll(".tab-group .tab")[i.data().previewIndex].click(),void async function e(){console.log("Starting app");let t=document.querySelectorAll(".tab-group .tab")[i.data().previewIndex].innerText;await o(300),document.getElementById("code-editor-run-btn").click(),await o(200),((!window.consoleLogs||0==window.consoleLogs.length)&&(t.endsWith(".js")||t.endsWith(".ts")||t.endsWith(".py")||t.endsWith(".pl")||t.endsWith(".cpp"))||t.endsWith(".jsx")&&"Loading... Press Run to see the output"===document.getElementById("preview").contentWindow.document.body.innerHTML)&&e()}()):setTimeout(e,500)}()},200),`<div id="code-editor-component">
						${this.state.editor}
						<div class="vertical-divider"></div>
						${this.state.codePreview}
                        <style>
                                        
                            ${this.isLive?`
                            #code-frame {
                                position: fixed;
                                top: 0;
                                left: 0;
                                width: 50vw !important;
                                height: 100vh !important;
                                z-index: 100;
                            }
                            tapp-main {
                                overflow: hidden !important;
                            }
                            .selected-tab>div {
                                transform: none !important;
                            }
                            #code-editor-component > div {
                                transform: none !important;
                            }
                            #preview {
                                background: white;
                                height: 100vh !important;
                                width: 50vw !important;
                            }
                            #preview-container {
                                position: fixed;
                                width: 50%;
                                right: 0;
                                top: 0;
                                height: 100vh;
                                z-index: 100;
                                margin-top: 0 !important;
                            }
                            `:`
                            #preview-container {
                                position: fixed;
                                width: 100%;
                                left: 0;
                                top: 0;
                                height: 100vh;
                                z-index: 100;
                                margin-top: 0 !important;
                            }
                            .project-module-tabs {
                                display: none;
                            }
                            #preview {
                                width: 100% !important;
                            }
                            `}
                        .vertical-divider {
                            display: none
                        }
                        header {
                            display: none
                        }
                        html {
                            background: black;
                        }
                        </style>
					</div>`):"<div></div>"}}module.exports=CodeEditor;