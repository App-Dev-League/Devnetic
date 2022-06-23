function recurseEjs(n,o={}){return new Promise(async(e,t)=>{o.include=async function(e){let t=await tApp.get(e);return recurseEjs(await t.text(),o)},e(await ejs.render(n,o,{async:!0}))})}function confirmRedoLesson(){return new Promise((e,t)=>{let n=document.getElementById("snippets-modal"),o=n.cloneNode(!0),r=(o.removeAttribute("id"),o.classList.remove("none"),o.querySelector("h3").innerHTML="You have already completed this module!",o.querySelector("h3").style.fontSize="1.5em",o.querySelector(".button-correct").innerHTML="Redo Module",o.querySelector(".button-correct").cloneNode());r.innerHTML="Next Module",r.style.marginLeft="10px",r.style.backgroundColor="var(--blue-selected)",o.querySelector(".button-correct").parentNode.appendChild(r),o.querySelector("span").onclick=function(){e("stay"),o.parentNode.removeChild(o)},o.querySelector(".button-correct").onclick=async function(){o.parentElement.removeChild(o),e(!0)},r.onclick=function(){o.parentElement.removeChild(o),e(!1)},document.body.appendChild(o)})}(async()=>{await installAll(["CodeEditor.js","CodePreview.js","Congratulations.js","Editor.js","ExplanationModal.js","Information.js","Input.js","Instructions.js","ModuleComponent.js","ModulePage.js","MultipleChoice.js","MultipleChoiceOption.js","ShortAnswer.js","SnippetsPanel.js","SnippetUnlock.js","TabbedView.js","codeBlock.js","PluginPanel.js","PreviewStandalone.js"],{path:"./components/"},newFileCallback),await installAll(["codeBlocks.js","codeEditor.js","codeTemplateToCode.js","compileSnippet.js","doesFileExist.js","Database.js","plugins.js","shuffleArray.js","renderElement.js"],{path:"./utils/"},newFileCallback),await install("./assets/libraries/ejs.js");const e=require("./components/ModulePage.js"),m=require("./components/Information.js"),h=require("./components/MultipleChoice.js"),y=require("./components/ShortAnswer.js"),w=require("./components/SnippetUnlock.js"),f=require("./components/Congratulations.js"),c=require("./components/CodeEditor.js"),a=require("./components/PreviewStandalone.js"),g=require("./utils/codeTemplateToCode.js"),j=require("./utils/shuffleArray.js"),A=require("./utils/Database.js");require("./utils/plugins.js"),require("./assets/libraries/ejs.js");var t={target:document.querySelector("tapp-main"),ignoreRoutes:[],forbiddenRoutes:[],errorPages:{notFound:"#/404",forbidden:"#/403"},caching:{backgroundPages:["/assets/fonts/codicon.ttf","/assets/fonts/Nunito/Nunito-Black.ttf","/assets/fonts/Nunito/Nunito-BlackItalic.ttf","/assets/fonts/Nunito/Nunito-Bold.woff2","/assets/fonts/Nunito/Nunito-BoldItalic.ttf","/assets/fonts/Nunito/Nunito-ExtraBold.woff2","/assets/fonts/Nunito/Nunito-ExtraBoldItalic.ttf","/assets/fonts/Nunito/Nunito-ExtraLight.ttf","/assets/fonts/Nunito/Nunito-ExtraLightItalic.ttf","/assets/fonts/Nunito/Nunito-Italic.ttf","/assets/fonts/Nunito/Nunito-Light.ttf","/assets/fonts/Nunito/Nunito-LightItalic.ttf","/assets/fonts/Nunito/Nunito-Regular.woff2","/assets/fonts/Nunito/Nunito-SemiBold.woff2","/assets/fonts/Nunito/Nunito-SemiBoldItalic.ttf","/assets/fonts/Nunito/OFL.txt","/assets/html/code-editor.html","/assets/html/preview-editor.html","/assets/img/icon.png","/assets/img/screenshot.png","/assets/libraries/bootstrap/bootstrap.bundle.min.js","/assets/libraries/bootstrap/bootstrap.min.css","/assets/libraries/ejs.js","/assets/libraries/highlightjs/atom-one-dark.css","/assets/libraries/highlightjs/highlight.min.js","/assets/libraries/jquery.min.js","/assets/libraries/monaco-editor/vs/base/browser/ui/codicons/codicon/codicon.ttf","/assets/libraries/monaco-editor/vs/base/worker/workerMain.js","/assets/libraries/monaco-editor/vs/basic-languages/abap/abap.js","/assets/libraries/monaco-editor/vs/basic-languages/apex/apex.js","/assets/libraries/monaco-editor/vs/basic-languages/azcli/azcli.js","/assets/libraries/monaco-editor/vs/basic-languages/bat/bat.js","/assets/libraries/monaco-editor/vs/basic-languages/bicep/bicep.js","/assets/libraries/monaco-editor/vs/basic-languages/cameligo/cameligo.js","/assets/libraries/monaco-editor/vs/basic-languages/clojure/clojure.js","/assets/libraries/monaco-editor/vs/basic-languages/coffee/coffee.js","/assets/libraries/monaco-editor/vs/basic-languages/cpp/cpp.js","/assets/libraries/monaco-editor/vs/basic-languages/csharp/csharp.js","/assets/libraries/monaco-editor/vs/basic-languages/csp/csp.js","/assets/libraries/monaco-editor/vs/basic-languages/css/css.js","/assets/libraries/monaco-editor/vs/basic-languages/dart/dart.js","/assets/libraries/monaco-editor/vs/basic-languages/dockerfile/dockerfile.js","/assets/libraries/monaco-editor/vs/basic-languages/ecl/ecl.js","/assets/libraries/monaco-editor/vs/basic-languages/elixir/elixir.js","/assets/libraries/monaco-editor/vs/basic-languages/flow9/flow9.js","/assets/libraries/monaco-editor/vs/basic-languages/fsharp/fsharp.js","/assets/libraries/monaco-editor/vs/basic-languages/go/go.js","/assets/libraries/monaco-editor/vs/basic-languages/graphql/graphql.js","/assets/libraries/monaco-editor/vs/basic-languages/handlebars/handlebars.js","/assets/libraries/monaco-editor/vs/basic-languages/hcl/hcl.js","/assets/libraries/monaco-editor/vs/basic-languages/html/html.js","/assets/libraries/monaco-editor/vs/basic-languages/ini/ini.js","/assets/libraries/monaco-editor/vs/basic-languages/java/java.js","/assets/libraries/monaco-editor/vs/basic-languages/javascript/javascript.js","/assets/libraries/monaco-editor/vs/basic-languages/julia/julia.js","/assets/libraries/monaco-editor/vs/basic-languages/kotlin/kotlin.js","/assets/libraries/monaco-editor/vs/basic-languages/less/less.js","/assets/libraries/monaco-editor/vs/basic-languages/lexon/lexon.js","/assets/libraries/monaco-editor/vs/basic-languages/liquid/liquid.js","/assets/libraries/monaco-editor/vs/basic-languages/lua/lua.js","/assets/libraries/monaco-editor/vs/basic-languages/m3/m3.js","/assets/libraries/monaco-editor/vs/basic-languages/markdown/markdown.js","/assets/libraries/monaco-editor/vs/basic-languages/mips/mips.js","/assets/libraries/monaco-editor/vs/basic-languages/msdax/msdax.js","/assets/libraries/monaco-editor/vs/basic-languages/mysql/mysql.js","/assets/libraries/monaco-editor/vs/basic-languages/objective-c/objective-c.js","/assets/libraries/monaco-editor/vs/basic-languages/pascal/pascal.js","/assets/libraries/monaco-editor/vs/basic-languages/pascaligo/pascaligo.js","/assets/libraries/monaco-editor/vs/basic-languages/perl/perl.js","/assets/libraries/monaco-editor/vs/basic-languages/pgsql/pgsql.js","/assets/libraries/monaco-editor/vs/basic-languages/php/php.js","/assets/libraries/monaco-editor/vs/basic-languages/postiats/postiats.js","/assets/libraries/monaco-editor/vs/basic-languages/powerquery/powerquery.js","/assets/libraries/monaco-editor/vs/basic-languages/powershell/powershell.js","/assets/libraries/monaco-editor/vs/basic-languages/protobuf/protobuf.js","/assets/libraries/monaco-editor/vs/basic-languages/pug/pug.js","/assets/libraries/monaco-editor/vs/basic-languages/python/python.js","/assets/libraries/monaco-editor/vs/basic-languages/qsharp/qsharp.js","/assets/libraries/monaco-editor/vs/basic-languages/r/r.js","/assets/libraries/monaco-editor/vs/basic-languages/razor/razor.js","/assets/libraries/monaco-editor/vs/basic-languages/redis/redis.js","/assets/libraries/monaco-editor/vs/basic-languages/redshift/redshift.js","/assets/libraries/monaco-editor/vs/basic-languages/restructuredtext/restructuredtext.js","/assets/libraries/monaco-editor/vs/basic-languages/ruby/ruby.js","/assets/libraries/monaco-editor/vs/basic-languages/rust/rust.js","/assets/libraries/monaco-editor/vs/basic-languages/sb/sb.js","/assets/libraries/monaco-editor/vs/basic-languages/scala/scala.js","/assets/libraries/monaco-editor/vs/basic-languages/scheme/scheme.js","/assets/libraries/monaco-editor/vs/basic-languages/scss/scss.js","/assets/libraries/monaco-editor/vs/basic-languages/shell/shell.js","/assets/libraries/monaco-editor/vs/basic-languages/solidity/solidity.js","/assets/libraries/monaco-editor/vs/basic-languages/sophia/sophia.js","/assets/libraries/monaco-editor/vs/basic-languages/sparql/sparql.js","/assets/libraries/monaco-editor/vs/basic-languages/sql/sql.js","/assets/libraries/monaco-editor/vs/basic-languages/st/st.js","/assets/libraries/monaco-editor/vs/basic-languages/swift/swift.js","/assets/libraries/monaco-editor/vs/basic-languages/systemverilog/systemverilog.js","/assets/libraries/monaco-editor/vs/basic-languages/tcl/tcl.js","/assets/libraries/monaco-editor/vs/basic-languages/twig/twig.js","/assets/libraries/monaco-editor/vs/basic-languages/typescript/typescript.js","/assets/libraries/monaco-editor/vs/basic-languages/vb/vb.js","/assets/libraries/monaco-editor/vs/basic-languages/xml/xml.js","/assets/libraries/monaco-editor/vs/basic-languages/yaml/yaml.js","/assets/libraries/monaco-editor/vs/editor/editor.main.css","/assets/libraries/monaco-editor/vs/editor/editor.main.js","/assets/libraries/monaco-editor/vs/editor/editor.main.nls.de.js","/assets/libraries/monaco-editor/vs/editor/editor.main.nls.es.js","/assets/libraries/monaco-editor/vs/editor/editor.main.nls.fr.js","/assets/libraries/monaco-editor/vs/editor/editor.main.nls.it.js","/assets/libraries/monaco-editor/vs/editor/editor.main.nls.ja.js","/assets/libraries/monaco-editor/vs/editor/editor.main.nls.js","/assets/libraries/monaco-editor/vs/editor/editor.main.nls.ko.js","/assets/libraries/monaco-editor/vs/editor/editor.main.nls.ru.js","/assets/libraries/monaco-editor/vs/editor/editor.main.nls.zh-cn.js","/assets/libraries/monaco-editor/vs/editor/editor.main.nls.zh-tw.js","/assets/libraries/monaco-editor/vs/language/css/cssMode.js","/assets/libraries/monaco-editor/vs/language/css/cssWorker.js","/assets/libraries/monaco-editor/vs/language/html/htmlMode.js","/assets/libraries/monaco-editor/vs/language/html/htmlWorker.js","/assets/libraries/monaco-editor/vs/language/json/jsonMode.js","/assets/libraries/monaco-editor/vs/language/json/jsonWorker.js","/assets/libraries/monaco-editor/vs/language/typescript/tsMode.js","/assets/libraries/monaco-editor/vs/language/typescript/tsWorker.js","/assets/libraries/monaco-editor/vs/loader.js","/assets/plugins/betterEditor/betterEditor.png","/assets/plugins/betterEditor/VERSION.txt","/assets/plugins/brython/brython.svg","/assets/plugins/brython/modules/.gitkeep","/assets/plugins/brython/VERSION.txt","/assets/plugins/captCC/captCC.svg","/assets/plugins/captCC/VERSION.txt","/assets/plugins/hexy/logo.png","/assets/plugins/hexy/VERSION.txt","/assets/plugins/jscpp/jscpp.svg","/assets/plugins/jscpp/VERSION.txt","/assets/plugins/react/react.svg","/assets/plugins/react/VERSION.txt","/assets/plugins/showdown/markdown-logo.png","/assets/plugins/showdown/VERSION.txt","/assets/plugins/sizes.json","/assets/plugins/typescript/typescript.svg","/assets/plugins/typescript/VERSION.txt","/assets/plugins/webperl/VERSION.txt","/assets/plugins/webperl/webperl.png","/assets/stylesheets/lighttheme.css","/CNAME","/components/codeBlock.js","/components/CodeEditor.js","/components/CodePreview.js","/components/Congratulations.js","/components/Editor.js","/components/ExplanationModal.js","/components/Information.js","/components/Input.js","/components/Instructions.js","/components/ModuleComponent.js","/components/ModulePage.js","/components/MultipleChoice.js","/components/MultipleChoiceOption.js","/components/PluginPanel.js","/components/PreviewStandalone.js","/components/ShortAnswer.js","/components/SnippetsPanel.js","/components/SnippetUnlock.js","/components/TabbedView.js","/config.js","/data/modules/ai/0.json","/data/modules/ai/1.json","/data/modules/ai/2.json","/data/modules/ai/3.json","/data/modules/ai/4.json","/data/modules/ai/5.json","/data/modules/ai/6.json","/data/modules/ai/7.json","/data/modules/ai-assets/img0/.gitkeep","/data/modules/ai-assets/img0/0-0.png","/data/modules/ai-assets/img0/1-0.png","/data/modules/ai-assets/img1/.gitkeep","/data/modules/ai-assets/img1/0-1.png","/data/modules/ai-assets/img1/1-1.png","/data/modules/ai-assets/img2/.gitkeep","/data/modules/ai-assets/img2/0-2.png","/data/modules/ai-assets/img2/1-2.png","/data/modules/ai-assets/img2/2-2.png","/data/modules/ai-assets/img2/3-2.png","/data/modules/ai-assets/img2/4-2.png","/data/modules/ai-assets/img2/5-2.PNG","/data/modules/ai-assets/img3/.gitkeep","/data/modules/ai-assets/img3/0-3.png","/data/modules/ai-assets/img4/.gitkeep","/data/modules/ai-assets/img4/0-0.png","/data/modules/ai-assets/img4/0-1.png","/data/modules/ai-assets/img4/1-0.png","/data/modules/ai-assets/img4/1-1.png","/data/modules/ai-assets/img4/2-0.png","/data/modules/ai-assets/img4/2-1.png","/data/modules/ai-assets/img4/2-2.png","/data/modules/ai-assets/img4/3-0.png","/data/modules/ai-assets/img4/3-1.png","/data/modules/ai-assets/img4/3-2.png","/data/modules/ai-assets/img5/.gitkeep","/data/modules/ai-assets/img5/0-0.png","/data/modules/ai-assets/img5/0-1.png","/data/modules/ai-assets/img5/0-2.png","/data/modules/ai-assets/img5/0-3.png","/data/modules/ai-assets/img5/0-4.png","/data/modules/ai-assets/img5/1-0.png","/data/modules/ai-assets/img5/1-1.png","/data/modules/ai-assets/img5/1-2.png","/data/modules/ai-assets/img5/1-3.png","/data/modules/ai-assets/img5/1-4.png","/data/modules/ai-assets/img5/1-5.png","/data/modules/ai-assets/img5/2-0.gif","/data/modules/ai-assets/img5/2-1.png","/data/modules/ai-assets/img5/2-2.png","/data/modules/ai-assets/img5/2-3.png","/data/modules/ai-assets/img5/3-0.png","/data/modules/ai-assets/img5/3-1.png","/data/modules/ai-assets/img5/3-2.png","/data/modules/ai-assets/img5/3-3.png","/data/modules/ai-assets/img5/3-4.png","/data/modules/ai-assets/img5/3-5.png","/data/modules/ai-assets/img6/.gitkeep","/data/modules/ai-assets/img6/0-0.png","/data/modules/ai-assets/img6/1-0.png","/data/modules/ai-assets/img6/2-0.png","/data/modules/ai-assets/img6/3-0.png","/data/modules/ai-assets/img6/4-0.png","/data/modules/ai-assets/img6/4-1.png","/data/modules/ai-assets/img6/5-0.png","/data/modules/ai-assets/img6/5-1.png","/data/modules/ai-assets/img6/6-0.png","/data/modules/ai-assets/img7/.gitkeep","/data/modules/ai-assets/img7/0-0.png","/data/modules/ai-assets/img7/0-1.png","/data/modules/ai-assets/img7/0-2.png","/data/modules/ai-assets/img7/0-3.png","/data/modules/ai-assets/img7/1-0.png","/data/modules/ai-assets/img7/1-1.png","/data/modules/ai-assets/img7/1-2.png","/data/modules/ai-assets/img7/1-3.png","/data/modules/ai-assets/img7/1-4.png","/data/modules/ai-assets/img7/1-5.png","/data/modules/ai-assets/img7/2-0.png","/data/modules/ai-assets/img7/3-0.png","/data/modules/ai-assets/img7/3-1.png","/data/modules/ai-assets/img7/3-2.png","/data/modules/ai-assets/img7/3-3.png","/data/modules/ai-assets/img7/4-0.png","/data/modules/ai-assets/img7/4-1.png","/data/modules/ai-assets/img7/4-2.png","/data/modules/ai-assets/img7/4-3.png","/data/modules/ai-assets/img7/4-4.png","/data/modules/ai-assets/img7/4-5.png","/data/modules/ai-assets/img7/4-6.png","/data/modules/ai-assets/img7/4-7.png","/data/modules/intro-to-cs/0.json","/data/modules/intro-to-cs/1.json","/data/modules/intro-to-cs-assets/img0/0-0.png","/data/modules/webdev/0-example.json","/data/modules/webdev/0.json","/data/modules/webdev/1-example.json","/data/modules/webdev/1.json","/data/modules/webdev/2.json","/data/modules/webdev/3.json","/data/modules/webdev/4.json","/data/modules/webdev/5.json","/data/modules/webdev/6.json","/data/modules/webdev/7.json","/data/modules/webdev-assets/img0/0-0.png","/data/modules/webdev-assets/img0/1-0.png","/data/modules/webdev-assets/img0/2-0.png","/data/modules/webdev-assets/img0/2-1.png","/data/modules/webdev-assets/img0/2-2.png","/data/modules/webdev-assets/img0/2-3.png","/data/modules/webdev-assets/img0/4-0.png","/data/modules/webdev-assets/img0/4-1.html","/data/modules/webdev-assets/img0/8-0.png","/data/modules/webdev-assets/img0/8-1.html","/data/modules/webdev-assets/img0/8-2.html","/data/modules/webdev-assets/img1/0-0.png","/data/modules/webdev-assets/img1/3-0.png","/data/modules/webdev-assets/img1/5-0.png","/data/modules/webdev-assets/img1/5-1.png","/data/modules/webdev-assets/img1/5-2.png","/data/modules/webdev-assets/img1/6-0.png","/data/modules/webdev-assets/img1/7-0.png","/data/modules/webdev-assets/img1/8-0.png","/data/modules/webdev-assets/img3/bootstrap-example.html","/data/modules/webdev-assets/img4/1-0.png","/data/modules/webdev-assets/img5/0-0.png","/data/modules/webdev-assets/img5/1-0.png","/data/modules/webdev-assets/img5/1-1.png","/data/modules/webdev-assets/img5/2-0.png","/data/modules/webdev-assets/img5/2-1.png","/data/modules/webdev-assets/img5/4-0.png","/data/modules/webdev-assets/img5/4-1.png","/data/modules/webdev-assets/img5/5-0.png","/data/modules/webdev-assets/img5/5-1.png","/data/modules/webdev-assets/img5/5-2.png","/data/modules/webdev-assets/img5/6-0.png","/data/modules/webdev-assets/img5/6-1.png","/data/modules/webdev-assets/img5/7-0.png","/data/modules/webdev-assets/img5/7-1.gif","/data/modules/webdev-assets/img6/0-0.png","/data/modules/webdev-assets/img6/0-1.png","/data/modules/webdev-assets/img6/0-2.png","/data/modules/webdev-assets/img6/1-0.png","/data/modules/webdev-assets/img6/2-0.png","/data/modules/webdev-assets/img6/2-1.png","/data/modules/webdev-assets/img6/3-0.png","/data/modules/webdev-assets/img6/3-1.png","/data/modules/webdev-assets/img6/3-2.png","/data/modules/webdev-assets/img6/4-0.png","/data/modules/webdev-assets/img6/5-0.png","/data/modules/webdev-assets/img7/0-0.png","/data/modules/webdev-assets/img7/1-0.png","/data/modules/webdev-assets/img7/2-0.png","/data/modules/webdev-assets/img7/3-0.png","/data/modules/webdev-assets/img7/4-0.png","/data/modules/webdev-assets/img7/5-0.png","/data/modules/webdev-projects/0.json","/data/modules/webdev-projects/1.json","/data/modules/webdev-projects/2.json","/data/modules/webdev-projects/3.json","/data/modules/webdev-projects/4.json","/data/modules/webdev-projects/5.json","/data/modules/webdev-projects/6.json","/data/modules/webdev-projects/7.json","/data/modules/webdev-projects-assets/img0/0-0.png","/data/modules/webdev-projects-assets/img0/1-0.png","/data/modules/webdev-projects-assets/img0/2-0.png","/data/modules/webdev-projects-assets/img0/3-0.png","/data/modules/webdev-projects-assets/img1/0-0.png","/data/modules/webdev-projects-assets/img3/0-0.png","/data/modules/webdev-projects-assets/img3/1-0.png","/data/modules/webdev-projects-assets/img4/0-0.png","/data/modules/webdev-projects-assets/img5/0-0.png","/data/modules/webdev-projects-assets/img5/1-0.png","/data/modules/webdev-projects-assets/img9/0-0.png","/data/modules/webdev-projects-assets/img9/1-0.png","/data/modules/webdev-projects-assets/img9/2-0.png","/data/modules/webdev-projects-assets/img9/3-0.png","/data/module_index.json","/index.html","/manifest.json","/require-browser.js","/tApp-service-worker.js","/tApp.js","/utils/codeBlocks.js","/utils/codeEditor.js","/utils/codeTemplateToCode.js","/utils/compileSnippet.js","/utils/Database.js","/utils/doesFileExist.js","/utils/plugins.js","/utils/renderElement.js","/utils/shuffleArray.js","/views/ai.html","/views/index.html","/views/intro-to-cs.html","/views/menu.html","/views/my-projects.html","/views/webdev-projects.html","/views/webdev.html"],persistent:!0}};"development"==window.environment&&(t.cachingConfig=null),tApp.configure(t),tApp.route("/",function(e){tApp.redirect("#/")}),tApp.route("#/",function(e){tApp.get("./views/index.html").then(e=>e.text()).then(async e=>{e=await recurseEjs(e);tApp.render(e)})}),tApp.route("#/track/<track>",function(e){tApp.get(`./views/${e.data.track}.html`).then(e=>e.text()).then(async e=>{e=await recurseEjs(e);tApp.render(e)}).catch(e=>{console.log(e),tApp.renderPath("#/404")})}),tApp.route("#/my-projects",function(e){tApp.get("./views/my-projects.html").then(e=>e.text()).then(async e=>{e=await recurseEjs(e,{myProjectsPage:!0});tApp.render(e)})}),tApp.route("#/learn/<track>/<module>/",async function(e){tApp.redirect(`#/learn/${e.data.track}/${e.data.module}/${await A.getModulePosition(e.data.track,e.data.module)}/`)}),window.DB=A;let b=new e({Database:A});tApp.route("#/preview/<track>/<module>/<position>/<fileIndex>",async function(r){async function t(e,t=!1){let{data:n,moduleData:o}=e;window.tAppRequestInstance=r,window.currentModuleData=o,n.isUserProject=t,n.previewIndex=r.data.fileIndex,b.setComponent(new a({},b),n)}r.data.module=parseInt(r.data.module),r.data.position=parseInt(r.data.position),r.data.fileIndex=parseInt(r.data.fileIndex),b.state.track=r.data.track,b.state.module=r.data.module,b.state.position=r.data.position,"customUserProjects"===r.data.track?t({type:"project",moduleLength:1,next:{hasNext:!0,module:r.data.module,position:1},data:{type:"code_editor",storage_id:[],files:[],default:[],display_type:"web",elements:[],hints:[],validation:[],points:0,coins:0}},!0):A.getModuleData(r.data.track,r.data.module,r.data.position).then(async e=>{t(e)}).catch(e=>{console.log(e),tApp.renderPath("#/404")}),tApp.render(b.toString())}),tApp.route("#/learn/<track>/<module>/<position>",function(l){async function t(e,t=!1){let{data:a,type:n,moduleLength:o,next:r,moduleData:s}=e,i=(document.getElementById("module-progress-bar").style.width=l.data.position/o*100+"%",window.tAppRequestInstance=l,window.currentModuleData=s,0);if(document.querySelectorAll(".module-progress-bar-timeline-element").forEach(e=>{e.classList.contains("template")||e.parentElement.removeChild(e)}),t||window.currentModuleData.pages.forEach(e=>{let t=document.getElementById("module-progress-bar-wrapper"),n=t.querySelector(".template"),o=n.cloneNode(!0);o.classList.remove("template"),o.style.left=i/window.currentModuleData.pages.length*100+"%",l.data.position>i?o.classList.add("filled"):o.classList.remove("filled"),"information"===e.type&&(o.querySelector(".name").innerText=e.title||"",o.querySelector(".descriptor").innerHTML="<b>Type: </b>Learn"),"multiple_choice"===e.type&&(o.querySelector(".name").innerText=e.question.slice(0,10)+"..."||"",o.querySelector(".descriptor").innerHTML="<b>Type: </b>Question"),"snippet_unlock"===e.type&&(o.querySelector(".name").innerText=e.name.slice(0,10)+"..."||"",o.querySelector(".descriptor").innerHTML="<b>Type: </b>Snippet"),"short_answer"===e.type&&(o.querySelector(".name").innerText=e.question.slice(0,10)+"..."||"",o.querySelector(".descriptor").innerHTML="<b>Type: </b>Question"),"congratulations"===e.type&&(o.querySelector(".name").innerText="Lesson summary",o.querySelector(".descriptor").innerHTML="<b>Type: </b>Summary"),"code_editor"===e.type&&(o.querySelector(".name").innerText=e.elements[0].content.replaceAll("[[h3]]","").replaceAll("[[/]]",""),o.querySelector(".descriptor").innerHTML="<b>Type: </b>Project"),i++,t.appendChild(o)}),l.data.position>=o)return!0===(e=await confirmRedoLesson())?tApp.redirect(`#/learn/${l.data.track}/${l.data.module}/0`):"stay"===e?tApp.redirect("#/track/"+l.data.track):void(r.hasNext?tApp.redirect(`#/learn/${l.data.track}/${r.module}/`+r.position):tApp.redirect("#/"));if("lesson"==n||"project"==n){if(null!=a.code_template&&(a.code=g(a.code_template)),r.hasNext?b.state.next=`#/learn/${l.data.track}/${r.module}/`+r.position:b.state.next="#/",b.state.track=l.data.track,b.state.module=l.data.module,b.state.position=l.data.position,"information"==a.type)b.setComponent(new m({},b),a);else if("multiple_choice"==a.type){let n=j([...a.answers]),o=[];for(let t=0;t<n.length;t++)o.push(a.answers.findIndex(e=>e===n[t]));let t=[];for(let e=0;e<o.length;e++)t.push(a.answers[o[e]]);let r=[];for(let e=0;e<o.length;e++)r.push(a.descriptions[o[e]]);if(a.answers=t,a.descriptions=r,Array.isArray(a.correct)){let e=[...a.correct];a.correct=[],e.forEach(t=>a.correct.push(o.findIndex(e=>e===t)))}else a.correct=o.findIndex(e=>e===a.correct);b.setComponent(new h({},b),a)}else"short_answer"==a.type?b.setComponent(new y({},b),a):"snippet_unlock"==a.type?b.setComponent(new w({},b),a):"congratulations"==a.type?b.setComponent(new f({},b),a):"code_editor"==a.type&&(a.isUserProject=t,b.setComponent(new c({},b),a));tApp.render(b.toString())}else tApp.renderPath("#/404"),console.error("Unknown type "+n)}l.data.module=parseInt(l.data.module),l.data.position=parseInt(l.data.position),"customUserProjects"===l.data.track?t({type:"project",moduleLength:1,next:{hasNext:!0,module:l.data.module,position:1},data:{type:"code_editor",storage_id:[],files:[],default:[],display_type:"web",elements:[],hints:[],validation:[],points:0,coins:0}},!0):A.getModuleData(l.data.track,l.data.module,l.data.position).then(async e=>{t(e)}).catch(e=>{console.log(e),tApp.renderPath("#/404")})}),tApp.route("#/DEV-SHOW-ALL",async function(s){var i="",n={},t={"Webdev Lessons":"webdev","Webdev Projects":"webdev-projects","AI Lessons":"ai"},o={};for(let e=0;e<Object.entries(t).length;e++){Object.entries(t)[e][0];var r=Object.entries(t)[e][1],a=(n[r]=[],0),l=0,c=await DB.getModuleCount(r),p=[];for(let t=0;t<c;t++){let e=await DB.getModuleData(r,t,0);var d=await DB.getModulePosition(r,t);n[r].push(d),e.currentUserPosition=d,p.push(e),a+=e.moduleLength}n[r]?(n[r].forEach(e=>{null!==e&&(l+=e)}),o[r]={totalPages:a,userPages:l,data:p}):o[r]={totalPages:a,userPages:0,data:p}}var u=[];Object.entries(o).forEach(([r,e])=>{e.data.forEach((e,o)=>{for(let t=0;t<e.moduleLength-1;t++)u.push(new Promise((n,e)=>{A.getModuleData(r,o,t).then(t=>{try{let{data:a,type:e}=t;if(window.tAppRequestInstance=s,"lesson"==e||"project"==e){if(null!=a.code_template&&(a.code=g(a.code_template)),"information"==a.type)b.setComponent(new m({},b),a);else if("multiple_choice"==a.type){let n=j([...a.answers]),o=[];for(let t=0;t<n.length;t++)o.push(a.answers.findIndex(e=>e===n[t]));let t=[];for(let e=0;e<o.length;e++)t.push(a.answers[o[e]]);let r=[];for(let e=0;e<o.length;e++)r.push(a.descriptions[o[e]]);if(a.answers=t,a.descriptions=r,Array.isArray(a.correct)){let e=[...a.correct];a.correct=[],e.forEach(t=>a.correct.push(o.findIndex(e=>e===t)))}else a.correct=o.findIndex(e=>e===a.correct);b.setComponent(new h({},b),a)}else"short_answer"==a.type?b.setComponent(new y({},b),a):"snippet_unlock"==a.type?b.setComponent(new w({},b),a):"congratulations"==a.type&&b.setComponent(new f({},b),a);b&&(i+=b.toString()),n()}}catch(e){n()}})}))})}),await Promise.all(u),await new Promise((e,t)=>{setTimeout(()=>{e()},500)}),console.log("Done"),tApp.render(i)}),tApp.route("#/404",function(e){tApp.render(`
			<h1>Error 404</h1>
			<p>Page not found.</p>
		`)}),tApp.route("#/403",function(e){tApp.render(`
			<h1>Error 403</h1>
			<p>Access denied.</p>
		`)});t=await A.getScore();document.querySelector("#score").innerHTML=`${t.points} XP, ${t.coins} Coins`,tApp.start().then(()=>{"development"!==window.environment&&(checkIfNewerVersion(),tApp.install().then(()=>{tApp.update()}))})})();let redirectFunction=tApp.redirect;tApp.redirect=function(e,t){redirectFunction(e,t),onWindowHashChange()};