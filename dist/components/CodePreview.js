const codeTemplateToCode=require("../utils/codeTemplateToCode.js"),codeEditorHelper=require("../utils/codeEditor.js"),plugins=(window.codeEditorHelper=codeEditorHelper,require("../utils/plugins.js"));class CodePreview extends tApp.Component{constructor(e,t){super(e,t),null==this.state.runCmdBtn&&(this.state.runCmdBtn="")}update(e){var t=tApp.getComponentFromDOM(document.querySelector("tapp-main").children[0].children[0]).data().storage_id,n=codeEditorHelper.getCurrentEditorIndex();document.getElementById("preview")&&e&&(document.getElementById("preview").src="data:text/html;base64,"+plugins.Base64.encode(e)),document.getElementById("popout").href=`#/preview/html/${t[codeEditorHelper.getCurrentEditorIndex()]}/autoupdate`,document.getElementById("popout").onclick=function(){return window.open(`#/preview/html/${tApp.getComponentFromDOM(document.querySelector("tapp-main").children[0].children[0]).data().storage_id[n]}/autoupdate`,"1",`width=${window.innerWidth},height=${window.innerHeight},toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0`),!1},".js"==(tApp.getComponentFromDOM(document.querySelector("tapp-main").children[0].children[0]).data().files[n]||document.querySelector("tapp-main").children[0].children[0].children[0].children[0].children[0].children[n].innerText).slice(-3)?this.setState("runCmdBtn",`
				<button style="position: absolute; top: -23px; color: black; z-index: 1;" onclick="{{_this}}.showRunConsole()">Run Console</button>
			`):this.setState("runCmdBtn","")}showRunConsole(){let e=document.getElementById("snippets-modal"),i=e.cloneNode(!0),t=(i.removeAttribute("id"),i.classList.remove("none"),i.querySelector("h3").innerHTML="Run Console",i.querySelector(".button-correct").innerHTML="Run",i.querySelector("span").onclick=function(){i.parentNode.removeChild(i)},i.querySelector(".button-correct").onclick=async function(){if(!document.getElementById("python-execution-thread"))return codeEditorHelper.showAlertModal("The Javscript engine must first be running to be able to use the run console",[{text:"Ok",onclick:function(){codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute("data-editor-alert-modal-index"))}}],"codicon-error",5),void i.parentElement.removeChild(i);var t,e=this.parentElement.querySelector(".inputs input").value+"//runid=";let n=document.getElementById("python-execution-thread").contentWindow.document.querySelector("script").innerHTML,o=(n.endsWith(window.previousJSRunId)&&(n=n.substring(0,n.lastIndexOf("\n"))),document.getElementById("python-execution-thread").contentWindow.document.querySelector("script")),r=(window.previousJSRunId=function(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",o=n.length,r=0;r<e;r++)t+=n.charAt(Math.floor(Math.random()*o));return t}(50),n+="\n"+e+window.previousJSRunId,o.parentElement.removeChild(o),document.getElementById("python-execution-thread").contentWindow.document.createElement("script"));r.innerHTML=n,t=100,await new Promise(e=>setTimeout(e,t)),document.getElementById("python-execution-thread").contentWindow.document.body.appendChild(r),i.parentElement.removeChild(i)},document.createElement("input"));t.className="short-answer-input",t.classList.add("insert-snippet-input"),t.placeholder="Enter JS command here",i.querySelector(".inputs").appendChild(t),document.body.appendChild(i)}render(e){let t=document.getElementById("console-bridge");t&&(t.onclick=function(){function o(){try{let e=document.getElementById("python-execution-thread");e.parentElement.removeChild(e),window.consoleLogs.push(["Forced execution thread to quit"]),document.getElementById("console-bridge").click(),window.newLogCallback&&window.newLogCallback(["Forced execution thread to quit"]),document.querySelector(".console-input").disabled=!0,document.querySelector(".console-input").value=""}catch(e){}}if(document.getElementById("preview-container")){if(document.getElementById("preview-container").classList=["preview-mode-console"],!document.getElementById("preview-container").querySelector(".console-wrapper")){let e=document.createElement("pre"),t=(e.classList=["console-wrapper"],document.getElementById("preview-container").appendChild(e),document.createElement("button"));t.classList=["console-stop"],t.innerText="Stop",t.onclick=o,document.getElementById("preview-container").querySelector(".console-wrapper").appendChild(t)}if(!document.getElementById("preview-container").querySelector(".console-input")){let t=document.createElement("input");t.classList.add("console-input"),t.placeholder="Type here. Press enter to send.",t.disabled=!0;var r=t.spellcheck=!1;t.addEventListener("keyup",function(e){13===e.keyCode&&(window.consoleLogs.push(["> "+t.value]),document.getElementById("console-bridge").click(),window.newLogCallback&&window.newLogCallback(["> "+t.value]),document.getElementById("python-execution-thread").contentWindow.document.getElementById("python-sandbox-bridge").click()),17!=e.keyCode&&91!=e.keyCode||(r=!1)}),t.addEventListener("keydown",function(e){(r=17!=e.keyCode&&91!=e.keyCode?r:!0)&&67==e.keyCode&&o()}),t.addEventListener("contextmenu",function(e){return e.preventDefault(),navigator.clipboard.writeText(window.getSelection().toString()),window.getSelection?window.getSelection().removeAllRanges():document.selection&&document.selection.empty(),!1},!1),document.getElementById("preview-container").querySelector(".console-wrapper").appendChild(t)}let e=window.consoleLogs[window.consoleLogs.length-1],t=document.createElement("span");for(var i in t.style="display: block;",e)console.log(e[i]),e[i].__class__?e[i].__package__?e[i]=`<module ${e[i].__name__}>`:e[i]=`<class '${e[i].__name__||e[i].$infos.__name__}'>`:e[i]=""+e[i];t.innerText=e.join("  "),document.getElementById("preview-container").querySelector(".console-wrapper").appendChild(t);let n=document.querySelector(".console-wrapper");n.scrollHeight-n.clientHeight<=n.scrollTop+40&&(n.scrollTop=n.scrollHeight-n.clientHeight),1e3<window.consoleLogs.length&&(window.consoleLogs.shift(),document.querySelector(".console-wrapper").removeChild(document.querySelector(".console-wrapper").firstChild))}},t.onchange=function(){if(document.getElementById("preview-container")&&(document.getElementById("preview-container").classList=[],document.getElementById("preview-container").querySelector(".console-wrapper"))){let e=document.getElementById("preview-container").querySelector(".console-wrapper");e.parentNode.removeChild(e)}}),window.plugins=plugins;var n=tApp.getComponentFromDOM(document.getElementById("code-editor-tab")).state.tabindex;if(tApp.getComponentFromDOM(document.getElementById("code-editor-component")).data().storage_id[n])o=tApp.getComponentFromDOM(document.getElementById("code-editor-component")).data().storage_id[n].split(".").pop().toLowerCase();else{let e=document.querySelector("tapp-main").children[0].children[0].children[0].children[0].children[0].children[n].innerText;var o=e.split(".").pop().toLowerCase()}"html"===o||"md"===o||"jsx"===o||"png"===o||"jpeg"===o||"jpg"===o||"gif"===o||document.getElementById("preview-container")||setTimeout(function(){if(document.getElementById("preview-container").classList=["preview-mode-console"],!document.getElementById("preview-container").querySelector(".console-wrapper")){let e=document.createElement("div");e.className="console-wrapper",document.getElementById("preview-container").appendChild(e)}window.consoleLogs.forEach(e=>{let t=document.createElement("span");for(var n in t.style="display: block;",e)e[n].__class__&&(e[n].__package__?e[n]=`<module ${e[n].__name__}>`:e[n]=`<class ${e[n].__name__}>`);t.innerText=e.join("  "),document.getElementById("preview-container").querySelector(".console-wrapper").appendChild(t)})},200),document.getElementById("preview")&&(document.getElementById("preview").src="data:text/html;base64,"+plugins.Base64.encode(codeEditorHelper.getValue()));let r=this.state.runCmdBtn;return`<div style="margin-top: 10px; height: 95%; background: white; overflow: visible" id="preview-container">
		${r=""===r&&"js"===o?'<button style="position: absolute; top: -23px; color: black; z-index: 1;" onclick="{{_this}}.showRunConsole()">Run Console</button>':r}
    	<a id="popout" target="_blank" onclick="window.open('#/preview/html/${tApp.getComponentFromDOM(document.querySelector("tapp-main").children[0].children[0]).data().storage_id[codeEditorHelper.getCurrentEditorIndex()]}/autoupdate','1','width=${window.innerWidth},height=${window.innerHeight},toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0');return false;" href="#/preview/html/${tApp.getComponentFromDOM(document.querySelector("tapp-main").children[0].children[0]).data().storage_id[codeEditorHelper.getCurrentEditorIndex()]}/autoupdate"><span style="position: absolute; top: -22px; font-size: 0.8em; width: 100%; text-align: right;">Open in new window&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><svg class="pop-out-icon-preview" xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><path d="M328 97.233L211.184 214.05c-7.03 7.029-18.427 7.029-25.456 0-7.03-7.03-7.03-18.427 0-25.456L302.322 72H262v-.03c-8.37-.517-15-7.47-15-15.97 0-8.766 7.05-15.886 15.789-15.999L263 40h82c8.284 0 15 6.716 15 15v82c0 .336-.011.67-.033 1h-.09c-.985 7.893-7.718 14-15.877 14-8.16 0-14.892-6.107-15.876-14H328V97.233zM328.03 228c.517-8.37 7.47-15 15.97-15s15.453 6.63 15.97 15h.03v96c0 19.882-16.118 36-36 36H76c-19.882 0-36-16.118-36-36V76c0-19.882 16.118-36 36-36h95v.03c8.37.517 15 7.47 15 15.97s-6.63 15.453-15 15.97V72H80a8 8 0 00-8 8v240a8 8 0 008 8h240a8 8 0 008-8v-92h.03z" fill="#009BDE" fill-rule="evenodd"/></svg>		</a>
    <iframe style="width: 98%; height: 100%" id="preview" srcdoc="Loading... Press Run to see the output"></iframe>
	</div>`}}module.exports=CodePreview;