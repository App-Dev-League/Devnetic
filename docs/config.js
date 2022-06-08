function recurseEjs(n,i={}){return new Promise(async(e,t)=>{i.include=async function(e){let t=await tApp.get(e);return recurseEjs(await t.text(),i)},e(await ejs.render(n,i,{async:!0}))})}function confirmRedoLesson(){return new Promise((e,t)=>{let n=document.getElementById("snippets-modal"),i=n.cloneNode(!0),o=(i.removeAttribute("id"),i.classList.remove("none"),i.querySelector("h3").innerHTML="You have already completed this module!",i.querySelector("h3").style.fontSize="1.5em",i.querySelector(".button-correct").innerHTML="Redo Module",i.querySelector(".button-correct").cloneNode());o.innerHTML="Next Module",o.style.marginLeft="10px",o.style.backgroundColor="var(--blue-selected)",i.querySelector(".button-correct").parentNode.appendChild(o),i.querySelector("span").onclick=function(){e("stay"),i.parentNode.removeChild(i)},i.querySelector(".button-correct").onclick=async function(){i.parentElement.removeChild(i),e(!0)},o.onclick=function(){i.parentElement.removeChild(i),e(!1)},document.body.appendChild(i)})}(async()=>{await installAll(["CodeEditor.js","CodePreview.js","Congratulations.js","Editor.js","ExplanationModal.js","Information.js","Input.js","Instructions.js","ModuleComponent.js","ModulePage.js","MultipleChoice.js","MultipleChoiceOption.js","ShortAnswer.js","SnippetsPanel.js","SnippetUnlock.js","TabbedView.js","codeBlock.js","PluginPanel.js"],{path:"./components/"},newFileCallback),await installAll(["codeBlocks.js","codeEditor.js","codeTemplateToCode.js","compileSnippet.js","doesFileExist.js","Database.js","plugins.js","shuffleArray.js"],{path:"./utils/"},newFileCallback),await install("./assets/libraries/ejs.js");const e=require("./components/ModulePage.js"),m=require("./components/Information.js"),u=require("./components/MultipleChoice.js"),h=require("./components/ShortAnswer.js"),f=require("./components/SnippetUnlock.js"),y=require("./components/Congratulations.js"),l=require("./components/CodeEditor.js"),w=require("./utils/codeTemplateToCode.js"),j=require("./utils/shuffleArray.js"),b=require("./utils/Database.js");require("./utils/plugins.js"),require("./assets/libraries/ejs.js");var t={target:document.querySelector("tapp-main"),ignoreRoutes:[],forbiddenRoutes:[],errorPages:{notFound:"#/404",forbidden:"#/403"},caching:{backgroundPages:["/tApp.js","/require-browser.js","/","/config.js","/index.html","/manifest.json",...["ai","index","intro-to-cs","menu","my-projects","webdev-projects","webdev"].map(e=>`/views/${e}.html`),...["codeBlocks","codeEditor","codeTemplateToCode","compileSnippet","Database","doesFileExist","plugins","shuffleArray"].map(e=>`/utils/${e}.js`),"/assets/fonts/codicon.ttf",...["Black.ttf","BlackItalic.ttf","Bold.woff2","BoldItalic.ttf","ExtraBold.woff2","ExtraBoldItalic.ttf","ExtraLight.ttf","ExtraLightItalic.ttf","Italic.ttf","Light.ttf","LightItalic.ttf","Regular.woff2","SemiBold.woff2","SemiBoldItalic.ttf"].map(e=>"/assets/fonts/Nunito/Nunito-"+e),"/assets/fonts/Nunito/OFL.txt",...["codeBlock","CodeEditor","CodePreview","Congratulations","Editor","ExplanationModal","Information","Input","Instructions","ModuleComponent","ModulePage","MultipleChoice","MultipleChoiceOption","PluginPanel","ShortAnswer","SnippetUnlock","SnippetsPanel","TabbedView"].map(e=>`/components/${e}.js`),"/assets/html/code-editor.html","/assets/libraries/highlightjs/atom-one-dark.css","/assets/libraries/highlightjs/highlight.min.js","/assets/libraries/monaco-editor/vs/loader.js",...["ejs","jquery.min"].map(e=>`/assets/libraries/${e}.js`),"/assets/stylesheets/lighttheme.css",...["icon","screenshot"].map(e=>`/assets/img/${e}.png`),...["0","1","2","3","4","5","6","7"].map(e=>`/data/modules/ai/${e}.json`),...["0","1","2","3","4","5","6","7"].map(e=>`/data/modules/webdev/${e}.json`),...["0","1","2","3","4","5","6","7"].map(e=>`/data/modules/webdev-projects/${e}.json`),...["0","1"].map(e=>`/data/modules/intro-to-cs/${e}.json`),...["img0/0-0.png","img0/1-0.png","img0/2-0.png","img0/2-1.png","img0/2-2.png","img0/2-3.png","img0/4-0.png","img0/4-1.png","img0/4-2.png","img0/4-3.png","img0/8-0.png","img0/8-1.png","img0/8-2.png","img0/8-3.png","img1/0-0.png","img1/3-0.png","img1/5-0.png","img1/5-1.png","img1/5-2.png","img1/6-0.png","img1/7-0.png","img1/8-0.png","img3/2-0.png","img4/1-0.png","/img5/0-0.png","/img5/1-0.png","/img5/1-1.png","/img5/2-0.png","/img5/2-1.png","/img5/4-0.png","/img5/4-1.png","/img5/5-0.png","/img5/5-1.png","/img5/5-2.png","/img5/6-0.png","/img5/6-1.png","/img5/7-0.png","/img5/7-1.gif","/img6/0-0.png","/img6/0-1.png","/img6/0-2.png","/img6/1-0.png","/img6/2-0.png","/img6/2-1.png","/img6/3-0.png","/img6/3-1.png","/img6/3-2.png","/img6/4-0.png","/img6/5-0.png","/img7/0-0.png","/img7/1-0.png","/img7/2-0.png","/img7/3-0.png","/img7/4-0.png","/img7/5-0.png"].map(e=>"/data/modules/webdev-assets/"+e),...["img0/0-0.png","img0/1-0.png","img1/0-1.png","img1/1-1.png","img2/0-2.png","img2/1-2.png","img2/2-2.png","img2/3-2.png","img2/4-2.png","img2/5-2.png","img3/0-3.png","img4/0-0.png","img4/0-1.png","img4/1-0.png","img4/1-1.png","img4/2-0.png","img4/2-1.png","img4/2-2.png","img4/3-0.png","img4/3-1.png","img4/3-2.png","img5/0-0.png","img5/0-1.png","img5/0-2.png","img5/0-3.png","img5/0-4.png","img5/1-0.png","img5/1-1.png","img5/1-2.png","img5/1-3.png","img5/1-4.png","img5/1-5.png","img5/2-0.gif","img5/2-1.png","img5/2-2.png","img5/2-3.png","img5/3-0.png","img5/3-1.png","img5/3-2.png","img5/3-3.png","img5/3-4.png","img5/3-5.png","img6/0-0.png","img6/1-0.png","img6/2-0.png","img6/3-0.png","img6/4-0.png","img6/4-1.png","img6/5-0.png","img6/5-1.png","img6/6-0.png","img7/0-0.png","img7/0-1.png","img7/0-2.png","img7/0-3.png","img7/1-0.png","img7/1-1.png","img7/1-2.png","img7/1-3.png","img7/1-4.png","img7/1-5.png","img7/2-0.png","img7/3-0.png","img7/3-1.png","img7/3-2.png","img7/3-3.png","img7/4-0.png","img7/4-1.png","img7/4-2.png","img7/4-3.png","img7/4-4.png","img7/4-5.png","img7/4-6.png","img7/4-7.png"].map(e=>"/data/modules/ai-assets/"+e),...["img0/0-0.png"].map(e=>"/data/modules/intro-to-cs-assets/"+e)],periodicUpdate:36e5,persistent:!0}};"development"==window.environment&&(t.caching=null),tApp.configure(t),tApp.route("/",function(e){tApp.redirect("#/")}),tApp.route("#/",function(e){tApp.get("./views/index.html").then(e=>e.text()).then(async e=>{e=await recurseEjs(e);tApp.render(e)})}),tApp.route("#/track/<track>",function(e){tApp.get(`./views/${e.data.track}.html`).then(e=>e.text()).then(async e=>{e=await recurseEjs(e);tApp.render(e)}).catch(e=>{tApp.renderPath("#/404")})}),tApp.route("#/my-projects",function(e){tApp.get("./views/my-projects.html").then(e=>e.text()).then(async e=>{e=await recurseEjs(e,{myProjectsPage:!0});tApp.render(e)})}),tApp.route("#/learn/<track>/<module>/",async function(e){tApp.redirect(`#/learn/${e.data.track}/${e.data.module}/${await b.getModulePosition(e.data.track,e.data.module)}/`)}),window.DB=b,tApp.route("#/preview/html/<id>/autoupdate",async function(e){let t=e.data.id;if(!t.endsWith(".html")&&!t.endsWith(".jsx"))return tApp.render(`
			<h1>Error</h1>
			<p>Currently, only HTML and JSX files are only supported in window preview mode :(</p>`);await b.getCode(t)||tApp.render("<h4>We couldn't find your file!</h4>");e=`
			document.getElementById("preview").srcdoc = await window.DB.getCode("${t}")`;t.endsWith(".jsx")&&(e=`
			const plugins = require("./utils/plugins.js");
			   async function main(){
					await plugins.load("react");
					let code = await window.DB.getCode("${t}")
					code = Babel.transform(code, {
						plugins: ["transform-react-jsx"]
					}).code;
					document.getElementById("preview").srcdoc = "<html> <body> <div id='root'></div> <script>"+plugins.getCode("react")+"<\\/script><script>"+code+"<\\/script></body></html>";
			   }
			   main()
			`),tApp.render(`<div>
		<script>
		async function load(){
		${e}
		}
		load();
		window.addEventListener('storage', load)
		</script>
		<style>header{display: none !important}</style><script></script><iframe id="preview" srcdoc="Loading...." style="width: 100vw; height: 100vh; border: none; background: white; position: fixed; z-index: 500; top: 0; left 0; display: block"></iframe></div>
		<script>
		document.getElementById("preview").onload = function(){
			document.title = document.getElementById("preview").contentDocument.title;
		}
		</script>
		`)}),tApp.route("#/preview/html/<id>",async function(e){e=e.data.id;let t=await b.getCode(e);t||tApp.render("<h4>We couldn't find your file!</h4>"),t=t.replace(/"/g,"&quot;"),tApp.render(`<div><style>header{display: none !important}</style><script></script><iframe id="preview" srcdoc="${t}" style="width: 100vw; height: 100vh; border: none; background: white; position: fixed; z-index: 500; top: 0; left 0; display: block"></iframe></div>`)});let A=new e({Database:b});tApp.route("#/learn/<track>/<module>/<position>",function(a){async function t(e,t=!1){let{data:r,type:n,moduleLength:i,next:o,moduleData:s}=e,p=(document.getElementById("module-progress-bar").style.width=a.data.position/i*100+"%",window.tAppRequestInstance=a,window.currentModuleData=s,0);if(document.querySelectorAll(".module-progress-bar-timeline-element").forEach(e=>{e.classList.contains("template")||e.parentElement.removeChild(e)}),t||window.currentModuleData.pages.forEach(e=>{let t=document.getElementById("module-progress-bar-wrapper"),n=t.querySelector(".template"),i=n.cloneNode(!0);i.classList.remove("template"),i.style.left=p/window.currentModuleData.pages.length*100+"%",a.data.position>p?i.classList.add("filled"):i.classList.remove("filled"),"information"===e.type&&(i.querySelector(".name").innerText=e.title||"",i.querySelector(".descriptor").innerHTML="<b>Type: </b>Learn"),"multiple_choice"===e.type&&(i.querySelector(".name").innerText=e.question.slice(0,10)+"..."||"",i.querySelector(".descriptor").innerHTML="<b>Type: </b>Question"),"snippet_unlock"===e.type&&(i.querySelector(".name").innerText=e.name.slice(0,10)+"..."||"",i.querySelector(".descriptor").innerHTML="<b>Type: </b>Snippet"),"short_answer"===e.type&&(i.querySelector(".name").innerText=e.question.slice(0,10)+"..."||"",i.querySelector(".descriptor").innerHTML="<b>Type: </b>Question"),"congratulations"===e.type&&(i.querySelector(".name").innerText="Lesson summary",i.querySelector(".descriptor").innerHTML="<b>Type: </b>Summary"),"code_editor"===e.type&&(i.querySelector(".name").innerText=e.elements[0].content.replaceAll("[[h3]]","").replaceAll("[[/]]",""),i.querySelector(".descriptor").innerHTML="<b>Type: </b>Project"),p++,t.appendChild(i)}),a.data.position>=i)return!0===(e=await confirmRedoLesson())?tApp.redirect(`#/learn/${a.data.track}/${a.data.module}/0`):"stay"===e?tApp.redirect("#/track/"+a.data.track):void(o.hasNext?tApp.redirect(`#/learn/${a.data.track}/${o.module}/`+o.position):tApp.redirect("#/"));if("lesson"==n||"project"==n){if(null!=r.code_template&&(r.code=w(r.code_template)),o.hasNext?A.state.next=`#/learn/${a.data.track}/${o.module}/`+o.position:A.state.next="#/",A.state.track=a.data.track,A.state.module=a.data.module,A.state.position=a.data.position,"information"==r.type)A.setComponent(new m({},A),r);else if("multiple_choice"==r.type){let n=j([...r.answers]),i=[];for(let t=0;t<n.length;t++)i.push(r.answers.findIndex(e=>e===n[t]));let t=[];for(let e=0;e<i.length;e++)t.push(r.answers[i[e]]);let o=[];for(let e=0;e<i.length;e++)o.push(r.descriptions[i[e]]);if(r.answers=t,r.descriptions=o,Array.isArray(r.correct)){let e=[...r.correct];r.correct=[],e.forEach(t=>r.correct.push(i.findIndex(e=>e===t)))}else r.correct=i.findIndex(e=>e===r.correct);A.setComponent(new u({},A),r)}else"short_answer"==r.type?A.setComponent(new h({},A),r):"snippet_unlock"==r.type?A.setComponent(new f({},A),r):"congratulations"==r.type?A.setComponent(new y({},A),r):"code_editor"==r.type&&(r.isUserProject=t,A.setComponent(new l({},A),r));tApp.render(A.toString())}else tApp.renderPath("#/404"),console.error("Unknown type "+n)}a.data.module=parseInt(a.data.module),a.data.position=parseInt(a.data.position),"customUserProjects"===a.data.track?t({type:"project",moduleLength:1,next:{hasNext:!0,module:a.data.module,position:1},data:{type:"code_editor",storage_id:[],files:[],default:[],display_type:"web",elements:[],hints:[],validation:[],points:0,coins:0}},!0):b.getModuleData(a.data.track,a.data.module,a.data.position).then(async e=>{t(e)}).catch(e=>{tApp.renderPath("#/404")})}),tApp.route("#/DEV-SHOW-ALL",async function(s){var p="",n={},t={"Webdev Lessons":"webdev","Webdev Projects":"webdev-projects","AI Lessons":"ai"},i={};for(let e=0;e<Object.entries(t).length;e++){Object.entries(t)[e][0];var o=Object.entries(t)[e][1],r=(n[o]=[],0),a=0,l=await DB.getModuleCount(o),g=[];for(let t=0;t<l;t++){let e=await DB.getModuleData(o,t,0);var d=await DB.getModulePosition(o,t);n[o].push(d),e.currentUserPosition=d,g.push(e),r+=e.moduleLength}n[o]?(n[o].forEach(e=>{null!==e&&(a+=e)}),i[o]={totalPages:r,userPages:a,data:g}):i[o]={totalPages:r,userPages:0,data:g}}var c=[];Object.entries(i).forEach(([o,e])=>{e.data.forEach((e,i)=>{for(let t=0;t<e.moduleLength-1;t++)c.push(new Promise((n,e)=>{b.getModuleData(o,i,t).then(t=>{try{let{data:r,type:e}=t;if(window.tAppRequestInstance=s,"lesson"==e||"project"==e){if(null!=r.code_template&&(r.code=w(r.code_template)),"information"==r.type)A.setComponent(new m({},A),r);else if("multiple_choice"==r.type){let n=j([...r.answers]),i=[];for(let t=0;t<n.length;t++)i.push(r.answers.findIndex(e=>e===n[t]));let t=[];for(let e=0;e<i.length;e++)t.push(r.answers[i[e]]);let o=[];for(let e=0;e<i.length;e++)o.push(r.descriptions[i[e]]);if(r.answers=t,r.descriptions=o,Array.isArray(r.correct)){let e=[...r.correct];r.correct=[],e.forEach(t=>r.correct.push(i.findIndex(e=>e===t)))}else r.correct=i.findIndex(e=>e===r.correct);A.setComponent(new u({},A),r)}else"short_answer"==r.type?A.setComponent(new h({},A),r):"snippet_unlock"==r.type?A.setComponent(new f({},A),r):"congratulations"==r.type&&A.setComponent(new y({},A),r);A&&(p+=A.toString()),n()}}catch(e){n()}})}))})}),await Promise.all(c),await new Promise((e,t)=>{setTimeout(()=>{e()},500)}),console.log("Done"),tApp.render(p)}),tApp.route("#/404",function(e){tApp.render(`
			<h1>Error 404</h1>
			<p>Page not found.</p>
		`)}),tApp.route("#/403",function(e){tApp.render(`
			<h1>Error 403</h1>
			<p>Access denied.</p>
		`)});t=await b.getScore();document.querySelector("#score").innerHTML=`${t.points} XP, ${t.coins} Coins`,tApp.start().then(()=>{"development"!==window.environment&&tApp.install().then(()=>{tApp.update()})})})();