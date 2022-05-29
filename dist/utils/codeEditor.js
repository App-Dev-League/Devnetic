function updateLanguage(t){return!!document.getElementById("code-frame")&&(new Promise((t,e)=>{!function e(){document.getElementById("code-frame").contentWindow.monaco?t():setTimeout(e,100)}()}).then(e=>{document.getElementById("code-frame").contentWindow.monaco.editor.setModelLanguage(document.getElementById("code-frame").contentWindow.monaco.editor.getModels()[0],t)}),!0)}function updateReadOnly(t){return!!document.getElementById("code-frame")&&(new Promise((t,e)=>{!function e(){document.getElementById("code-frame").contentWindow.codeEditor?t():setTimeout(e,100)}()}).then(e=>{document.getElementById("code-frame").contentWindow.codeEditor.updateOptions({readOnly:t}),window.currentReadOnly=t}),!0)}function getCurrentEditorOption(e){return 81===e?window.currentReadOnly:document.getElementById("code-frame").contentWindow.codeEditor.getOption(e)}function updateContent(t){return new Promise((t,e)=>{!function e(){document.getElementById("code-frame").contentWindow.codeEditor?t():setTimeout(e,100)}()}).then(e=>{document.getElementById("code-frame").contentWindow.codeEditor.setValue(t)}),!0}function getValue(){return document.getElementById("code-frame").contentWindow.codeEditor.getValue()}function insertAtCursor(e){return document.getElementById("code-frame").contentWindow.codeEditor.trigger("keyboard","type",{text:e}),!0}function format(){return document.getElementById("code-frame").contentWindow.codeEditor.getAction("editor.action.formatDocument").run(),!0}function getCurrentEditorIndex(){return document.getElementById("code-frame").contentWindow.currentEditorIndex}function setCurrentEditorIndex(e){return document.getElementById("code-frame").contentWindow.currentEditorIndex=e,!0}function showAlertModal(e,t,n,o){let r=document.getElementById("editor-alert-modal-template"),a=r.cloneNode(!0),c=document.getElementById("editor-alert-modal-containers"),i=c.children[0].getAttribute("data-editor-alert-modal-index"),s=Number(i||-1)+1;return a.setAttribute("data-editor-alert-modal-index",s),a.id="editor-alert-modal-"+makeid(50),a.style.display="block",a.style.bottom="0",a.style.opacity="0",a.style.zIndex=10+s,n&&(a.querySelector(".codicon.codicon-info").classList="codicon "+n),setTimeout(function(){a.style.opacity="1",a.style.bottom=10+100*s+"px"},10),o&&setTimeout(async function(){a.querySelector(".editor-alert-modal-loading-bar").style.setProperty("--deletetime",o+"s"),a.querySelector(".editor-alert-modal-loading-bar").classList.add("loading-bar-active"),await new Promise(e=>setTimeout(e,1e3*o)),a.querySelector(".editor-alert-modal-loading-bar").style.width="100%",a.querySelector(".editor-alert-modal-loading-bar").classList.remove("loading-bar-active"),document.getElementById(a.id)&&removeAlertModal(a.getAttribute("data-editor-alert-modal-index"))},10),a.querySelector(".text").innerHTML=e,t.forEach(e=>{let t=document.createElement("button");t.innerHTML=e.text,t.onclick=e.onclick,t.classList.add("editor-alert-modal-btn"),e.color&&(t.style.backgroundColor=e.color),a.querySelector(".editor-alert-modal-footer").appendChild(t)}),c.prepend(a),a}function removeAlertModal(e){e=Number(e);let t=document.getElementById("editor-alert-modal-containers"),n=document.querySelector("[data-editor-alert-modal-index='"+e+"']");n.querySelector(".editor-alert-modal-loading-bar").classList.remove("loading-bar-active"),n.style.opacity="0",n.style.bottom="0",setTimeout(function(){n.parentElement.removeChild(n)},300);var o=t.children[0].getAttribute("data-editor-alert-modal-index");for(let t=e+1;t<Number(o)+1;t++){let e=document.querySelector("[data-editor-alert-modal-index='"+t+"']");e.setAttribute("data-editor-alert-modal-index",t-1),e.style.bottom=10+100*(t-1)+"px"}}function uploadFile(e){var r,a=e.filename,t=e.level,c=e.data,i=e.onsuccess||function(){},s=e.onerror||function(){},d=makeid(100);return"module"===t?r=window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module:"page"===t&&(r=window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position),getAllUserFiles().then(e=>{for(var t in e)if(e[t].filename===a)return void s("File already exists");openConnectionWithNewVersion(r).then(e=>{const t=e.transaction(r,"readwrite"),n=t.objectStore(r);let o=n.put({fileid:d,code:c,filename:a});o.onsuccess=function(e){i(e)},o.onerror=function(e){console.log(e.target.errorCode),s(e)},t.oncomplete=function(){e.close()}})}),d}function getModuleFile(i){return new Promise((a,c)=>{openConnection().then(t=>{try{const n=t.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module,"readwrite"),o=n.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module),r=o.index("fileids");let e=r.get(i);e.onsuccess=function(e){a(e.target.result)},e.onerror=function(e){console.log(e.target.errorCode)},n.oncomplete=function(){t.close()}}catch(e){t.close(),c("Object store does not exist yet!")}})})}function getPageFile(i){return new Promise((a,c)=>{openConnection().then(t=>{try{const n=t.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position,"readwrite"),o=n.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position),r=o.index("fileids");let e=r.get(i);e.onsuccess=function(e){a(e.target.result)},e.onerror=function(e){console.log(e.target.errorCode)},n.oncomplete=function(){t.close()}}catch(e){t.close(),c("Object store does not exist yet!")}})})}function getAllUserFiles(){return new Promise(async(e,t)=>{let a=[],c=await openConnection();try{await new Promise(async(t,n)=>{try{const o=c.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position,"readwrite"),r=o.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position);let e=r.getAll();e.onsuccess=function(e){a=a.concat(e.target.result),t()},e.onerror=function(e){console.log(e.target.errorCode)}}catch(e){n()}})}catch(e){}try{await new Promise(async(t,n)=>{try{const o=c.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module,"readwrite"),r=o.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module);let e=r.getAll();e.onsuccess=function(e){a=a.concat(e.target.result),t()},e.onerror=function(e){console.log(e.target.errorCode)}}catch(e){return n()}})}catch(e){}c.close(),e(a)})}function deleteFile(i){return new Promise(async(e,t)=>{let c=await openConnection();try{await new Promise(async(t,n)=>{try{const o=c.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position,"readwrite"),r=o.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position),a=r.index("fileids");let e=a.openKeyCursor(i);e.onsuccess=function(e){e.target.result&&r.delete(e.target.result.primaryKey),t()},e.onerror=function(e){console.log(e.target.errorCode),n()}}catch(e){n(e)}})}catch(e){}try{await new Promise(async(t,n)=>{try{const o=c.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module,"readwrite"),r=o.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module),a=r.index("fileids");let e=a.openKeyCursor(i);e.onsuccess=function(e){e.target.result&&r.delete(e.target.result.primaryKey),t()},e.onerror=function(e){console.log(e.target.errorCode),n()}}catch(e){return n(e)}})}catch(e){}c.close(),e()})}function updateFile(d,l){return new Promise(async(e,t)=>{let i=await openConnection(),s=!1;try{await new Promise(async(n,o)=>{try{let t=await getPageFile(d);const r=i.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position,"readwrite"),a=r.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position),c=a.index("fileids");let e=c.openKeyCursor(d);e.onsuccess=async function(e){e.target.result&&(t.code=l,a.put(t,e.target.result.primaryKey),s=!0),n()},e.onerror=function(e){console.log(e.target.errorCode),o()}}catch(e){o(e)}})}catch(e){}if(!0===s)return i.close(),e();try{await new Promise(async(n,o)=>{try{let t=await getModuleFile(d);const r=i.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module,"readwrite"),a=r.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module),c=a.index("fileids");let e=c.openKeyCursor(d);e.onsuccess=function(e){e.target.result&&(t.code=l,a.put(t,e.target.result.primaryKey),s=!0),n()},e.onerror=function(e){console.log(e.target.errorCode),o()}}catch(e){o(e)}})}catch(e){}if(i.close(),!0===s)return e();t()})}function renameFile(d,l){return new Promise(async(e,t)=>{var n=!1;try{await getFile(l),n="A file with that name already exists! Nothing was changed."}catch(e){}n&&t(n);let i=await openConnection(),s=!1;try{await new Promise(async(n,o)=>{try{let t=await getPageFile(d);const r=i.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position,"readwrite"),a=r.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position),c=a.index("fileids");let e=c.openKeyCursor(d);e.onsuccess=async function(e){e.target.result&&(t.filename=l,a.put(t,e.target.result.primaryKey),s=!0),n()},e.onerror=function(e){console.log(e.target.errorCode),o()}}catch(e){o(e)}})}catch(e){}if(!0===s)return i.close(),e();try{await new Promise(async(n,o)=>{try{let t=await getModuleFile(d);const r=i.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module,"readwrite"),a=r.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module),c=a.index("fileids");let e=c.openKeyCursor(d);e.onsuccess=function(e){e.target.result&&(t.filename=l,a.put(t,e.target.result.primaryKey),s=!0),n()},e.onerror=function(e){console.log(e.target.errorCode),o()}}catch(e){o(e)}})}catch(e){}if(i.close(),!0===s)return e();t()})}function getFile(i){return new Promise(async(e,t)=>{let a,c=await openConnection();i.endsWith(" •")&&(i=i.slice(0,-2));try{await new Promise(async(t,n)=>{try{const o=c.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position,"readwrite"),r=o.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position);let e=r.getAll();e.onsuccess=function(e){a=e.target.result.find(e=>e.filename===i),t()},e.onerror=function(e){console.log(e.target.errorCode)}}catch(e){n()}})}catch(e){}if(a)return c.close(),e(a);try{await new Promise(async(t,n)=>{try{const o=c.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module,"readwrite"),r=o.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module);let e=r.getAll();e.onsuccess=function(e){a=e.target.result.find(e=>e.filename===i),t()},e.onerror=function(e){console.log(e.target.errorCode)}}catch(e){return n()}})}catch(e){}if(c.close(),a)return e(a);t("Could not find file with that filename!")})}function getFileWithId(i){return new Promise(async(e,t)=>{let a,c=await openConnection();try{await new Promise(async(t,n)=>{try{const o=c.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position,"readwrite"),r=o.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module+"-"+window.tAppRequestInstance.data.position);let e=r.getAll();e.onsuccess=function(e){a=e.target.result.find(e=>e.fileid===i),t()},e.onerror=function(e){console.log(e.target.errorCode)}}catch(e){n()}})}catch(e){}if(a)return c.close(),e(a);try{await new Promise(async(t,n)=>{try{const o=c.transaction(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module,"readwrite"),r=o.objectStore(window.tAppRequestInstance.data.track+"-"+window.tAppRequestInstance.data.module);let e=r.getAll();e.onsuccess=function(e){a=e.target.result.find(e=>e.fileid===i),t()},e.onerror=function(e){console.log(e.target.errorCode)}}catch(e){return n()}})}catch(e){}if(c.close(),a)return e(a);t("Could not find file with that fileid!")})}function exportToJson(){return new Promise(async(n,e)=>{let o=await openConnection();const r={};if(0===o.objectStoreNames.length)n(JSON.stringify(r));else{const t=o.transaction(o.objectStoreNames,"readonly");t.addEventListener("error",e);for(const a of o.objectStoreNames){const c=[];t.objectStore(a).openCursor().addEventListener("success",e=>{const t=e.target.result;t?(c.push(t.value),t.continue()):(r[a]=c,o.objectStoreNames.length===Object.keys(r).length&&(o.close(),n(r)))})}}})}function importFromJson(d){return new Promise(async(t,e)=>{let o=indexedDB.deleteDatabase("USERCODE");await new Promise((t,n)=>{o.onsuccess=function(e){t()},o.onerror=function(e){n()}});var n=d;"string"==typeof n&&(n={});let r=Object.keys(n);0===r.length&&(r=["tmp"],n.tmp=[]),console.log(n,r);var a=await openConnectionWithNewVersion(r);const c=a.transaction(a.objectStoreNames,"readwrite");c.addEventListener("error",e);for(const i of a.objectStoreNames)if(n[i]&&0!==n[i].length){let e=0;for(const s of n[i]){const o=c.objectStore(i).add(s);o.addEventListener("success",()=>{++e===n[i].length&&(console.log(Object.keys(n).length,i),delete n[i],0===Object.keys(n).length&&(a.close(),t()))})}}else delete n[i],0===Object.keys(n).length&&(a.close(),t())})}function newMyProject(e){let t=localStorage.getItem("myProjects");return t=t||"{}",(t=JSON.parse(t))[e]?"Project with that name already exists!":(t[e]={name:e,track:"customUserProjects",module:Math.floor(1e11*Math.random()),position:0},localStorage.setItem("myProjects",JSON.stringify(t)),!0)}function deleteMyProject(o){return new Promise(async(e,t)=>{let n=localStorage.getItem("myProjects");n=n||"{}",(n=JSON.parse(n))[o]||t("Project with that name does not exist!");t=n[o];delete n[o],localStorage.setItem("myProjects",JSON.stringify(n));try{let e=await openConnectionWithNewVersion();e.deleteObjectStore(t.track+"-"+t.module+"-"+t.position),e.close()}catch(e){console.log(e)}e(!0)})}function getMyProjects(){var e=localStorage.getItem("myProjects")||"{}";return JSON.parse(e)}function sizeOfMyProject(l){return new Promise(async(t,n)=>{var e=localStorage.getItem("myProjects")||"{}";(e=JSON.parse(e))[l]||n("Project with that name does not exist!");var o,e=e[l],e=e.track+"-"+e.module+"-"+e.position;let r=await openConnection();try{o=r.transaction([e],"readonly")}catch(e){t(0)}const a=o.objectStore(e),c=a.openCursor();let i=0,s=0;function d(){r.close()}c.onsuccess=function(e){const t=c.result;t&&(i++,s+=byteCount(JSON.stringify(t.value)),t.continue())},c.onerror=function(e){d(),n(e)},o.oncomplete=function(e){d(),t(s)},o.onabort=function(e){d(),n(e)},o.onerror=function(e){d(),n(e)}})}function getMetaDataFromText(e){let t={};if(!e.startsWith("______DEVNETIC_PROJECT_META_DATA______"))return t;var n=(e=e.slice(38)).indexOf("______DEVNETIC_PROJECT_META_DATA_END______");e=e.slice(0,n);try{return t=JSON.parse(e)}catch(e){return{}}}function embedMetaDataIntoText(e){return"______DEVNETIC_PROJECT_META_DATA______"+JSON.stringify(e)+"______DEVNETIC_PROJECT_META_DATA_END______"}function getTextWithoutMetaData(e){if(!e.startsWith("______DEVNETIC_PROJECT_META_DATA______"))return e;var t=e.indexOf("______DEVNETIC_PROJECT_META_DATA_END______");return e.slice(t+"______DEVNETIC_PROJECT_META_DATA_END______".length)}function makeid(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",o=n.length,r=0;r<e;r++)t+=n.charAt(Math.floor(Math.random()*o));return t}function getCurrentIDBVersion(){return new Promise((n,e)=>{const t=indexedDB.open("USERCODE");t.onsuccess=e=>{let t=e.target.result;e=t.version;t.close(),n(e)}})}function openConnectionWithNewVersion(r){return new Promise(async(o,e)=>{var t=await getCurrentIDBVersion()+1;const n=indexedDB.open("USERCODE",t);n.onsuccess=e=>{e=e.target.result;r||o(e)},n.onupgradeneeded=t=>{let n=t.target.result;if("string"==typeof r)try{let e=n.createObjectStore(r,{autoIncrement:!0});e.createIndex("fileids","fileid",{unique:!0}),t.target.transaction.oncomplete=function(e){o(n)}}catch(e){t.target.transaction.oncomplete=function(e){o(n)}}else"object"==typeof r?(r.forEach(e=>{let t=n.createObjectStore(e,{autoIncrement:!0});t.createIndex("fileids","fileid",{unique:!0})}),t.target.transaction.oncomplete=function(e){o(n)}):o(n)},n.onerror=e=>{console.log(e)}})}function openConnection(){return new Promise((t,e)=>{const n=indexedDB.open("USERCODE");n.onsuccess=e=>{e=e.target.result;t(e)},n.onupgradeneeded=e=>{e.target.result}})}function byteCount(e){return encodeURI(e).split(/%..|./).length-1}window.currentReadOnly=!1,window.onhashchange=function(){window.currentReadOnly=!1,delete window.unsavedFileCaches,delete window.tabSavedData},module.exports={updateLanguage:updateLanguage,updateContent:updateContent,getValue:getValue,insertAtCursor:insertAtCursor,format:format,getCurrentEditorIndex:getCurrentEditorIndex,setCurrentEditorIndex:setCurrentEditorIndex,showAlertModal:showAlertModal,removeAlertModal:removeAlertModal,uploadFile:uploadFile,getModuleFile:getModuleFile,getPageFile:getPageFile,getAllUserFiles:getAllUserFiles,deleteFile:deleteFile,updateFile:updateFile,getFile:getFile,renameFile:renameFile,getFileWithId:getFileWithId,updateReadOnly:updateReadOnly,getCurrentEditorOption:getCurrentEditorOption,newMyProject:newMyProject,deleteMyProject:deleteMyProject,getMyProjects:getMyProjects,getMetaDataFromText:getMetaDataFromText,embedMetaDataIntoText:embedMetaDataIntoText,getTextWithoutMetaData:getTextWithoutMetaData,sizeOfMyProject:sizeOfMyProject,exportToJson:exportToJson,importFromJson:importFromJson,internals:{openConnectionWithNewVersion:openConnectionWithNewVersion}};