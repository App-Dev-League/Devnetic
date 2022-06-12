const codeTemplateToCode=require("../utils/codeTemplateToCode.js"),codeEditorHelper=require("../utils/codeEditor.js"),doesFileExist=require("../utils/doesFileExist.js"),plugins=(window.codeEditorHelper=codeEditorHelper,require("../utils/plugins.js")),buttons=`
<a class="codicon codicon-debug-console" title="Run Console" style="cursor: pointer; position: absolute; top: -20px; color: var(--white); z-index: 1;" onclick="{{_this}}.showRunConsole()"></a>
<a class="codicon codicon-library" title="Dependency Manager" style="cursor: pointer; position: absolute; top: -20px; color: var(--white); z-index: 1; left: 32px" onclick="{{_this}}.showDependencyManager()"></a>
`;class CodePreview extends tApp.Component{constructor(e,t){super(e,t),null==this.state.runCmdBtn&&(this.state.runCmdBtn="")}update(e){var t=tApp.getComponentFromDOM(document.querySelector("tapp-main").children[0].children[0]).data().storage_id,n=codeEditorHelper.getCurrentEditorIndex();document.getElementById("preview")&&e&&(document.getElementById("preview").src="data:text/html;base64,"+plugins.Base64.encode(e)),document.getElementById("popout").href=`#/preview/html/${t[codeEditorHelper.getCurrentEditorIndex()]}/autoupdate`,document.getElementById("popout").onclick=function(){return window.open(`#/preview/html/${tApp.getComponentFromDOM(document.querySelector("tapp-main").children[0].children[0]).data().storage_id[n]}/autoupdate`,"1",`width=${window.innerWidth},height=${window.innerHeight},toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0`),!1},".js"==(tApp.getComponentFromDOM(document.querySelector("tapp-main").children[0].children[0]).data().files[n]||document.querySelector("tapp-main").children[0].children[0].children[0].children[0].children[0].children[n].innerText).slice(-3)?this.setState("runCmdBtn",buttons):this.setState("runCmdBtn","")}showRunConsole(){let e=document.getElementById("snippets-modal"),r=e.cloneNode(!0),t=(r.removeAttribute("id"),r.classList.remove("none"),r.querySelector("h3").innerHTML="Run Console",r.querySelector(".button-correct").innerHTML="Run",r.querySelector("span").onclick=function(){r.parentNode.removeChild(r)},r.querySelector(".button-correct").onclick=async function(){if(!document.getElementById("python-execution-thread"))return codeEditorHelper.showAlertModal("The Javscript engine must first be running to be able to use the run console",[{text:"Ok",onclick:function(){codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute("data-editor-alert-modal-index"))}}],"codicon-error",5),void r.parentElement.removeChild(r);var e=this.parentElement.querySelector(".inputs input").value+"//runid=";let t=document.getElementById("python-execution-thread").contentWindow.document.querySelector("script").innerHTML,n=(t.endsWith(window.previousJSRunId)&&(t=t.substring(0,t.lastIndexOf("\n"))),document.getElementById("python-execution-thread").contentWindow.document.querySelector("script")),o=(window.previousJSRunId=function(){for(var e="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=t.length,o=0;o<50;o++)e+=t.charAt(Math.floor(Math.random()*n));return e}(),t+="\n"+e+window.previousJSRunId,n.parentElement.removeChild(n),document.getElementById("python-execution-thread").contentWindow.document.createElement("script"));o.innerHTML=t,await new Promise(e=>setTimeout(e,100)),document.getElementById("python-execution-thread").contentWindow.document.body.appendChild(o),r.parentElement.removeChild(r)},document.createElement("input"));t.className="short-answer-input",t.classList.add("insert-snippet-input"),t.placeholder="Enter JS command here",r.querySelector(".inputs").appendChild(t),document.body.appendChild(r)}showDependencyManager(){let e=document.getElementById("snippets-modal"),o=e.cloneNode(!0),t=(o.removeAttribute("id"),o.classList.remove("none"),o.querySelector("h3").innerHTML="JS Dependency Manager",o.querySelector("h3").style.marginBottom="10px",o.querySelector(".button-correct").innerHTML="Add",Object.entries(window.currentFileMetaData.dependencies||{}).forEach(([e])=>{let t=document.createElement("span"),n=(t.style.display="block",t.style.textAlign="left",t.innerHTML=e,document.createElement("span"));n.style="float: right; font-weight: bold; cursor: pointer; font-size: 0.8em; color: red; margin-right: 10px;",n.innerHTML="X",n.onclick=function(){delete window.currentFileMetaData.dependencies[e],this.parentElement.parentElement.removeChild(this.parentElement),tApp.getComponentFromDOM(document.getElementById("code-editor-tab")).save({dependencies:window.currentFileMetaData.dependencies})},t.appendChild(n),o.querySelector(".inputs").appendChild(t)}),o.querySelector("span").onclick=function(){o.parentNode.removeChild(o)},o.querySelector(".button-correct").onclick=async function(){var e=o.querySelector("input").value;if(!await doesFileExist(e))return alert("File does not exist!");window.currentFileMetaData.dependencies=window.currentFileMetaData.dependencies||{},window.currentFileMetaData.dependencies[e]=!0,tApp.getComponentFromDOM(document.getElementById("code-editor-tab")).save({dependencies:window.currentFileMetaData.dependencies}),o.parentElement.removeChild(o)},document.createElement("input"));t.className="short-answer-input",t.classList.add("insert-snippet-input"),t.placeholder="Enter dependency cdn url here",o.querySelector(".inputs").appendChild(t),document.body.appendChild(o)}popout(){window.open(`#/preview/${tAppRequestInstance.data.track}/${tAppRequestInstance.data.module}/${tAppRequestInstance.data.position}/`+codeEditorHelper.getCurrentEditorIndex(),"1",`width=${window.innerWidth},height=${window.innerHeight},toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0`)}newTab(){window.open(`#/preview/${tAppRequestInstance.data.track}/${tAppRequestInstance.data.module}/${tAppRequestInstance.data.position}/`+codeEditorHelper.getCurrentEditorIndex())}render(e){var t=this;let n=document.getElementById("console-bridge");if(n&&(n.onclick=function(){function o(){try{let e=document.getElementById("python-execution-thread");e.parentElement.removeChild(e),window.consoleLogs.push(["Forced execution thread to quit"]),document.getElementById("console-bridge").click(),window.newLogCallback&&window.newLogCallback(["Forced execution thread to quit"]),document.querySelector(".console-input").disabled=!0,document.querySelector(".console-input").value=""}catch(e){}}if(document.getElementById("preview-container")){if(document.getElementById("preview-container").classList=["preview-mode-console"],!document.getElementById("preview-container").querySelector(".console-wrapper")){let e=document.createElement("pre"),t=(e.classList=["console-wrapper"],document.getElementById("preview-container").appendChild(e),document.createElement("button"));t.classList=["console-stop"],t.innerText="Stop",t.onclick=o,document.getElementById("preview-container").querySelector(".console-wrapper").appendChild(t)}if(!document.getElementById("preview-container").querySelector(".console-input")){let t=document.createElement("input");t.classList.add("console-input"),t.placeholder="Type here. Press enter to send.",t.disabled=!0;var r=t.spellcheck=!1;t.addEventListener("keyup",function(e){13===e.keyCode&&(window.consoleLogs.push(["> "+t.value]),document.getElementById("console-bridge").click(),window.newLogCallback&&window.newLogCallback(["> "+t.value]),document.getElementById("python-execution-thread").contentWindow.document.getElementById("python-sandbox-bridge").click()),17!=e.keyCode&&91!=e.keyCode||(r=!1)}),t.addEventListener("keydown",function(e){(r=17==e.keyCode||91==e.keyCode||r)&&67==e.keyCode&&o()}),t.addEventListener("contextmenu",function(e){return e.preventDefault(),navigator.clipboard.writeText(window.getSelection().toString()),window.getSelection?window.getSelection().removeAllRanges():document.selection&&document.selection.empty(),!1},!1),document.getElementById("preview-container").querySelector(".console-wrapper").appendChild(t)}let e=window.consoleLogs[window.consoleLogs.length-1],t=document.createElement("span");for(var i in t.style="display: block;",e)console.log(e[i]),e[i].__class__?e[i].__package__?e[i]=`<module ${e[i].__name__}>`:e[i]=`<class '${e[i].__name__||e[i].$infos.__name__}'>`:e[i]=""+e[i];t.innerText=e.join("  "),document.getElementById("preview-container").querySelector(".console-wrapper").appendChild(t);let n=document.querySelector(".console-wrapper");n.scrollHeight-n.clientHeight<=n.scrollTop+40&&(n.scrollTop=n.scrollHeight-n.clientHeight),1e3<window.consoleLogs.length&&(window.consoleLogs.shift(),document.querySelector(".console-wrapper").removeChild(document.querySelector(".console-wrapper").firstChild))}},n.onchange=function(){if(document.getElementById("preview-container")&&(document.getElementById("preview-container").classList=[],document.getElementById("preview-container").querySelector(".console-wrapper"))){let e=document.getElementById("preview-container").querySelector(".console-wrapper");e.parentNode.removeChild(e)}}),window.plugins=plugins,!document.getElementById("code-editor-tab"))return setTimeout(function(){t.setState("update",Date.now())},100),"<div></div>";var o=tApp.getComponentFromDOM(document.getElementById("code-editor-tab")).state.tabindex;if(tApp.getComponentFromDOM(document.getElementById("code-editor-component")).data().storage_id[o])r=tApp.getComponentFromDOM(document.getElementById("code-editor-component")).data().storage_id[o].split(".").pop().toLowerCase();else{let e=document.querySelector("tapp-main").children[0].children[0].children[0].children[0].children[0].children[o].innerText;var r=e.split(".").pop().toLowerCase()}"html"===r||"md"===r||"jsx"===r||"png"===r||"jpeg"===r||"jpg"===r||"gif"===r||document.getElementById("preview-container")||setTimeout(function(){if(document.getElementById("preview-container").classList=["preview-mode-console"],!document.getElementById("preview-container").querySelector(".console-wrapper")){let e=document.createElement("div");e.className="console-wrapper",document.getElementById("preview-container").appendChild(e)}window.consoleLogs.forEach(e=>{let t=document.createElement("span");for(var n in t.style="display: block;",e)e[n].__class__&&(e[n].__package__?e[n]=`<module ${e[n].__name__}>`:e[n]=`<class ${e[n].__name__}>`);t.innerText=e.join("  "),document.getElementById("preview-container").querySelector(".console-wrapper").appendChild(t)})},200);let i=this.state.runCmdBtn;return`<div style="margin-top: 10px; height: 95%; background: white; overflow: visible" id="preview-container">
		${i=""===i&&"js"===r?buttons:i}
    	<a id="popout" class="codicon codicon-link-external" target="_blank" onclick="{{_this}}.popout()" title="Preview fullscreen in new window"></a>
    	<a id="popout-newtab" class="codicon codicon-link" target="_blank" onclick="{{_this}}.newTab()" title="Preview in new tab"></a>
    <iframe style="width: 98%; height: 100%" id="preview" srcdoc="Loading... Press Run to see the output"></iframe>
	</div>`}}module.exports=CodePreview;