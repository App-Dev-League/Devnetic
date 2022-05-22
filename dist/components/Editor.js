const codeTemplateToCode=require("../utils/codeTemplateToCode.js"),codeEditorHelper=require("../utils/codeEditor.js"),DB=require("../utils/Database.js"),TabbedView=require("./TabbedView.js"),plugins=require("../utils/plugins.js");function makeid(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",o=n.length,i=0;i<e;i++)t+=n.charAt(Math.floor(Math.random()*o));return t}class Editor extends tApp.Component{constructor(e,t){super(e,t)}render(e){var c=this;let t={html:"html",py:"python",md:"markdown",js:"javascript",jsx:"javascript",css:"css",ts:"typescript",png:"css",jpg:"css",jpeg:"css",gif:"css",cpp:"cpp"};var n,l=this,p=this.state.tabindex,a=(this.state.storage_id,l.parent.parent.data().files[p]||this.state.file.filename);function u(e){let t=document.getElementById("preview"),n=t.parentElement;t.parentElement.removeChild(t),(t=document.createElement("iframe")).style.width="98%",t.style.height="100%",t.id="preview",n.appendChild(t),t&&(t.contentWindow.document.open(),t.contentWindow.document.write(e),t.contentWindow.document.close()),t.contentWindow.document.body&&!t.contentWindow.document.body.isContentEditable&&(t.contentWindow.document.body.contentEditable=!0,t.contentWindow.document.body.contentEditable=!1)}async function o(){if(p===codeEditorHelper.getCurrentEditorIndex()){var t;if(null===(t=c.state.file?(t=await codeEditorHelper.getFileWithId(c.state.file.fileid)).code:await DB.getCode(l.parent.parent.data().storage_id[p]))&&(t=l.parent.parent.data().default[p],document.getElementById("code-editor-status").innerText="Ready"),c.state.file&&(c.state.file.filename.endsWith(".png")||c.state.file.filename.endsWith(".jpg")||c.state.file.filename.endsWith(".jpeg")||c.state.file.filename.endsWith(".gif")))if(codeEditorHelper.updateReadOnly(!0),await plugins.checkPluginStatus("hexy")){await plugins.load("hexy");let e=document.createElement("div");e.className="code-editor-cover",e.innerHTML="<span style='margin-top: 30px; display: block; font-size: 0.9em;'>This file is not displayed in the editor because it is either binary or uses an unsupported text encoding. <a class='url' style='border-bottom: 1px solid; cursor: pointer;'>Open with Hex Editor</a> or <a class='url' style='border-bottom: 1px solid; cursor: pointer;'>Open raw file</a></span>",e.querySelector("a").addEventListener("click",function(){let e=this.parentElement.parentElement;e.parentElement.removeChild(e),codeEditorHelper.updateContent(hexy(t))}),e.querySelectorAll("a")[1].addEventListener("click",function(){let e=this.parentElement.parentElement;e.parentElement.removeChild(e),codeEditorHelper.updateContent(t)}),document.getElementById("code-frame").parentElement.appendChild(e)}else{let e=document.createElement("div");e.className="code-editor-cover",e.innerHTML="<span style='margin-top: 30px; display: block; font-size: 0.9em;'>This file is not displayed in the editor because it is either binary or uses an unsupported text encoding. <a class='url' style='border-bottom: 1px solid; cursor: pointer;'>Do you want to open it anyway?</a><br>You can also try installing the Hex Editor extention to view this file.</span>",e.querySelector("a").addEventListener("click",function(){let e=this.parentElement.parentElement;e.parentElement.removeChild(e),codeEditorHelper.updateContent(t)}),document.getElementById("code-frame").parentElement.appendChild(e)}else codeEditorHelper.updateReadOnly(!1),codeEditorHelper.updateContent(t);setTimeout(function(){c.state.onLoadCallback(),document.getElementById("code-editor-status").innerText="Ready"},100)}}function i(){!function t(){try{document.getElementById("preview")&&(document.getElementById("preview").contentWindow.document.open(),document.getElementById("preview").contentWindow.document.write(codeEditorHelper.getValue()),document.getElementById("preview").contentWindow.document.close())}catch(e){setTimeout(t,500)}window.addEventListener("beforeunload",function(e){!1===window.codeEditorSaved&&(e.preventDefault(),e.returnValue="")})}(),async function t(){codeEditorHelper.setCurrentEditorIndex(l.parent.state.tabbedView.state.selected),p=codeEditorHelper.getCurrentEditorIndex();let e=a.split(".").pop().toLowerCase();var n={py:"brython",html:!1,md:"showdown",js:!1,jsx:"react",css:!1,ts:"typescript"};if(window.alertModals||(window.alertModals={pluginFileRequired:{}}),n[e]&&!1===await plugins.checkPluginStatus(n[e])&&!1!==n[e]&&!window.alertModals.pluginFileRequired[e]&&(window.alertModals.pluginFileRequired[e]=!0,codeEditorHelper.showAlertModal(`This file extention (.${e}) requires the ${n[e]} plugin to run`,[{text:"Install",onclick:function(){document.querySelectorAll(".project-module-tabs")[1].children[0].children[3].click(),codeEditorHelper.removeAlertModal(this.parentElement.getAttribute("data-editor-alert-modal-index")),setTimeout(function(){"Install"===document.getElementById("plugin-list-"+n[e]).querySelector("h5").innerText&&document.getElementById("plugin-list-"+n[e]).querySelector("h5").click()},100)}},{text:"Don't Install",onclick:function(){codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute("data-editor-alert-modal-index"))}}])),document.getElementById("preview-container")&&tApp.getComponentFromDOM(document.getElementById("preview-container")).update(),!window.addedEditorEventListeners){window.addedEditorEventListeners=!0;try{async function o(n){n.preventDefault();var t,o=document.getElementById("editor-tab-context-menu");Array.from(n.target.parentNode.children).indexOf(n.target);let i=n.target.getAttribute("data-storage_id");for(t in o.children){let e=o.children[t];"HR"!==e.nodeName&&"number"!=typeof e&&"function"!=typeof e&&(e.innerText.startsWith("Delete")?i.startsWith("USERDATA")?(e.style.display="",e.onclick=function(){codeEditorHelper.showAlertModal("Are you sure you want to delete this file? This action is irreversible!",[{text:"Confirm",onclick:async function(){await codeEditorHelper.deleteFile(i.slice("USERDATA".length)),codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute("data-editor-alert-modal-index")),window.location.reload()}},{text:"Cancel",onclick:function(){codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute("data-editor-alert-modal-index"))}}],"codicon-warning")}):e.style.display="none":e.innerText.startsWith("Rename")?i.startsWith("USERDATA")?(e.style.display="",e.onclick=async function(){let t=document.createElement("input");var e=n.target.getBoundingClientRect();t.setAttribute("type","text"),t.value=n.target.innerText,t.style.position="fixed",t.style.top=e.top+"px",t.style.left=e.left+"px",t.style.width=e.width+"px",t.style.backgroundColor=window.getComputedStyle(n.target,null).getPropertyValue("background-color"),t.style.color="white",t.style.zIndex="10",t.style.border="none",t.style.padding="10px 5px",t.style.filter="brightness(1.5)",t.style.borderRadius="10px 10px 0 0",t.style.fontSize="16px",document.body.appendChild(t),t.select(0,t.value.lastIndexOf(".")),t.addEventListener("blur",function(){t.parentElement.removeChild(t)}),t.addEventListener("keydown",async function(e){if("Enter"===e.key){try{await codeEditorHelper.renameFile(i.slice("USERDATA".length),t.value),window.location.reload()}catch(e){codeEditorHelper.showAlertModal(e,[{text:"Ok",onclick:function(){codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute("data-editor-alert-modal-index"))}}],"codicon-error")}t.blur()}})}):e.style.display="none":e.innerText.startsWith("Download")?e.onclick=function(){n.target.click(),setTimeout(function(){var e=document.createElement("a");e.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(codeEditorHelper.getValue())),e.setAttribute("download",n.target.innerText),e.style.display="none",document.body.appendChild(e),e.click(),document.body.removeChild(e)},1e3)}:e.innerText.startsWith("Format")?e.onclick=function(){n.target.click(),setTimeout(function(){codeEditorHelper.format()},500)}:e.innerText.startsWith("Run")?e.onclick=function(){n.target.click(),setTimeout(function(){document.getElementById("code-editor-run-btn").click()},500)}:e.innerText.startsWith("New File")?e.onclick=async function(){addFile()}:e.innerText.startsWith("Upload File")&&(e.onclick=async function(){uploadFile()}))}window.focus(),window.addEventListener("blur",function(){setTimeout(()=>{"IFRAME"===document.activeElement.tagName&&r()})},{once:!0}),o.classList.remove("none"),o.style.left=n.clientX-5+"px",o.style.top=n.clientY-5+"px"}function r(){document.getElementById("editor-tab-context-menu").classList.add("none")}function i(){p=codeEditorHelper.getCurrentEditorIndex(),setTimeout(function(){let e=document.querySelector("tapp-main").children[0].children[0].children[0].children[0].children[0].children[p].innerText,t=e.split(".").pop().toLowerCase();"html"!==t&&"md"!==t&&"png"!==t&&"jpg"!==t&&"jpeg"!==t&&"gif"!==t||setTimeout(function(){d(t)},200)},100)}async function d(e){if(p=codeEditorHelper.getCurrentEditorIndex(),window.lastUpdatePreview||(window.lastUpdatePreview=0),!(window.lastUpdatePreview+100>Date.now()))if(window.lastUpdatePreview=Date.now(),window.lastTab!==p&&document.getElementById("console-bridge").dispatchEvent(new Event("change")),window.lastTab=p,"html"===e){function i(e){window.consoleLogs=[[e]],document.getElementById("console-bridge").click()}let e=codeEditorHelper.getValue();e=await a(e,/(?<=src=("|'))(.*)(?=("|'))/g,async function(t){if(/^(http(s|):\/\/)/.test(t))return t;if(t.startsWith("data:"))return t;(t=t.replace(/^(.\/|\/)/g,"")).includes('"')&&(t=t.slice(0,t.indexOf('"')));var e,n=c.parent.parent.data().files.findIndex(e=>e===t);if(-1===n)try{e=(e=await codeEditorHelper.getFile(t)).code}catch(e){i(`GET ${t} net::ERR_ABORTED 404 (File not found)'`)}else e=await DB.getCode(c.parent.parent.data().storage_id[n]);return t.endsWith(".png")||t.endsWith(".jpg")||t.endsWith(".jpeg")||t.endsWith(".gif")?"data:image/png;base64,"+btoa(e):"data:text/plain;base64,"+plugins.Base64.encode(e)}),u(e=(e="\x3c!--Devnetic Loaded--\x3e"+(e=await a(e,/<link(.*)(?<=href=("|'))(.*)(?=("|'))/g,async function(o){return o.includes("stylesheet")?o=await a(o,/(?<=href=("|'))(.*)/g,async function(t){if(/^(http(s|):\/\/)/.test(t))return t;t=t.replace(/^(.\/|\/)/g,"");var e,n=c.parent.parent.data().files.findIndex(e=>e===t);if(-1===n)try{e=(e=await codeEditorHelper.getFile(t)).code}catch(e){i(`GET ${o} net::ERR_ABORTED 404 (File not found)'`)}else e=await DB.getCode(c.parent.parent.data().storage_id[n]);return"data:text/plain;base64,"+plugins.Base64.encode(e)}):o}))).replace("<!DOCTYPE html>",""));try{document.getElementById("preview-container").classList.remove("preview-mode-console");var n=document.querySelector(".console-wrapper");n&&console.parentElement.removeChild(n)}catch(e){}}else if("cpp"===e){document.getElementById("console-bridge").dispatchEvent(new Event("change")),window.consoleLogs=[],window.consoleLogs.push(["Starting c++ engine..."]),document.getElementById("console-bridge").click();try{await plugins.load("jscpp")}catch(e){return window.consoleLogs.push(["This file requires the JS-CPP plugin to run!"]),void document.getElementById("console-bridge").click()}var t=codeEditorHelper.getValue(),o=(document.querySelector(".console-input").onkeyup=function(e){"Enter"===e.key&&(document.querySelector(".console-input").disabled=!0,window.queuedCppDrainInput=document.querySelector(".console-input").value,document.querySelector(".console-input").value="")},{stdio:{write:function(e){window.consoleLogs.push([e]),window.document.getElementById("console-bridge").click(),window.newLogCallback&&window.newLogCallback(e)},drain:function(){return"input on c++ files not supported!"}}});!async function(){try{var e=JSCPP.run(t,"",o)}catch(e){window.consoleLogs.push([e]),window.document.getElementById("console-bridge").click(),window.newLogCallback&&window.newLogCallback(e)}window.consoleLogs.push(["Program ended with exit code "+e]),window.document.getElementById("console-bridge").click(),window.newLogCallback&&window.newLogCallback(s)}()}else if("py"===e){document.getElementById("console-bridge").dispatchEvent(new Event("change")),window.consoleLogs=[];try{let e=document.querySelector("#python-execution-thread");e&&e.parentElement.removeChild(e),plugins.unload("brython")}catch(e){}if(window.consoleLogs.push(["Starting python emulator..."]),document.getElementById("console-bridge").click(),!1===await plugins.checkPluginStatus("brython"))return window.consoleLogs.push(["Running python files requires the brython plugin! Install it first in the plugins tab"]),void document.getElementById("console-bridge").click();console.log("Starting python emulator"),window.newLogCallback&&window.newLogCallback(["Starting python emulator..."]);var n=makeid(10),r=`
import sys
import browser
import traceback
from browser import aio
_print = print
def print(*args, **kw):
	browser.window.newLog(args)
sys.stderr = print
async def input(text):
	print(text)
	browser.window.enableInput()
	await aio.event(browser.window.document.getElementById("python-sandbox-bridge"), "click")
	value = browser.window.getInput()
	browser.window.disableInput()
	return value
async def ${n}():
`;let t=codeEditorHelper.getValue().replace(/^(?!\s*$)/gm,"    ").replace(/time\.sleep(?=(?:(?:[^"]*"){2})*[^"]*$)/g,"await aio.sleep").replace(/input(?=(?:(?:[^"]*"){2})*[^"]*$)/g,"await input");t=(t=t.replace(/    def/g,"    async def")).replace(/....[a-zA-Z]+\([^\)]*\)(\.[^\)]*\))?/g,function(e){if(e.startsWith("def "))return e;var t,n=["abs(","aiter(","all(","any(","anext(","ascii(","bin(","bool(","breakpoint(","bytearray(","bytes(","callable(","chr(","classmethod(","compile(","complex(","delattr(","dict(","dir(","divmod(","enumerate(","eval(","exec(","filter(","float(","format(","frozenset(","getattr(","globals(","hasattr(","hash(","help(","hex(","id(","input(","int(","isinstance(","issubclass(","iter(","len(","list(","locals(","map(","max(","memoryview(","min(","next(","object(","oct(","open(","ord(","pow(","print(","property(","range(","repr(","reversed(","round(","set(","setattr(","slice(","sorted(","staticmethod(","str(","sum(","super(","tuple(","type(","vars("];for(t in n)if(e.slice(4).startsWith(n[t]))return e;return e.slice(3).startsWith(".")||e.startsWith("ait ")?e:e.substring(0,4)+"await aio.run("+e.slice(4)+")"});n=`
try:
	aio.run(${n}())
except Exception:
    print(traceback.format_exc())
`;try{window.__BRYTHON__||(await plugins.load("brython"),brython({pythonpath:["/assets/plugins/brython/modules/"],cache:!0,debug:0}))}catch(e){window.consoleLogs.push(["We couldn't find the necessary plugins to run python files! Please install brython in the plugins panel."]),document.getElementById("console-bridge").click(),window.newLogCallback&&window.newLogCallback(["We couldn't find the necessary plugins to run python files! Please install brython in the plugins panel."])}try{window.URL=window.URL||window.webkitURL;var d=r+"\n"+t+"\n"+n;if(document.getElementById("python-execution-thread")){let e=document.getElementById("python-execution-thread");e.parentElement.removeChild(e)}let e=document.createElement("iframe");e.style.width=0,e.style.height=0,e.id="python-execution-thread",e.srcdoc=`
								<html>
									<body>
										<div id="python-sandbox-bridge"></div>
									</body>
								</html>
								<script>
								${await plugins.getCode("brython")}
								</script>
								<script type="text/python">
${d}
								</script>
								<script>
								console.oldLog = console.log
								console.log = function(){
									console.oldLog("err")
									window.newLog(arguments)
								}
								console.error = function(){
									window.newLog(arguments)
								}
								brython({pythonpath: ["/assets/plugins/brython/modules/"], cache: true, debug: 1})
								</script>
								`,document.body.appendChild(e),e.contentWindow.newLog=function(e){let t=[];for(var n in e)t.push(e[n]);window.consoleLogs.push(t),window.document.getElementById("console-bridge").click(),window.newLogCallback&&window.newLogCallback(e)},e.contentWindow.pyjsCode=d,e.contentWindow.enableInput=function(){document.querySelector(".console-input").disabled=!1,document.querySelector(".console-input").focus()},e.contentWindow.disableInput=function(){document.querySelector(".console-input").disabled=!0,document.querySelector(".console-input").value=""},e.contentWindow.getInput=function(){return document.querySelector(".console-input").value}}catch(e){throw window.consoleLogs.push([e.toString(),e.stack]),document.getElementById("console-bridge").click(),window.newLogCallback&&window.newLogCallback([e.toString(),e.stack]),e}}else if("md"===e){if(document.getElementById("preview")){try{await plugins.load("showdown")}catch(e){return void codeEditorHelper.showAlertModal("Markdown plugin not found! You must install it before you can render markdown files.",[{text:"Ok",onclick:function(){codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute("data-editor-alert-modal-index"))}}],"codicon-error")}r=codeEditorHelper.getValue();u((new showdown.Converter).makeHtml(r))}}else if("js"===e){document.getElementById("console-bridge").dispatchEvent(new Event("change")),window.consoleLogs=[];try{let e=document.querySelector("#python-execution-thread");e&&e.parentElement.removeChild(e)}catch(e){}window.consoleLogs.push(["Starting javascript engine..."]),document.getElementById("console-bridge").click();n=codeEditorHelper.getValue();if(document.getElementById("python-execution-thread")){let e=document.getElementById("python-execution-thread");e.parentElement.removeChild(e)}let e=document.createElement("iframe");e.style.width=0,e.style.height=0,e.id="python-execution-thread",e.srcdoc=`
							<html>
								<body>
									<div id="python-sandbox-bridge"></div>
								</body>
							</html>
							<script>
console.oldLog = console.log
console.log = function(){
	window.newLog(arguments)
}
console.error = function(){
	window.newLog(arguments)
}
try{
	${n}
}catch(err){
	console.error(err)
}
							</script>
							`,document.body.appendChild(e),e.contentWindow.newLog=function(e){let t=[];for(var n in e)t.push(e[n]);window.consoleLogs.push(t),window.document.getElementById("console-bridge").click(),window.newLogCallback&&window.newLogCallback(e)},e.contentWindow.onerror=function(e){return e=e.toString(),window.consoleLogs.push([e]),window.document.getElementById("console-bridge").click(),!1}}else if("jsx"===e)!async function(){function i(e){window.consoleLogs=[[e]],document.getElementById("console-bridge").click()}let t=codeEditorHelper.getValue(),r=(await plugins.load("react"),""),d="";if(t=await a(t,/import([\s\S]*?)(?='|").*/g,async function(e){if("react"===e.replaceAll('"',"'").match(/(?<=')(.*)(?=')/g)[0])return"";if("react-dom"===e.replaceAll('"',"'").match(/(?<=')(.*)(?=')/g)[0])return"";var t=e.match(/(?<=import)(.*)(?=from)/g)[0];let n=e.replaceAll('"',"'").match(/(?<=')(.*)(?=')/g)[0];if(!(n=n.startsWith("./")?n:"./"+n).startsWith("./")||1!==n.indexOf("/"))return i("DependencyNotFoundError: Could not find dependency: '"+n+"'");n=n.slice(2);var o=c.parent.parent.data().files.findIndex(e=>e===n);if(-1===o)try{l=(l=await codeEditorHelper.getFile(n)).code}catch(e){return i("DependencyNotFoundError: Could not find dependency: '"+n+"'")}else l=await DB.getCode(c.parent.parent.data().storage_id[o]);return l=l.replaceAll(/import([\s\S]*?)(?='|").*/g,function(e){return"react"===e.replaceAll('"',"'").match(/(?<=')(.*)(?=')/g)[0]||"react-dom"===e.replaceAll('"',"'").match(/(?<=')(.*)(?=')/g)[0]?"":e}),n.endsWith(".module.css")?(l="export default "+function(e){var t=JSON.stringify(e,0,4),n=t.match(/".*?":/g);if(null===n)return"{}";for(var o=0;o<n.length;o++)t=t.replace(n[o],n[o].replace(/"/g,""));return t.replaceAll('\\"',"")}(window.nativeCss.convert(l)),l="data:text/javascript;charset=utf-8;base64,"+plugins.Base64.encode(l),r+=`import${t}from '${l}';
`):n.endsWith(".css")?d+="<style>\n"+l+"\n</style>":(l=Babel.transform(l,{plugins:["transform-react-jsx"]}).code,l="data:text/javascript;charset=utf-8;base64,"+plugins.Base64.encode(l),r+=`import${t}from '${l}';
`),""}),t=Babel.transform(t,{plugins:["transform-react-jsx"]}).code,document.getElementById("preview")){u(`
									<html>
										<head>
										${d}
										</head>
										<body>
											<div id="root"></div>
											<script>
											${await plugins.getCode("react")}
											</script>
											<script type="module">
											${r}
												try{
													${t}
												}catch(err) {
														err = err.toString()
														window.parent.consoleLogs = [];
														window.parent.consoleLogs.push([err])
														window.parent.document.getElementById("console-bridge").click()
												}
											</script>
										</body>
									</html>
									`),document.getElementById("preview-container").classList.remove("preview-mode-console");let e=document.querySelector(".console-wrapper");e&&e.parentElement.removeChild(e)}}();else if("ts"===e){document.getElementById("console-bridge").dispatchEvent(new Event("change")),window.consoleLogs=[];try{let e=document.querySelector("#python-execution-thread");e&&e.parentElement.removeChild(e)}catch(e){}window.consoleLogs.push(["Starting typescript engine..."]),document.getElementById("console-bridge").click();d=codeEditorHelper.getValue();if(document.getElementById("python-execution-thread")){let e=document.getElementById("python-execution-thread");e.parentElement.removeChild(e)}try{await plugins.load("typescript")}catch(e){return window.consoleLogs.push(["This file requires the Typescript plugin to run!"]),void document.getElementById("console-bridge").click()}if(d=window.ts.transpile(d),document.getElementById("python-execution-thread")){let e=document.getElementById("python-execution-thread");e.parentElement.removeChild(e)}let e=document.createElement("iframe");e.style.width=0,e.style.height=0,e.id="python-execution-thread",e.srcdoc=`
							<html>
								<body>
									<div id="python-sandbox-bridge"></div>
								</body>
							</html>
							<script>
console.oldLog = console.log
console.log = function(){
	window.newLog(arguments)
}
console.error = function(){
	window.newLog(arguments)
}
try{
	${d}
}catch(err){
	console.error(err)
}
							</script>
							`,document.body.appendChild(e),e.contentWindow.newLog=function(e){let t=[];for(var n in e)t.push(e[n]);window.consoleLogs.push(t),window.document.getElementById("console-bridge").click(),window.newLogCallback&&window.newLogCallback(e)},e.contentWindow.onerror=function(e){return e=e.toString(),window.consoleLogs.push([e]),window.document.getElementById("console-bridge").click(),!1}}else if("png"===e||"jpg"===e||"jpeg"===e||"gif"===e){let t=document.querySelectorAll("#code-editor-component > div:nth-child(1) > div > div.tab-group .tab")[p].innerText;var l,r=c.parent.parent.data().files.findIndex(e=>e===t);if(-1===r)try{l=(l=await codeEditorHelper.getFile(t)).code}catch(e){throw e}else l=await DB.getCode(c.parent.parent.data().storage_id[r]);u(`
							<html>
								<body>
									<img src="data:image/png;base64,${btoa(l)}">
								</body>
							</html>
							`)}async function a(e,t,n){const o=[],i=(e.replace(t,(e,...t)=>{e=n(e,...t);o.push(e)}),await Promise.all(o));return e.replace(t,()=>i.shift())}}document.querySelectorAll(".tab").forEach(e=>{"Preview"===e.innerText&&e.addEventListener("click",i)}),document.querySelectorAll("#code-editor-component div div div .tab").forEach(e=>{e.addEventListener("contextmenu",o)}),document.addEventListener("click",r),document.getElementById("code-editor-run-btn").onclick=async function(){var e,t=tApp.getComponentFromDOM(document.querySelector("tapp-main").children[0].children[0]).data().files[p]||document.querySelector("tapp-main").children[0].children[0].children[0].children[0].children[0].children[p].innerText;p=codeEditorHelper.getCurrentEditorIndex(),document.getElementById("code-editor-status").innerText="Saving...",l.parent.parent.data().storage_id[p]?(t=tApp.getComponentFromDOM(document.querySelector("tapp-main").children[0].children[0]).data().files[p],codeEditorHelper.getCurrentEditorOption(81)||await DB.setCode(l.parent.parent.data().storage_id[p],codeEditorHelper.getValue())):(t=document.querySelector("tapp-main").children[0].children[0].children[0].children[0].children[0].children[p].innerText,e=await codeEditorHelper.getFile(t),codeEditorHelper.getCurrentEditorOption(81)||await codeEditorHelper.updateFile(e.fileid,codeEditorHelper.getValue())),d(t.split(".").pop().toLowerCase()),setTimeout(function(){document.getElementById("code-editor-status").innerText="Ready"},500)},document.getElementById("code-frame").contentWindow.document.onkeydown=async function(e){var t;p=codeEditorHelper.getCurrentEditorIndex(),window.codeEditorSaved=!1,82===e.keyCode&&e.ctrlKey&&(window.codeEditorSaved=!0),"s"===e.key&&(navigator.platform.match("Mac")?e.metaKey:e.ctrlKey)&&(e.preventDefault(),document.getElementById("code-editor-status").innerText="Saving...",e=tApp.getComponentFromDOM(document.querySelector("tapp-main").children[0].children[0]).data().files[p]||document.querySelector("tapp-main").children[0].children[0].children[0].children[0].children[0].children[p].innerText,l.parent.parent.data().storage_id[p]?(e=tApp.getComponentFromDOM(document.querySelector("tapp-main").children[0].children[0]).data().files[p],codeEditorHelper.getCurrentEditorOption(81)||await DB.setCode(l.parent.parent.data().storage_id[p],codeEditorHelper.getValue())):(e=document.querySelector("tapp-main").children[0].children[0].children[0].children[0].children[0].children[p].innerText,t=await codeEditorHelper.getFile(e),codeEditorHelper.getCurrentEditorOption(81)||await codeEditorHelper.updateFile(t.fileid,codeEditorHelper.getValue())),"html"!==(t=e.split(".").pop().toLowerCase())&&"jsx"!==t||d(t),window.codeEditorSaved=!0,setTimeout(function(){document.getElementById("code-editor-status").innerText="Ready"},500))},window.codeEditorSaved=!0}catch(e){console.log(e),setTimeout(t,500)}}}()}return console.log("Editor number "+p+" is rendering"),!document.getElementById("code-editor-run-btn")||"html"!==a.split(".").pop().toLowerCase()&&"png"!==a.split(".").pop().toLowerCase()&&"jpg"!==a.split(".").pop().toLowerCase()&&"jpeg"!==a.split(".").pop().toLowerCase()&&"gif"!==a.split(".").pop().toLowerCase()||setTimeout(function(){document.getElementById("code-editor-run-btn").click()},100),document.getElementById("code-frame")&&(!0===window.monacoAlreadyLoaded?(i(),o(),n=a.split(".").pop().toLowerCase(),codeEditorHelper.updateLanguage(t[n])):document.getElementById("code-frame").contentWindow.addEventListener("message",async function(e){if("monacoloaded"===e.data.message){window.monacoAlreadyLoaded=!0,o(),i();e=a.split(".").pop().toLowerCase();codeEditorHelper.updateLanguage(t[e]);try{window.pluginList&&window.pluginList.betterEditor?reloadPluginSettings():await plugins.load("betterEditor")}catch(e){}}},!1)),`<div id="code-editor-tab">
		<div class="code-editor-options">
			<span id="code-editor-status" style="display: inline-block; margin-left: 23px; margin-top: 10px;">Downloading code...</span>
			<span id="code-editor-run-btn" class="home-module home-module-complete" style="margin: 0; width: fit-content; padding-left: 20px; padding-right: 20px; margin-left: 20px; position: relative; z-index: 10">Run</span>
		</div>
		<div class="code-editor">
			<iframe id="code-frame" style="width: 100%; height: 100%; border: none" src="/assets/html/code-editor.html"></iframe>
		</div>
		</div>`}}class TabbedEditor extends tApp.Component{constructor(e,t){super(e,t),(window.debug=this).state.tabbedView="Loading...",this.x=!1}render(){delete window.monacoAlreadyLoaded,delete window.addedEditorEventListeners;var l=this,a=[];return async function e(){if(await plugins.load("betterEditor"),!0!==l.x){if(l.x=!0,void 0===l.parent.data())return l.x=!1,setTimeout(e,100);var t=l.parent.data();t.isUserProject?(console.log("This is a user-generated project! Applying custom settings..."),window.isUserProject=!0):window.isUserProject=!1;for(var n=0;n<t.files.length;n++)null==l.state[t.storage_id[n]]&&(console.log("Created new editor instance: ",t.storage_id[n]),l.state[t.storage_id[n]]=new Editor({tabindex:n,storage_id:t.storage_id[n],onLoadCallback:d},l)),a.push({name:t.files[n],component:l.state[t.storage_id[n]],tabDataset:{storage_id:t.storage_id[n]}});for(var o=n,i=await codeEditorHelper.getAllUserFiles();n<i.length+o;n++){var r=i[n-o];null==l.state[r.fileid]&&(l.state[r.fileid]=new Editor({tabindex:n,storage_id:"USERDATA"+r.fileid,file:r,onLoadCallback:d},l)),a.push({name:r.filename,component:l.state[r.fileid],tabDataset:{storage_id:"USERDATA"+r.fileid}})}"Loading..."==l.state.tabbedView&&(l.setState("tabbedView",new TabbedView({tabs:a},l)),document.body.setAttribute("data-before","Loading files..."),document.body.classList.add("tester-testing"),document.body.classList.add("data-loadingfile")),0===t.files.length&&d()}async function d(){document.body.classList.contains("data-loadingfile")&&(document.body.classList.remove("data-loadingfile"),document.body.classList.remove("tester-testing"),await plugins.checkPluginStatus("betterEditor")||(document.querySelector(".codicon.codicon-new-file").style.left="auto",document.querySelector(".codicon.codicon-new-file").style.right="35px",document.querySelector(".codicon.codicon-cloud-upload").style.left="auto",document.querySelector(".codicon.codicon-cloud-upload").style.right="15px"),document.querySelector(".codicon.codicon-new-file").onclick=addFile,document.querySelector(".codicon.codicon-cloud-upload").onclick=uploadFile)}}(),`<div style="position: absolute; left: 0; width: 100%; transform: translateX(-50%);">
		${this.state.tabbedView}
		<span class="codicon codicon-new-file" style="position: absolute; left: calc(var(--editorLeftTabWidth) + 45vw); top: 20px; cursor: pointer; z-index: 2"></span>
		<span class="codicon codicon-cloud-upload" style="position: absolute; left: calc(var(--editorLeftTabWidth) + 45vw + 25px); top: 20px; cursor: pointer; z-index: 2"></span>
		</div>`}}async function addFile(){var t=window.isUserProject?"page":await new Promise((e,t)=>{codeEditorHelper.showAlertModal("Would you like this file to be accessible lesson-wide or confined to this page?",[{text:"Lesson-Wide",onclick:function(){e("module"),codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute("data-editor-alert-modal-index"))}},{text:"Page only",onclick:function(){e("page"),codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute("data-editor-alert-modal-index"))}}],"codicon-warning")});let e=document.getElementById("snippets-modal"),n=e.cloneNode(!0),o=(n.removeAttribute("id"),n.classList.remove("none"),n.querySelector("h3").innerHTML="New File",n.querySelector(".button-correct").innerHTML="Create File",n.querySelector("span").onclick=function(){n.parentNode.removeChild(n)},n.querySelector(".button-correct").onclick=async function(){var e=this.parentElement.querySelector(".inputs input").value;0===e.length?codeEditorHelper.showAlertModal("You must enter a file name!",[{text:"Ok",onclick:function(){codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute("data-editor-alert-modal-index"))}}],"codicon-error"):(codeEditorHelper.uploadFile({filename:e,level:t,data:"",onsuccess:function(){window.location.reload()},onerror:function(e){codeEditorHelper.showAlertModal(e,[{text:"Ok",onclick:function(){codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute("data-editor-alert-modal-index"))}}],"codicon-error")}}),n.parentElement.removeChild(n))},document.createElement("input"));o.className="short-answer-input",o.classList.add("insert-snippet-input"),o.placeholder="File Name (Including its extention)",n.querySelector(".inputs").appendChild(o),document.body.appendChild(n)}async function uploadFile(){var o=window.isUserProject?"page":await new Promise((e,t)=>{codeEditorHelper.showAlertModal("Would you like this file to be accessible lesson-wide or confined to this page?",[{text:"Lesson-Wide",onclick:function(){e("module"),codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute("data-editor-alert-modal-index"))}},{text:"Page only",onclick:function(){e("page"),codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute("data-editor-alert-modal-index"))}}],"codicon-warning")});let i=document.createElement("input");i.setAttribute("type","file"),document.body.appendChild(i),i.click(),i.addEventListener("change",function(e){var n=e.target.files[0];n&&(5e7<n.size?codeEditorHelper.showAlertModal("This file is too big! The maximum size that a file can be is 50MB",[{text:"Ok",onclick:function(){codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute("data-editor-alert-modal-index"))}}],"codicon-error"):((e=new FileReader).onload=function(e){var t=e.target.result;console.log(e),e=t,t=n.name,i.parentElement.removeChild(i),codeEditorHelper.uploadFile({filename:t,level:o,data:e,onsuccess:function(){window.location.reload()},onerror:function(e){codeEditorHelper.showAlertModal(e,[{text:"Ok",onclick:function(){codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute("data-editor-alert-modal-index"))}}],"codicon-error")}})},n.name.endsWith(".png")||n.name.endsWith(".jpg")||n.name.endsWith(".jpeg")||n.name.endsWith(".gif")?e.readAsBinaryString(n):e.readAsText(n)))},!1)}module.exports=TabbedEditor;