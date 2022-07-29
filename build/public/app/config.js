function recurseEjs(o,n={}){return new Promise(async(e,t)=>{n.include=async function(e){let t=await tApp.get(e);return recurseEjs(await t.text(),n)},e(await ejs.render(o,n,{async:!0}))})}function confirmRedoLesson(o){return new Promise((e,t)=>{o.show("You have already completed this lesson!","Are you sure you want to redo this lesson! If you choose to, your progress won't change even if you don't finish it!",[{type:"button",text:"Redo Module",onclick:function(){e(!0)}},{type:"button",text:"Next Module",onclick:function(){e(!1)}},{type:"cancel",onclick:function(){e("stay")}}])})}(async()=>{await installAll(["CodeEditor.js","CodePreview.js","Congratulations.js","Editor.js","ExplanationModal.js","Information.js","Input.js","Instructions.js","ModuleComponent.js","ModulePage.js","MultipleChoice.js","MultipleChoiceOption.js","ShortAnswer.js","SnippetsPanel.js","SnippetUnlock.js","TabbedView.js","codeBlock.js","PluginPanel.js","PreviewStandalone.js","EmbededMultipleChoice.js"],{path:"./components/"},newFileCallback),await installAll(["codeBlocks.js","codeEditor.js","codeTemplateToCode.js","compileSnippet.js","doesFileExist.js","Database.js","plugins.js","shuffleArray.js","renderElement.js","modal.js","window.js"],{path:"./utils/"},newFileCallback),await install("./assets/libraries/ejs.js");const e=require("./components/ModulePage.js"),m=require("./components/Information.js"),w=require("./components/MultipleChoice.js"),h=require("./components/ShortAnswer.js"),f=require("./components/SnippetUnlock.js"),j=require("./components/Congratulations.js"),d=require("./components/CodeEditor.js"),r=require("./components/PreviewStandalone.js"),g=require("./utils/codeTemplateToCode.js"),y=require("./utils/shuffleArray.js"),A=require("./utils/Database.js"),l=(require("./utils/plugins.js"),require("./utils/modal.js"));require("./assets/libraries/ejs.js");var t={target:document.querySelector("tapp-main"),ignoreRoutes:[],forbiddenRoutes:[],errorPages:{notFound:"#/404",forbidden:"#/403"},caching:{backgroundPages:[],persistent:!0}};window.filesToCache=["/app/UPDATE_FILE_MAP.json","/app/assets/fonts/Inter/inter-ext.woff2","/app/assets/fonts/Inter/inter.css","/app/assets/fonts/Inter/inter.woff2","/app/assets/fonts/Lato/100-italic.woff2","/app/assets/fonts/Lato/100-normal.woff2","/app/assets/fonts/Lato/300-italic.woff2","/app/assets/fonts/Lato/300-normal.woff2","/app/assets/fonts/Lato/400-italic.woff2","/app/assets/fonts/Lato/400-normal.woff2","/app/assets/fonts/Lato/700-italic.woff2","/app/assets/fonts/Lato/700-normal.woff2","/app/assets/fonts/Lato/900-italic.woff2","/app/assets/fonts/Lato/900-normal.woff2","/app/assets/fonts/Lato/lato.css","/app/assets/fonts/Nunito/Nunito-Black.ttf","/app/assets/fonts/Nunito/Nunito-BlackItalic.ttf","/app/assets/fonts/Nunito/Nunito-Bold.woff2","/app/assets/fonts/Nunito/Nunito-BoldItalic.ttf","/app/assets/fonts/Nunito/Nunito-ExtraBold.woff2","/app/assets/fonts/Nunito/Nunito-ExtraBoldItalic.ttf","/app/assets/fonts/Nunito/Nunito-ExtraLight.ttf","/app/assets/fonts/Nunito/Nunito-ExtraLightItalic.ttf","/app/assets/fonts/Nunito/Nunito-Italic.ttf","/app/assets/fonts/Nunito/Nunito-Light.ttf","/app/assets/fonts/Nunito/Nunito-LightItalic.ttf","/app/assets/fonts/Nunito/Nunito-Regular.woff2","/app/assets/fonts/Nunito/Nunito-SemiBold.woff2","/app/assets/fonts/Nunito/Nunito-SemiBoldItalic.ttf","/app/assets/fonts/Nunito/OFL.txt","/app/assets/fonts/codicon.ttf","/app/assets/fonts/font-awesome/css/all.css","/app/assets/fonts/font-awesome/webfonts/fa-brands-400.ttf","/app/assets/fonts/font-awesome/webfonts/fa-brands-400.woff2","/app/assets/fonts/font-awesome/webfonts/fa-regular-400.ttf","/app/assets/fonts/font-awesome/webfonts/fa-regular-400.woff2","/app/assets/fonts/font-awesome/webfonts/fa-solid-900.ttf","/app/assets/fonts/font-awesome/webfonts/fa-solid-900.woff2","/app/assets/fonts/font-awesome/webfonts/fa-v4compatibility.ttf","/app/assets/fonts/font-awesome/webfonts/fa-v4compatibility.woff2","/app/assets/html/code-editor.html","/app/assets/html/preview-editor.html","/app/assets/img/icon.png","/app/assets/img/screenshot.png","/app/assets/libraries/bootstrap/bootstrap.bundle.min.js","/app/assets/libraries/bootstrap/bootstrap.min.css","/app/assets/libraries/confeti.js","/app/assets/libraries/ejs.js","/app/assets/libraries/highlightjs/atom-one-dark.css","/app/assets/libraries/highlightjs/highlight.min.js","/app/assets/libraries/interact.js","/app/assets/libraries/jquery.min.js","/app/assets/libraries/monaco-editor/vs/base/browser/ui/codicons/codicon/codicon.ttf","/app/assets/libraries/monaco-editor/vs/base/worker/workerMain.js","/app/assets/libraries/monaco-editor/vs/basic-languages/abap/abap.js","/app/assets/libraries/monaco-editor/vs/basic-languages/apex/apex.js","/app/assets/libraries/monaco-editor/vs/basic-languages/azcli/azcli.js","/app/assets/libraries/monaco-editor/vs/basic-languages/bat/bat.js","/app/assets/libraries/monaco-editor/vs/basic-languages/bicep/bicep.js","/app/assets/libraries/monaco-editor/vs/basic-languages/cameligo/cameligo.js","/app/assets/libraries/monaco-editor/vs/basic-languages/clojure/clojure.js","/app/assets/libraries/monaco-editor/vs/basic-languages/coffee/coffee.js","/app/assets/libraries/monaco-editor/vs/basic-languages/cpp/cpp.js","/app/assets/libraries/monaco-editor/vs/basic-languages/csharp/csharp.js","/app/assets/libraries/monaco-editor/vs/basic-languages/csp/csp.js","/app/assets/libraries/monaco-editor/vs/basic-languages/css/css.js","/app/assets/libraries/monaco-editor/vs/basic-languages/dart/dart.js","/app/assets/libraries/monaco-editor/vs/basic-languages/dockerfile/dockerfile.js","/app/assets/libraries/monaco-editor/vs/basic-languages/ecl/ecl.js","/app/assets/libraries/monaco-editor/vs/basic-languages/elixir/elixir.js","/app/assets/libraries/monaco-editor/vs/basic-languages/flow9/flow9.js","/app/assets/libraries/monaco-editor/vs/basic-languages/fsharp/fsharp.js","/app/assets/libraries/monaco-editor/vs/basic-languages/go/go.js","/app/assets/libraries/monaco-editor/vs/basic-languages/graphql/graphql.js","/app/assets/libraries/monaco-editor/vs/basic-languages/handlebars/handlebars.js","/app/assets/libraries/monaco-editor/vs/basic-languages/hcl/hcl.js","/app/assets/libraries/monaco-editor/vs/basic-languages/html/html.js","/app/assets/libraries/monaco-editor/vs/basic-languages/ini/ini.js","/app/assets/libraries/monaco-editor/vs/basic-languages/java/java.js","/app/assets/libraries/monaco-editor/vs/basic-languages/javascript/javascript.js","/app/assets/libraries/monaco-editor/vs/basic-languages/julia/julia.js","/app/assets/libraries/monaco-editor/vs/basic-languages/kotlin/kotlin.js","/app/assets/libraries/monaco-editor/vs/basic-languages/less/less.js","/app/assets/libraries/monaco-editor/vs/basic-languages/lexon/lexon.js","/app/assets/libraries/monaco-editor/vs/basic-languages/liquid/liquid.js","/app/assets/libraries/monaco-editor/vs/basic-languages/lua/lua.js","/app/assets/libraries/monaco-editor/vs/basic-languages/m3/m3.js","/app/assets/libraries/monaco-editor/vs/basic-languages/markdown/markdown.js","/app/assets/libraries/monaco-editor/vs/basic-languages/mips/mips.js","/app/assets/libraries/monaco-editor/vs/basic-languages/msdax/msdax.js","/app/assets/libraries/monaco-editor/vs/basic-languages/mysql/mysql.js","/app/assets/libraries/monaco-editor/vs/basic-languages/objective-c/objective-c.js","/app/assets/libraries/monaco-editor/vs/basic-languages/pascal/pascal.js","/app/assets/libraries/monaco-editor/vs/basic-languages/pascaligo/pascaligo.js","/app/assets/libraries/monaco-editor/vs/basic-languages/perl/perl.js","/app/assets/libraries/monaco-editor/vs/basic-languages/pgsql/pgsql.js","/app/assets/libraries/monaco-editor/vs/basic-languages/php/php.js","/app/assets/libraries/monaco-editor/vs/basic-languages/postiats/postiats.js","/app/assets/libraries/monaco-editor/vs/basic-languages/powerquery/powerquery.js","/app/assets/libraries/monaco-editor/vs/basic-languages/powershell/powershell.js","/app/assets/libraries/monaco-editor/vs/basic-languages/protobuf/protobuf.js","/app/assets/libraries/monaco-editor/vs/basic-languages/pug/pug.js","/app/assets/libraries/monaco-editor/vs/basic-languages/python/python.js","/app/assets/libraries/monaco-editor/vs/basic-languages/qsharp/qsharp.js","/app/assets/libraries/monaco-editor/vs/basic-languages/r/r.js","/app/assets/libraries/monaco-editor/vs/basic-languages/razor/razor.js","/app/assets/libraries/monaco-editor/vs/basic-languages/redis/redis.js","/app/assets/libraries/monaco-editor/vs/basic-languages/redshift/redshift.js","/app/assets/libraries/monaco-editor/vs/basic-languages/restructuredtext/restructuredtext.js","/app/assets/libraries/monaco-editor/vs/basic-languages/ruby/ruby.js","/app/assets/libraries/monaco-editor/vs/basic-languages/rust/rust.js","/app/assets/libraries/monaco-editor/vs/basic-languages/sb/sb.js","/app/assets/libraries/monaco-editor/vs/basic-languages/scala/scala.js","/app/assets/libraries/monaco-editor/vs/basic-languages/scheme/scheme.js","/app/assets/libraries/monaco-editor/vs/basic-languages/scss/scss.js","/app/assets/libraries/monaco-editor/vs/basic-languages/shell/shell.js","/app/assets/libraries/monaco-editor/vs/basic-languages/solidity/solidity.js","/app/assets/libraries/monaco-editor/vs/basic-languages/sophia/sophia.js","/app/assets/libraries/monaco-editor/vs/basic-languages/sparql/sparql.js","/app/assets/libraries/monaco-editor/vs/basic-languages/sql/sql.js","/app/assets/libraries/monaco-editor/vs/basic-languages/st/st.js","/app/assets/libraries/monaco-editor/vs/basic-languages/swift/swift.js","/app/assets/libraries/monaco-editor/vs/basic-languages/systemverilog/systemverilog.js","/app/assets/libraries/monaco-editor/vs/basic-languages/tcl/tcl.js","/app/assets/libraries/monaco-editor/vs/basic-languages/twig/twig.js","/app/assets/libraries/monaco-editor/vs/basic-languages/typescript/typescript.js","/app/assets/libraries/monaco-editor/vs/basic-languages/vb/vb.js","/app/assets/libraries/monaco-editor/vs/basic-languages/xml/xml.js","/app/assets/libraries/monaco-editor/vs/basic-languages/yaml/yaml.js","/app/assets/libraries/monaco-editor/vs/editor/editor.main.css","/app/assets/libraries/monaco-editor/vs/editor/editor.main.js","/app/assets/libraries/monaco-editor/vs/editor/editor.main.nls.de.js","/app/assets/libraries/monaco-editor/vs/editor/editor.main.nls.es.js","/app/assets/libraries/monaco-editor/vs/editor/editor.main.nls.fr.js","/app/assets/libraries/monaco-editor/vs/editor/editor.main.nls.it.js","/app/assets/libraries/monaco-editor/vs/editor/editor.main.nls.ja.js","/app/assets/libraries/monaco-editor/vs/editor/editor.main.nls.js","/app/assets/libraries/monaco-editor/vs/editor/editor.main.nls.ko.js","/app/assets/libraries/monaco-editor/vs/editor/editor.main.nls.ru.js","/app/assets/libraries/monaco-editor/vs/editor/editor.main.nls.zh-cn.js","/app/assets/libraries/monaco-editor/vs/editor/editor.main.nls.zh-tw.js","/app/assets/libraries/monaco-editor/vs/language/css/cssMode.js","/app/assets/libraries/monaco-editor/vs/language/css/cssWorker.js","/app/assets/libraries/monaco-editor/vs/language/html/htmlMode.js","/app/assets/libraries/monaco-editor/vs/language/html/htmlWorker.js","/app/assets/libraries/monaco-editor/vs/language/json/jsonMode.js","/app/assets/libraries/monaco-editor/vs/language/json/jsonWorker.js","/app/assets/libraries/monaco-editor/vs/language/typescript/tsMode.js","/app/assets/libraries/monaco-editor/vs/language/typescript/tsWorker.js","/app/assets/libraries/monaco-editor/vs/loader.js","/app/assets/plugins/betterEditor/betterEditor.png","/app/assets/plugins/brython/brython.svg","/app/assets/plugins/captCC/captCC.svg","/app/assets/plugins/hexy/logo.png","/app/assets/plugins/jscpp/jscpp.svg","/app/assets/plugins/react/react.svg","/app/assets/plugins/showdown/markdown-logo.png","/app/assets/plugins/typescript/typescript.svg","/app/assets/plugins/webperl/webperl.png","/app/assets/stylesheets/chakra-variables.css","/app/assets/stylesheets/lighttheme.css","/app/assets/stylesheets/ui.css","/app/components/CodeEditor.js","/app/components/CodePreview.js","/app/components/Congratulations.js","/app/components/Editor.js","/app/components/EmbededMultipleChoice.js","/app/components/ExplanationModal.js","/app/components/Information.js","/app/components/Input.js","/app/components/Instructions.js","/app/components/ModuleComponent.js","/app/components/ModulePage.js","/app/components/MultipleChoice.js","/app/components/MultipleChoiceOption.js","/app/components/PluginPanel.js","/app/components/PreviewStandalone.js","/app/components/ShortAnswer.js","/app/components/SnippetUnlock.js","/app/components/SnippetsPanel.js","/app/components/TabbedView.js","/app/components/codeBlock.js","/app/config.js","/app/data/module_index.json","/app/data/modules/ai/0.json","/app/data/modules/ai/1.json","/app/data/modules/ai/2.json","/app/data/modules/ai/3.json","/app/data/modules/ai/4.json","/app/data/modules/ai/5.json","/app/data/modules/ai/6.json","/app/data/modules/ai/7.json","/app/data/modules/ai-assets/img0/0-0.png","/app/data/modules/ai-assets/img0/1-0.png","/app/data/modules/ai-assets/img1/0-1.png","/app/data/modules/ai-assets/img1/1-1.png","/app/data/modules/ai-assets/img2/0-2.png","/app/data/modules/ai-assets/img2/1-2.png","/app/data/modules/ai-assets/img2/2-2.png","/app/data/modules/ai-assets/img2/3-2.png","/app/data/modules/ai-assets/img2/4-2.png","/app/data/modules/ai-assets/img2/5-2.PNG","/app/data/modules/ai-assets/img3/0-3.png","/app/data/modules/ai-assets/img4/0-0.png","/app/data/modules/ai-assets/img4/0-1.png","/app/data/modules/ai-assets/img4/1-0.png","/app/data/modules/ai-assets/img4/1-1.png","/app/data/modules/ai-assets/img4/2-0.png","/app/data/modules/ai-assets/img4/2-1.png","/app/data/modules/ai-assets/img4/2-2.png","/app/data/modules/ai-assets/img4/3-0.png","/app/data/modules/ai-assets/img4/3-1.png","/app/data/modules/ai-assets/img4/3-2.png","/app/data/modules/ai-assets/img5/0-0.png","/app/data/modules/ai-assets/img5/0-1.png","/app/data/modules/ai-assets/img5/0-2.png","/app/data/modules/ai-assets/img5/0-3.png","/app/data/modules/ai-assets/img5/0-4.png","/app/data/modules/ai-assets/img5/1-0.png","/app/data/modules/ai-assets/img5/1-1.png","/app/data/modules/ai-assets/img5/1-2.png","/app/data/modules/ai-assets/img5/1-3.png","/app/data/modules/ai-assets/img5/1-4.png","/app/data/modules/ai-assets/img5/1-5.png","/app/data/modules/ai-assets/img5/2-0.gif","/app/data/modules/ai-assets/img5/2-1.png","/app/data/modules/ai-assets/img5/2-2.png","/app/data/modules/ai-assets/img5/2-3.png","/app/data/modules/ai-assets/img5/3-0.png","/app/data/modules/ai-assets/img5/3-1.png","/app/data/modules/ai-assets/img5/3-2.png","/app/data/modules/ai-assets/img5/3-3.png","/app/data/modules/ai-assets/img5/3-4.png","/app/data/modules/ai-assets/img5/3-5.png","/app/data/modules/ai-assets/img6/0-0.png","/app/data/modules/ai-assets/img6/1-0.png","/app/data/modules/ai-assets/img6/2-0.png","/app/data/modules/ai-assets/img6/3-0.png","/app/data/modules/ai-assets/img6/4-0.png","/app/data/modules/ai-assets/img6/4-1.png","/app/data/modules/ai-assets/img6/5-0.png","/app/data/modules/ai-assets/img6/5-1.png","/app/data/modules/ai-assets/img6/6-0.png","/app/data/modules/ai-assets/img7/0-0.png","/app/data/modules/ai-assets/img7/0-1.png","/app/data/modules/ai-assets/img7/0-2.png","/app/data/modules/ai-assets/img7/0-3.png","/app/data/modules/ai-assets/img7/1-0.png","/app/data/modules/ai-assets/img7/1-1.png","/app/data/modules/ai-assets/img7/1-2.png","/app/data/modules/ai-assets/img7/1-3.png","/app/data/modules/ai-assets/img7/1-4.png","/app/data/modules/ai-assets/img7/1-5.png","/app/data/modules/ai-assets/img7/2-0.png","/app/data/modules/ai-assets/img7/3-0.png","/app/data/modules/ai-assets/img7/3-1.png","/app/data/modules/ai-assets/img7/3-2.png","/app/data/modules/ai-assets/img7/3-3.png","/app/data/modules/ai-assets/img7/4-0.png","/app/data/modules/ai-assets/img7/4-1.png","/app/data/modules/ai-assets/img7/4-2.png","/app/data/modules/ai-assets/img7/4-3.png","/app/data/modules/ai-assets/img7/4-4.png","/app/data/modules/ai-assets/img7/4-5.png","/app/data/modules/ai-assets/img7/4-6.png","/app/data/modules/ai-assets/img7/4-7.png","/app/data/modules/intro-to-cs/0.json","/app/data/modules/intro-to-cs/1.json","/app/data/modules/intro-to-cs/2.json","/app/data/modules/intro-to-cs/3.json","/app/data/modules/intro-to-cs/4.json","/app/data/modules/intro-to-cs/5.json","/app/data/modules/intro-to-cs/6.json","/app/data/modules/intro-to-cs/7.json","/app/data/modules/intro-to-cs-assets/img0/0-0.png","/app/data/modules/intro-to-cs-assets/img2/0-0.png","/app/data/modules/intro-to-cs-assets/img2/1-0.png","/app/data/modules/intro-to-cs-assets/img2/2-0.png","/app/data/modules/intro-to-cs-assets/img2/3-0.png","/app/data/modules/intro-to-cs-assets/img2/4-0.png","/app/data/modules/intro-to-cs-assets/img4/0-0.gif","/app/data/modules/intro-to-cs-assets/img4/0-1.html","/app/data/modules/intro-to-cs-assets/img4/1-0.py","/app/data/modules/intro-to-cs-assets/img4/1-1.html","/app/data/modules/intro-to-cs-assets/img4/2-0.py","/app/data/modules/intro-to-cs-assets/img4/3-0.gif","/app/data/modules/intro-to-cs-assets/img4/4-0.gif","/app/data/modules/intro-to-cs-assets/img4/5-0.html","/app/data/modules/intro-to-cs-assets/img4/6-0.html","/app/data/modules/intro-to-cs-assets/img5/0-0.png","/app/data/modules/intro-to-cs-assets/img5/1-0.png","/app/data/modules/intro-to-cs-assets/img5/2-0.html","/app/data/modules/intro-to-cs-assets/img5/3-0.html","/app/data/modules/intro-to-cs-assets/img5/4-0.html","/app/data/modules/intro-to-cs-assets/img5/5-0.html","/app/data/modules/intro-to-cs-assets/img6/0-0.png","/app/data/modules/intro-to-cs-assets/img6/1-0.png","/app/data/modules/intro-to-cs-assets/img6/1-1.png","/app/data/modules/intro-to-cs-assets/img7/0-0.png","/app/data/modules/intro-to-cs-assets/img7/1-0.png","/app/data/modules/intro-to-cs-assets/img7/2-0.png","/app/data/modules/intro-to-cs-assets/img7/2-1.png","/app/data/modules/webdev/0-example.json","/app/data/modules/webdev/0.json","/app/data/modules/webdev/1-example.json","/app/data/modules/webdev/1.json","/app/data/modules/webdev/2.json","/app/data/modules/webdev/3.json","/app/data/modules/webdev/4.json","/app/data/modules/webdev/5.json","/app/data/modules/webdev/6.json","/app/data/modules/webdev/7.json","/app/data/modules/webdev-assets/img0/0-0.png","/app/data/modules/webdev-assets/img0/1-0.png","/app/data/modules/webdev-assets/img0/2-0.png","/app/data/modules/webdev-assets/img0/2-1.png","/app/data/modules/webdev-assets/img0/2-2.html","/app/data/modules/webdev-assets/img0/2-3.html","/app/data/modules/webdev-assets/img0/4-0.png","/app/data/modules/webdev-assets/img0/4-1.html","/app/data/modules/webdev-assets/img0/8-0.png","/app/data/modules/webdev-assets/img0/8-1.html","/app/data/modules/webdev-assets/img0/8-2.html","/app/data/modules/webdev-assets/img1/0-0.png","/app/data/modules/webdev-assets/img1/3-0.png","/app/data/modules/webdev-assets/img1/5-0.png","/app/data/modules/webdev-assets/img1/5-1.png","/app/data/modules/webdev-assets/img1/5-2.png","/app/data/modules/webdev-assets/img1/6-0.png","/app/data/modules/webdev-assets/img1/7-0.png","/app/data/modules/webdev-assets/img3/bootstrap-example.html","/app/data/modules/webdev-assets/img4/1-0.png","/app/data/modules/webdev-assets/img5/0-0.png","/app/data/modules/webdev-assets/img5/1-0.png","/app/data/modules/webdev-assets/img5/1-1.png","/app/data/modules/webdev-assets/img5/2-0.png","/app/data/modules/webdev-assets/img5/2-1.png","/app/data/modules/webdev-assets/img5/4-0.png","/app/data/modules/webdev-assets/img5/4-1.png","/app/data/modules/webdev-assets/img5/7-0.png","/app/data/modules/webdev-assets/img5/7-1.gif","/app/data/modules/webdev-assets/img6/0-0.png","/app/data/modules/webdev-assets/img6/0-1.png","/app/data/modules/webdev-assets/img6/0-2.png","/app/data/modules/webdev-assets/img6/3-2.png","/app/data/modules/webdev-assets/img6/4-0.png","/app/data/modules/webdev-assets/img7/0-0.png","/app/data/modules/webdev-assets/img7/1-0.png","/app/data/modules/webdev-assets/img7/4-0.png","/app/data/modules/webdev-assets/img7/5-0.png","/app/data/modules/webdev-projects/0.json","/app/data/modules/webdev-projects/1.json","/app/data/modules/webdev-projects/2.json","/app/data/modules/webdev-projects/3.json","/app/data/modules/webdev-projects/4.json","/app/data/modules/webdev-projects/5.json","/app/data/modules/webdev-projects/6.json","/app/data/modules/webdev-projects/7.json","/app/data/modules/webdev-projects-assets/img0/0-0.png","/app/data/modules/webdev-projects-assets/img0/1-0.png","/app/data/modules/webdev-projects-assets/img0/2-0.png","/app/data/modules/webdev-projects-assets/img0/3-0.png","/app/data/modules/webdev-projects-assets/img1/0-0.png","/app/data/modules/webdev-projects-assets/img3/0-0.png","/app/data/modules/webdev-projects-assets/img3/1-0.png","/app/data/modules/webdev-projects-assets/img4/0-0.png","/app/data/modules/webdev-projects-assets/img5/0-0.png","/app/data/modules/webdev-projects-assets/img5/1-0.png","/app/data/modules/webdev-projects-assets/img9/0-0.png","/app/data/modules/webdev-projects-assets/img9/1-0.png","/app/data/modules/webdev-projects-assets/img9/2-0.png","/app/data/modules/webdev-projects-assets/img9/3-0.png","/app/index.html","/app/manifest.json","/app/require-browser.js","/app/tApp-service-worker.js","/app/tApp.js","/app/utils/Database.js","/app/utils/codeBlocks.js","/app/utils/codeEditor.js","/app/utils/codeTemplateToCode.js","/app/utils/compileSnippet.js","/app/utils/doesFileExist.js","/app/utils/modal.js","/app/utils/plugins.js","/app/utils/renderElement.js","/app/utils/shuffleArray.js","/app/utils/window.js","/app/views/ai.html","/app/views/index.html","/app/views/intro-to-cs.html","/app/views/menu.html","/app/views/my-projects.html","/app/views/webdev-projects.html","/app/views/webdev.html"],"development"==window.environment&&(t.cachingConfig=null),tApp.configure(t),tApp.route("/",function(e){tApp.redirect("#/")}),tApp.route("#/",function(e){tApp.get("./views/index.html").then(e=>e.text()).then(async e=>{e=await recurseEjs(e);tApp.render(e)})}),tApp.route("#/track/<track>",function(e){tApp.get(`./views/${e.data.track}.html`).then(e=>e.text()).then(async e=>{e=await recurseEjs(e);tApp.render(e)}).catch(e=>{console.log(e),tApp.renderPath("#/404")})}),tApp.route("#/my-projects",function(e){tApp.get("./views/my-projects.html").then(e=>e.text()).then(async e=>{e=await recurseEjs(e,{myProjectsPage:!0});tApp.render(e)})}),tApp.route("#/learn/<track>/<module>/",async function(e){tApp.redirect(`#/learn/${e.data.track}/${e.data.module}/${await A.getModulePosition(e.data.track,e.data.module)}/`)}),window.DB=A;let k=new e({Database:A});tApp.route("#/preview/<track>/<module>/<position>/<fileIndex>",async function(s){if("demos"===s.data.track){k.state.track="demos",k.state.module=0,k.state.position=0;var t="./data/modules/"+s.data.module+"/"+s.data.position+"/"+s.data.fileIndex;let e=await tApp.get(t);return e=await e.text(),o({type:"project",moduleLength:1,next:{hasNext:!0,module:s.data.module,position:1},data:{type:"code_editor",storage_id:["temp_demo_cache."+s.data.fileIndex.split(".").at(-1)],files:[s.data.fileIndex],default:[],display_type:"web",elements:[],hints:[],validation:[],points:0,coins:0,demo_data:{filename:s.data.fileIndex,fileData:e}}},!1,!0),tApp.render(k.toString())}async function o(e,t=!1,o=!1){let{data:n,moduleData:a}=e;window.tAppRequestInstance=s,window.currentModuleData=a,n.isUserProject=t,n.isDemo=o,n.previewIndex=s.data.fileIndex,o&&(n.previewIndex=0),k.setComponent(new r({},k),n)}s.data.module=parseInt(s.data.module),s.data.position=parseInt(s.data.position),s.data.fileIndex=parseInt(s.data.fileIndex),k.state.track=s.data.track,k.state.module=s.data.module,k.state.position=s.data.position,"customUserProjects"===s.data.track?o({type:"project",moduleLength:1,next:{hasNext:!0,module:s.data.module,position:1},data:{type:"code_editor",storage_id:[],files:[],default:[],display_type:"web",elements:[],hints:[],validation:[],points:0,coins:0}},!0):A.getModuleData(s.data.track,s.data.module,s.data.position).then(async e=>{o(e)}).catch(e=>{console.log(e),tApp.renderPath("#/404")}),tApp.render(k.toString())}),tApp.route("#/learn/<track>/<module>/<position>",async function(i){async function t(e,t=!1){let{data:s,type:o,moduleLength:n,next:a,moduleData:r}=e;if(window.tAppRequestInstance=i,window.currentModuleData=r,i.data.position>=n)return!0===(e=await confirmRedoLesson(l))?tApp.redirect(`#/learn/${i.data.track}/${i.data.module}/0`):"stay"===e?tApp.redirect("#/track/"+i.data.track):void(a.hasNext?tApp.redirect(`#/learn/${i.data.track}/${a.module}/`+a.position):tApp.redirect("#/"));if("lesson"==o||"project"==o){if(null!=s.code_template&&(s.code=g(s.code_template)),a.hasNext?k.state.next=`#/learn/${i.data.track}/${a.module}/`+a.position:k.state.next="#/",k.state.track=i.data.track,k.state.module=i.data.module,k.state.position=i.data.position,"information"==s.type)k.setComponent(new m({},k),s);else if("multiple_choice"==s.type){let o=y([...s.answers]),n=[];for(let t=0;t<o.length;t++)n.push(s.answers.findIndex(e=>e===o[t]));let t=[];for(let e=0;e<n.length;e++)t.push(s.answers[n[e]]);let a=[];for(let e=0;e<n.length;e++)a.push(s.descriptions[n[e]]);if(s.answers=t,s.descriptions=a,Array.isArray(s.correct)){let e=[...s.correct];s.correct=[],e.forEach(t=>s.correct.push(n.findIndex(e=>e===t)))}else s.correct=n.findIndex(e=>e===s.correct);k.setComponent(new w({},k),s)}else"short_answer"==s.type?k.setComponent(new h({},k),s):"snippet_unlock"==s.type?k.setComponent(new f({},k),s):"congratulations"==s.type?k.setComponent(new j({},k),s):"code_editor"==s.type&&(s.isUserProject=t,k.setComponent(new d({},k),s));tApp.render(k.toString())}else tApp.renderPath("#/404"),console.error("Unknown type "+o)}i.data.module=parseInt(i.data.module),i.data.position=parseInt(i.data.position),"customUserProjects"===i.data.track?t({type:"project",moduleLength:1,next:{hasNext:!0,module:i.data.module,position:1},data:{type:"code_editor",storage_id:[],files:[],default:[],display_type:"web",elements:[],hints:[],validation:[],points:0,coins:0}},!0):(await fetchMenuData(),localStorage.setItem("last-accessed-module",JSON.stringify({path:`#/learn/${i.data.track}/${i.data.module}/`+i.data.position,name:window.rawModuleData[i.data.track].weeks[i.data.module]})),A.getModuleData(i.data.track,i.data.module,i.data.position).then(async e=>{t(e)}).catch(e=>{console.log(e),tApp.renderPath("#/404")}))}),tApp.route("#/DEV-SHOW-ALL",async function(r){var i="",o={},t={"Webdev Lessons":"webdev","Webdev Projects":"webdev-projects","AI Lessons":"ai"},n={};for(let e=0;e<Object.entries(t).length;e++){Object.entries(t)[e][0];var a=Object.entries(t)[e][1],s=(o[a]=[],0),d=0,l=await DB.getModuleCount(a),p=[];for(let t=0;t<l;t++){let e=await DB.getModuleData(a,t,0);var c=await DB.getModulePosition(a,t);o[a].push(c),e.currentUserPosition=c,p.push(e),s+=e.moduleLength}o[a]?(o[a].forEach(e=>{null!==e&&(d+=e)}),n[a]={totalPages:s,userPages:d,data:p}):n[a]={totalPages:s,userPages:0,data:p}}var u=[];Object.entries(n).forEach(([a,e])=>{e.data.forEach((e,n)=>{for(let t=0;t<e.moduleLength-1;t++)u.push(new Promise((o,e)=>{A.getModuleData(a,n,t).then(t=>{try{let{data:s,type:e}=t;if(window.tAppRequestInstance=r,"lesson"==e||"project"==e){if(null!=s.code_template&&(s.code=g(s.code_template)),"information"==s.type)k.setComponent(new m({},k),s);else if("multiple_choice"==s.type){let o=y([...s.answers]),n=[];for(let t=0;t<o.length;t++)n.push(s.answers.findIndex(e=>e===o[t]));let t=[];for(let e=0;e<n.length;e++)t.push(s.answers[n[e]]);let a=[];for(let e=0;e<n.length;e++)a.push(s.descriptions[n[e]]);if(s.answers=t,s.descriptions=a,Array.isArray(s.correct)){let e=[...s.correct];s.correct=[],e.forEach(t=>s.correct.push(n.findIndex(e=>e===t)))}else s.correct=n.findIndex(e=>e===s.correct);k.setComponent(new w({},k),s)}else"short_answer"==s.type?k.setComponent(new h({},k),s):"snippet_unlock"==s.type?k.setComponent(new f({},k),s):"congratulations"==s.type&&k.setComponent(new j({},k),s);k&&(i+=k.toString()),o()}}catch(e){o()}})}))})}),await Promise.all(u),await new Promise((e,t)=>{setTimeout(()=>{e()},500)}),console.log("Done"),tApp.render(i)}),tApp.route("#/404",function(e){tApp.render(`
			<h1>Error 404</h1>
			<p>Page not found.</p>
		`)}),tApp.route("#/403",function(e){tApp.render(`
			<h1>Error 403</h1>
			<p>Access denied.</p>
		`)});t=await A.getScore();document.querySelector("#score").innerHTML=`${t.points} XP, ${t.coins} Coins`,tApp.start().then(()=>{"development"!==window.environment&&(window.isElectron?checkIfNewerElectronVersion():(checkIfNewerVersion(),tApp.install().then(()=>{tApp.update()})))})})();let redirectFunction=tApp.redirect;tApp.redirect=function(e,t){redirectFunction(e,t),onWindowHashChange()};