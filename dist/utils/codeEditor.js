function updateLanguage(t){return!!document.getElementById("code-frame")&&(new Promise((t,e)=>{!function e(){document.getElementById("code-frame").contentWindow.monaco?t():setTimeout(e,100)}()}).then(e=>{document.getElementById("code-frame").contentWindow.monaco.editor.setModelLanguage(document.getElementById("code-frame").contentWindow.monaco.editor.getModels()[0],t)}),!0)}function updateReadOnly(t){return!!document.getElementById("code-frame")&&(new Promise((t,e)=>{!function e(){document.getElementById("code-frame").contentWindow.codeEditor?t():setTimeout(e,100)}()}).then(e=>{document.getElementById("code-frame").contentWindow.codeEditor.updateOptions({readOnly:t}),window.currentReadOnly=t}),!0)}function getCurrentEditorOption(e){return 81===e?window.currentReadOnly:document.getElementById("code-frame").contentWindow.codeEditor.getOption(e)}function updateContent(t){return new Promise((t,e)=>{!function e(){document.getElementById("code-frame").contentWindow.codeEditor?t():setTimeout(e,100)}()}).then(e=>{document.getElementById("code-frame").contentWindow.codeEditor.setValue(t)}),!0}function getValue(){return document.getElementById("code-frame").contentWindow.codeEditor.getValue()}function insertAtCursor(e){return document.getElementById("code-frame").contentWindow.codeEditor.trigger("keyboard","type",{text:e}),!0}function format(){return document.getElementById("code-frame").contentWindow.codeEditor.getAction("editor.action.formatDocument").run(),!0}function getCurrentEditorIndex(){return document.getElementById("code-frame").contentWindow.currentEditorIndex}function setCurrentEditorIndex(e){return document.getElementById("code-frame").contentWindow.currentEditorIndex=e,!0}function showAlertModal(e,t,n,o){let a=document.getElementById("editor-alert-modal-template"),r=a.cloneNode(!0),i=document.getElementById("editor-alert-modal-containers"),c=i.children[0].getAttribute("data-editor-alert-modal-index"),d=Number(c||-1)+1;return r.setAttribute("data-editor-alert-modal-index",d),r.id="editor-alert-modal-"+makeid(50),r.style.display="block",r.style.bottom="0",r.style.opacity="0",r.style.zIndex=10+d,n&&(r.querySelector(".codicon.codicon-info").classList="codicon "+n),setTimeout(function(){r.style.opacity="1",r.style.bottom=10+100*d+"px"},10),o&&setTimeout(async function(){r.querySelector(".editor-alert-modal-loading-bar").style.setProperty("--deletetime",o+"s"),r.querySelector(".editor-alert-modal-loading-bar").classList.add("loading-bar-active"),await new Promise(e=>setTimeout(e,1e3*o)),r.querySelector(".editor-alert-modal-loading-bar").style.width="100%",r.querySelector(".editor-alert-modal-loading-bar").classList.remove("loading-bar-active"),document.getElementById(r.id)&&removeAlertModal(r.getAttribute("data-editor-alert-modal-index"))},10),r.querySelector(".text").innerHTML=e,t.forEach(e=>{let t=document.createElement("button");t.innerHTML=e.text,t.onclick=e.onclick,t.classList.add("editor-alert-modal-btn"),r.querySelector(".editor-alert-modal-footer").appendChild(t)}),i.prepend(r),!0}function removeAlertModal(e){e=Number(e);let t=document.getElementById("editor-alert-modal-containers"),n=document.querySelector("[data-editor-alert-modal-index='"+e+"']");n.querySelector(".editor-alert-modal-loading-bar").classList.remove("loading-bar-active"),n.style.opacity="0",n.style.bottom="0",setTimeout(function(){n.parentElement.removeChild(n)},300);var o=t.children[0].getAttribute("data-editor-alert-modal-index");for(let t=e+1;t<Number(o)+1;t++){let e=document.querySelector("[data-editor-alert-modal-index='"+t+"']");e.setAttribute("data-editor-alert-modal-index",t-1),e.style.bottom=10+100*(t-1)+"px"}}function uploadFile(e){var a,r=e.filename,t=e.level,i=e.data,c=e.onsuccess||function(){},d=e.onerror||function(){},s=makeid(100);return"module"===t?a=window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module:"page"===t&&(a=window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position),getAllUserFiles().then(e=>{for(var t in e)if(e[t].filename===r)return void d("File already exists");openConnectionWithNewVersion(a).then(e=>{const t=e.transaction(a,"readwrite"),n=t.objectStore(a);let o=n.put({fileid:s,code:i,filename:r});o.onsuccess=function(e){c(e)},o.onerror=function(e){console.log(e.target.errorCode),d(e)},t.oncomplete=function(){e.close()}})}),s}function getModuleFile(c){return new Promise((r,i)=>{openConnection().then(t=>{try{const n=t.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module,"readwrite"),o=n.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module),a=o.index("fileids");let e=a.get(c);e.onsuccess=function(e){r(e.target.result)},e.onerror=function(e){console.log(e.target.errorCode)},n.oncomplete=function(){t.close()}}catch(e){t.close(),i("Object store does not exist yet!")}})})}function getPageFile(c){return new Promise((r,i)=>{openConnection().then(t=>{try{const n=t.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position,"readwrite"),o=n.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position),a=o.index("fileids");let e=a.get(c);e.onsuccess=function(e){r(e.target.result)},e.onerror=function(e){console.log(e.target.errorCode)},n.oncomplete=function(){t.close()}}catch(e){t.close(),i("Object store does not exist yet!")}})})}function getAllUserFiles(){return new Promise(async(e,t)=>{let r=[],i=await openConnection();try{await new Promise(async(t,n)=>{try{const o=i.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position,"readwrite"),a=o.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position);let e=a.getAll();e.onsuccess=function(e){r=r.concat(e.target.result),t()},e.onerror=function(e){console.log(e.target.errorCode)}}catch(e){n()}})}catch(e){}try{await new Promise(async(t,n)=>{try{const o=i.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module,"readwrite"),a=o.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module);let e=a.getAll();e.onsuccess=function(e){r=r.concat(e.target.result),t()},e.onerror=function(e){console.log(e.target.errorCode)}}catch(e){return n()}})}catch(e){}i.close(),e(r)})}function deleteFile(c){return new Promise(async(e,t)=>{let i=await openConnection();try{await new Promise(async(t,n)=>{try{const o=i.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position,"readwrite"),a=o.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position),r=a.index("fileids");let e=r.openKeyCursor(c);e.onsuccess=function(e){e.target.result&&a.delete(e.target.result.primaryKey),t()},e.onerror=function(e){console.log(e.target.errorCode),n()}}catch(e){n(e)}})}catch(e){}try{await new Promise(async(t,n)=>{try{const o=i.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module,"readwrite"),a=o.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module),r=a.index("fileids");let e=r.openKeyCursor(c);e.onsuccess=function(e){e.target.result&&a.delete(e.target.result.primaryKey),t()},e.onerror=function(e){console.log(e.target.errorCode),n()}}catch(e){return n(e)}})}catch(e){}i.close(),e()})}function updateFile(s,l){return new Promise(async(e,t)=>{let c=await openConnection(),d=!1;try{await new Promise(async(n,o)=>{try{let t=await getPageFile(s);const a=c.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position,"readwrite"),r=a.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position),i=r.index("fileids");let e=i.openKeyCursor(s);e.onsuccess=async function(e){e.target.result&&(t.code=l,r.put(t,e.target.result.primaryKey),d=!0),n()},e.onerror=function(e){console.log(e.target.errorCode),o()}}catch(e){o(e)}})}catch(e){}if(!0===d)return c.close(),e();try{await new Promise(async(n,o)=>{try{let t=await getModuleFile(s);const a=c.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module,"readwrite"),r=a.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module),i=r.index("fileids");let e=i.openKeyCursor(s);e.onsuccess=function(e){e.target.result&&(t.code=l,r.put(t,e.target.result.primaryKey),d=!0),n()},e.onerror=function(e){console.log(e.target.errorCode),o()}}catch(e){o(e)}})}catch(e){}if(c.close(),!0===d)return e();t()})}function renameFile(s,l){return new Promise(async(e,t)=>{var n=!1;try{await getFile(l),n="A file with that name already exists! Nothing was changed."}catch(e){}n&&t(n);let c=await openConnection(),d=!1;try{await new Promise(async(n,o)=>{try{let t=await getPageFile(s);const a=c.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position,"readwrite"),r=a.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position),i=r.index("fileids");let e=i.openKeyCursor(s);e.onsuccess=async function(e){e.target.result&&(t.filename=l,r.put(t,e.target.result.primaryKey),d=!0),n()},e.onerror=function(e){console.log(e.target.errorCode),o()}}catch(e){o(e)}})}catch(e){}if(!0===d)return c.close(),e();try{await new Promise(async(n,o)=>{try{let t=await getModuleFile(s);const a=c.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module,"readwrite"),r=a.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module),i=r.index("fileids");let e=i.openKeyCursor(s);e.onsuccess=function(e){e.target.result&&(t.filename=l,r.put(t,e.target.result.primaryKey),d=!0),n()},e.onerror=function(e){console.log(e.target.errorCode),o()}}catch(e){o(e)}})}catch(e){}if(c.close(),!0===d)return e();t()})}function getFile(c){return new Promise(async(e,t)=>{let r,i=await openConnection();try{await new Promise(async(t,n)=>{try{const o=i.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position,"readwrite"),a=o.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position);let e=a.getAll();e.onsuccess=function(e){r=e.target.result.find(e=>e.filename===c),t()},e.onerror=function(e){console.log(e.target.errorCode)}}catch(e){n()}})}catch(e){}if(r)return i.close(),e(r);try{await new Promise(async(t,n)=>{try{const o=i.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module,"readwrite"),a=o.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module);let e=a.getAll();e.onsuccess=function(e){r=e.target.result.find(e=>e.filename===c),t()},e.onerror=function(e){console.log(e.target.errorCode)}}catch(e){return n()}})}catch(e){}if(i.close(),r)return e(r);t("Could not find file with that filename!")})}function getFileWithId(c){return new Promise(async(e,t)=>{let r,i=await openConnection();try{await new Promise(async(t,n)=>{try{const o=i.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position,"readwrite"),a=o.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position);let e=a.getAll();e.onsuccess=function(e){r=e.target.result.find(e=>e.fileid===c),t()},e.onerror=function(e){console.log(e.target.errorCode)}}catch(e){n()}})}catch(e){}if(r)return i.close(),e(r);try{await new Promise(async(t,n)=>{try{const o=i.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module,"readwrite"),a=o.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module);let e=a.getAll();e.onsuccess=function(e){r=e.target.result.find(e=>e.fileid===c),t()},e.onerror=function(e){console.log(e.target.errorCode)}}catch(e){return n()}})}catch(e){}if(i.close(),r)return e(r);t("Could not find file with that fileid!")})}function newMyProject(e){let t=localStorage.getItem("myProjects");return t=t||"{}",(t=JSON.parse(t))[e]?"Project with that name already exists!":(t[e]={name:e,track:"customUserProjects",module:Math.floor(1e11*Math.random()),position:0},localStorage.setItem("myProjects",JSON.stringify(t)),!0)}function deleteMyProject(o){return new Promise(async(e,t)=>{let n=localStorage.getItem("myProjects");n=n||"{}",(n=JSON.parse(n))[o]||t("Project with that name does not exist!");t=n[o];delete n[o],localStorage.setItem("myProjects",JSON.stringify(n));try{let e=await openConnectionWithNewVersion();e.deleteObjectStore(t.track+"-"+t.module+"-"+t.position),e.close()}catch(e){console.log(e)}e(!0)})}function getMyProjects(){var e=localStorage.getItem("myProjects")||"{}";return JSON.parse(e)}function sizeOfMyProject(s){return new Promise(async(t,n)=>{var e=localStorage.getItem("myProjects")||"{}";(e=JSON.parse(e))[s]||n("Project with that name does not exist!");var o,e=e[s],e=e.track+"-"+e.module+"-"+e.position;let a=await openConnection();try{o=a.transaction([e],"readonly")}catch(e){t(0)}const r=o.objectStore(e),i=r.openCursor();let c=0,d=0;i.onsuccess=function(e){const t=i.result;t&&(c++,console.log(t),d+=byteCount(JSON.stringify(t.value)),t.continue())},i.onerror=function(e){n(e)},o.oncomplete=function(e){t(d)},o.onabort=function(e){n(e)},o.onerror=function(e){n(e)}})}function getMetaDataFromText(e){let t={};if(!e.startsWith("______DEVNETIC_PROJECT_META_DATA______"))return t;var n=(e=e.slice(38)).indexOf("______DEVNETIC_PROJECT_META_DATA_END______");e=e.slice(0,n);try{return t=JSON.parse(e)}catch(e){return{}}}function embedMetaDataIntoText(e){return"______DEVNETIC_PROJECT_META_DATA______"+JSON.stringify(e)+"______DEVNETIC_PROJECT_META_DATA_END______"}function getTextWithoutMetaData(e){if(!e.startsWith("______DEVNETIC_PROJECT_META_DATA______"))return e;var t=e.indexOf("______DEVNETIC_PROJECT_META_DATA_END______");return e.slice(t+"______DEVNETIC_PROJECT_META_DATA_END______".length)}function makeid(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",o=n.length,a=0;a<e;a++)t+=n.charAt(Math.floor(Math.random()*o));return t}function getCurrentIDBVersion(){return new Promise((n,e)=>{const t=indexedDB.open("USERCODE");t.onsuccess=e=>{let t=e.target.result;e=t.version;t.close(),n(e)}})}function openConnectionWithNewVersion(a){return new Promise(async(o,e)=>{var t=await getCurrentIDBVersion()+1;const n=indexedDB.open("USERCODE",t);n.onsuccess=e=>{e=e.target.result;a||o(e)},n.onupgradeneeded=t=>{let n=t.target.result;if(a)try{let e=n.createObjectStore(a,{autoIncrement:!0});e.createIndex("fileids","fileid",{unique:!0}),t.target.transaction.oncomplete=function(e){o(n)}}catch(e){t.target.transaction.oncomplete=function(e){o(n)}}else o(n)}})}function openConnection(){return new Promise((t,e)=>{const n=indexedDB.open("USERCODE");n.onsuccess=e=>{e=e.target.result;t(e)},n.onupgradeneeded=e=>{e.target.result}})}function byteCount(e){return encodeURI(e).split(/%..|./).length-1}window.currentReadOnly=!1,window.onhashchange=function(){window.currentReadOnly=!1},module.exports={updateLanguage:updateLanguage,updateContent:updateContent,getValue:getValue,insertAtCursor:insertAtCursor,format:format,getCurrentEditorIndex:getCurrentEditorIndex,setCurrentEditorIndex:setCurrentEditorIndex,showAlertModal:showAlertModal,removeAlertModal:removeAlertModal,uploadFile:uploadFile,getModuleFile:getModuleFile,getPageFile:getPageFile,getAllUserFiles:getAllUserFiles,deleteFile:deleteFile,updateFile:updateFile,getFile:getFile,renameFile:renameFile,getFileWithId:getFileWithId,updateReadOnly:updateReadOnly,getCurrentEditorOption:getCurrentEditorOption,newMyProject:newMyProject,deleteMyProject:deleteMyProject,getMyProjects:getMyProjects,getMetaDataFromText:getMetaDataFromText,embedMetaDataIntoText:embedMetaDataIntoText,getTextWithoutMetaData:getTextWithoutMetaData,sizeOfMyProject:sizeOfMyProject};