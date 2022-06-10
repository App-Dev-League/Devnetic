var LZString=function(){function n(e,t){if(!i[e]){i[e]={};for(var n=0;n<e.length;n++)i[e][e.charAt(n)]=n}return i[e][t]}var m=String.fromCharCode,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",i={},s={compressToBase64:function(e){if(null==e)return"";var t=s._compress(e,6,function(e){return o.charAt(e)});switch(t.length%4){default:case 0:return t;case 1:return t+"===";case 2:return t+"==";case 3:return t+"="}},decompressFromBase64:function(t){return null==t?"":""==t?null:s._decompress(t.length,32,function(e){return n(o,t.charAt(e))})},compressToUTF16:function(e){return null==e?"":s._compress(e,15,function(e){return m(e+32)})+" "},decompressFromUTF16:function(t){return null==t?"":""==t?null:s._decompress(t.length,16384,function(e){return t.charCodeAt(e)-32})},compressToUint8Array:function(e){for(var t=s.compress(e),n=new Uint8Array(2*t.length),o=0,r=t.length;o<r;o++){var i=t.charCodeAt(o);n[2*o]=i>>>8,n[2*o+1]=i%256}return n},decompressFromUint8Array:function(e){if(null==e)return s.decompress(e);for(var t=new Array(e.length/2),n=0,o=t.length;n<o;n++)t[n]=256*e[2*n]+e[2*n+1];var r=[];return t.forEach(function(e){r.push(m(e))}),s.decompress(r.join(""))},compressToEncodedURIComponent:function(e){return null==e?"":s._compress(e,6,function(e){return r.charAt(e)})},decompressFromEncodedURIComponent:function(t){return null==t?"":""==t?null:(t=t.replace(/ /g,"+"),s._decompress(t.length,32,function(e){return n(r,t.charAt(e))}))},compress:function(e){return s._compress(e,16,function(e){return m(e)})},_compress:function(e,t,n){if(null==e)return"";for(var o,r,i,s,a={},l={},c="",d=2,u=3,p=2,h=[],g=0,f=0,w=0;w<e.length;w+=1)if(i=e.charAt(w),Object.prototype.hasOwnProperty.call(a,i)||(a[i]=u++,l[i]=!0),s=c+i,Object.prototype.hasOwnProperty.call(a,s))c=s;else{if(Object.prototype.hasOwnProperty.call(l,c)){if(c.charCodeAt(0)<256){for(o=0;o<p;o++)g<<=1,f==t-1?(f=0,h.push(n(g)),g=0):f++;for(r=c.charCodeAt(0),o=0;o<8;o++)g=g<<1|1&r,f==t-1?(f=0,h.push(n(g)),g=0):f++,r>>=1}else{for(r=1,o=0;o<p;o++)g=g<<1|r,f==t-1?(f=0,h.push(n(g)),g=0):f++,r=0;for(r=c.charCodeAt(0),o=0;o<16;o++)g=g<<1|1&r,f==t-1?(f=0,h.push(n(g)),g=0):f++,r>>=1}0==--d&&(d=Math.pow(2,p),p++),delete l[c]}else for(r=a[c],o=0;o<p;o++)g=g<<1|1&r,f==t-1?(f=0,h.push(n(g)),g=0):f++,r>>=1;0==--d&&(d=Math.pow(2,p),p++),a[s]=u++,c=String(i)}if(""!==c){if(Object.prototype.hasOwnProperty.call(l,c)){if(c.charCodeAt(0)<256){for(o=0;o<p;o++)g<<=1,f==t-1?(f=0,h.push(n(g)),g=0):f++;for(r=c.charCodeAt(0),o=0;o<8;o++)g=g<<1|1&r,f==t-1?(f=0,h.push(n(g)),g=0):f++,r>>=1}else{for(r=1,o=0;o<p;o++)g=g<<1|r,f==t-1?(f=0,h.push(n(g)),g=0):f++,r=0;for(r=c.charCodeAt(0),o=0;o<16;o++)g=g<<1|1&r,f==t-1?(f=0,h.push(n(g)),g=0):f++,r>>=1}0==--d&&(d=Math.pow(2,p),p++),delete l[c]}else for(r=a[c],o=0;o<p;o++)g=g<<1|1&r,f==t-1?(f=0,h.push(n(g)),g=0):f++,r>>=1;0==--d&&(d=Math.pow(2,p),p++)}for(r=2,o=0;o<p;o++)g=g<<1|1&r,f==t-1?(f=0,h.push(n(g)),g=0):f++,r>>=1;for(;;){if(g<<=1,f==t-1){h.push(n(g));break}f++}return h.join("")},decompress:function(t){return null==t?"":""==t?null:s._decompress(t.length,32768,function(e){return t.charCodeAt(e)})},_decompress:function(e,t,n){for(var o,r,i,s,a,l,c=[],d=4,u=4,p=3,h="",g=[],f={val:n(0),position:t,index:1},w=0;w<3;w+=1)c[w]=w;for(r=0,s=Math.pow(2,2),a=1;a!=s;)i=f.val&f.position,f.position>>=1,0==f.position&&(f.position=t,f.val=n(f.index++)),r|=(0<i?1:0)*a,a<<=1;switch(r){case 0:for(r=0,s=Math.pow(2,8),a=1;a!=s;)i=f.val&f.position,f.position>>=1,0==f.position&&(f.position=t,f.val=n(f.index++)),r|=(0<i?1:0)*a,a<<=1;l=m(r);break;case 1:for(r=0,s=Math.pow(2,16),a=1;a!=s;)i=f.val&f.position,f.position>>=1,0==f.position&&(f.position=t,f.val=n(f.index++)),r|=(0<i?1:0)*a,a<<=1;l=m(r);break;case 2:return""}for(o=c[3]=l,g.push(l);;){if(f.index>e)return"";for(r=0,s=Math.pow(2,p),a=1;a!=s;)i=f.val&f.position,f.position>>=1,0==f.position&&(f.position=t,f.val=n(f.index++)),r|=(0<i?1:0)*a,a<<=1;switch(l=r){case 0:for(r=0,s=Math.pow(2,8),a=1;a!=s;)i=f.val&f.position,f.position>>=1,0==f.position&&(f.position=t,f.val=n(f.index++)),r|=(0<i?1:0)*a,a<<=1;c[u++]=m(r),l=u-1,d--;break;case 1:for(r=0,s=Math.pow(2,16),a=1;a!=s;)i=f.val&f.position,f.position>>=1,0==f.position&&(f.position=t,f.val=n(f.index++)),r|=(0<i?1:0)*a,a<<=1;c[u++]=m(r),l=u-1,d--;break;case 2:return g.join("")}if(0==d&&(d=Math.pow(2,p),p++),c[l])h=c[l];else{if(l!==u)return null;h=o+o.charAt(0)}g.push(h),c[u++]=o+h.charAt(0),o=h,0==--d&&(d=Math.pow(2,p),p++)}}};return s}(),Base64=("function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module&&(module.exports=LZString),{_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t,n,o,r,i,s,a="",l=0;for(e=Base64._utf8_encode(e);l<e.length;)o=(t=e.charCodeAt(l++))>>2,r=(3&t)<<4|(t=e.charCodeAt(l++))>>4,i=(15&t)<<2|(n=e.charCodeAt(l++))>>6,s=63&n,isNaN(t)?i=s=64:isNaN(n)&&(s=64),a=a+this._keyStr.charAt(o)+this._keyStr.charAt(r)+this._keyStr.charAt(i)+this._keyStr.charAt(s);return a},decode:function(e){var t,n,o,r,i,s,a="",l=0;for(e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");l<e.length;)o=this._keyStr.indexOf(e.charAt(l++)),t=(15&(r=this._keyStr.indexOf(e.charAt(l++))))<<4|(i=this._keyStr.indexOf(e.charAt(l++)))>>2,n=(3&i)<<6|(s=this._keyStr.indexOf(e.charAt(l++))),a+=String.fromCharCode(o<<2|r>>4),64!=i&&(a+=String.fromCharCode(t)),64!=s&&(a+=String.fromCharCode(n));return Base64._utf8_decode(a)},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");for(var t="",n=0;n<e.length;n++){var o=e.charCodeAt(n);o<128?t+=String.fromCharCode(o):t=127<o&&o<2048?(t+=String.fromCharCode(o>>6|192))+String.fromCharCode(63&o|128):(t=(t+=String.fromCharCode(o>>12|224))+String.fromCharCode(o>>6&63|128))+String.fromCharCode(63&o|128)}return t},_utf8_decode:function(e){var t,n="",o=0;for(c1=c2=0;o<e.length;)(t=e.charCodeAt(o))<128?(n+=String.fromCharCode(t),o++):191<t&&t<224?(c2=e.charCodeAt(o+1),n+=String.fromCharCode((31&t)<<6|63&c2),o+=2):(c2=e.charCodeAt(o+1),c3=e.charCodeAt(o+2),n+=String.fromCharCode((15&t)<<12|(63&c2)<<6|63&c3),o+=3);return n}});const codeEditorHelper=require("./codeEditor.js");function openConnection(){return new Promise((t,e)=>{const n=indexedDB.open("PLUGINS",1);n.onsuccess=e=>{e=e.target.result;t(e)},n.onupgradeneeded=e=>{let t=e.target.result,n=t.createObjectStore("Plugincode",{autoIncrement:!0});n.createIndex("pluginIds","pluginId",{unique:!0})}})}function deletePlugin(i){openConnection().then(e=>{const t=e.transaction("Plugincode","readwrite"),n=t.objectStore("Plugincode"),o=n.index("pluginIds");let r=o.openKeyCursor(i);r.onsuccess=function(e){n.delete(e.target.result.primaryKey)},r.onerror=function(e){console.log(e.target.errorCode)},t.oncomplete=function(){e.close()}})}function addPlugin(r,i){openConnection().then(e=>{const t=e.transaction("Plugincode","readwrite"),n=t.objectStore("Plugincode");let o=n.put({pluginId:r,code:i});o.onsuccess=function(e){},o.onerror=function(e){console.log(e.target.errorCode)},t.oncomplete=function(){e.close()}})}function getPlugin(s){return new Promise((i,e)=>{openConnection().then(e=>{const t=e.transaction("Plugincode","readwrite"),n=t.objectStore("Plugincode"),o=n.index("pluginIds");let r=o.get(s);r.onsuccess=function(e){i(e.target.result)},r.onerror=function(e){console.log(e.target.errorCode)},t.oncomplete=function(){e.close()}})})}function sleep(t){return new Promise(e=>setTimeout(e,t))}module.exports={async load(e){if(window.pluginList&&("loading"===window.pluginList[e]||"loaded"===window.pluginList[e]))return"Error: plugin is currently loading/already loaded";window.pluginList||(window.pluginList={}),window.pluginList[e]="loading";let t=await getPlugin(e);if(!t)throw delete window.pluginList[e],"Error: plugin "+e+" not found locally!";var n=(t=(t=t.code).slice(t.indexOf("||STARTPLUGIN||")+15)).toString(),o=document.createElement("script");return o.type="text/javascript",o.innerHTML=n,o.id="plugin-"+e,$("body").append(o),window.pluginList[e]="loaded",!0},async getCode(e){let t=await getPlugin(e);if(t)return t=(t=t.code).slice(t.indexOf("||STARTPLUGIN||")+15);throw delete window.pluginList[e],"Error: plugin "+e+" not found locally!"},async getVersion(e){let t=await getPlugin(e);return t=(t=t.code).slice(0,t.indexOf("||STARTPLUGIN||"))},async download(t,e,n,o){var r;try{r=await fetch("/assets/plugins/"+t+"/"+t+".min.js")}catch(e){return codeEditorHelper.showAlertModal("We couldn't download the plugin! Check your internet connection and try again",[{text:"Ok",onclick:function(){codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute("data-editor-alert-modal-index"))}}],"codicon-error"),n&&n("failed"),!1}let i=r.clone();e&&e(r.clone());const s=r.body.getReader();let a=0;for(e=Number(r.headers.get("content-length"));;){var l=await s.read();if(l.done)break;a+=l.value.length}let c=await fetch("/assets/plugins/"+t+"/VERSION.txt");c=await c.text(),r=await i.text(),5e6<e&&(codeEditorHelper.showAlertModal("The plugin you are trying to download is very large! Your browser may freeze up while downloading for 15-30 seconds. Please do not close this tab.",[{text:"Ok",onclick:function(){codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute("data-editor-alert-modal-index"))}}],"codicon-warning",1),await sleep(1e3)),addPlugin(t,c+"||STARTPLUGIN||"+r),n&&n(!0);e=this.availablePlugins().find(e=>e.id==t).name;return o||codeEditorHelper.showAlertModal("Successfully downloaded plugin "+e,[{text:"Ok",onclick:function(){codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute("data-editor-alert-modal-index"))}}],"codicon-pass",7),!0},unload(e){var t=document.getElementById("plugin-"+e);if(!t)throw"Error: plugin "+e+" was never loaded";t.remove(),delete window.pluginList[e]},remove(t){deletePlugin(t);var e=this.availablePlugins().find(e=>e.id==t).name;codeEditorHelper.showAlertModal("Successfully removed plugin "+e,[{text:"Ok",onclick:function(){codeEditorHelper.removeAlertModal(this.parentElement.parentElement.getAttribute("data-editor-alert-modal-index"))}}],"codicon-pass",4)},availablePlugins(){return[{name:"Resizable Editor",description:"This plugin allows you to resize the editor window, as well as re-arange the tabs.",image:"/assets/plugins/betterEditor/betterEditor.png",id:"betterEditor",onInstall:'plugins.load("betterEditor").then(() => updateEditorSettings({dividerPosition: null}))',latestVersion:"2.4.4"},{name:"Brython",description:"This plugin allows you to run python in the browser!",image:"/assets/plugins/brython/brython.svg",id:"brython",latestVersion:"3.0.1"},{name:"JS-CPP",description:"This plugin compiles C++ code to Javascript!",image:"/assets/plugins/jscpp/jscpp.svg",id:"jscpp",latestVersion:"0.0.1"},{name:"Typescript",description:"This plugin allows you to run typescript in the browser!",image:"/assets/plugins/typescript/typescript.svg",id:"typescript",latestVersion:"0.0.1"},{name:"Markdown",description:"This plugin allows you to render markdown code in the browser!",image:"/assets/plugins/showdown/markdown-logo.png",id:"showdown",latestVersion:"2.1.0"},{name:"ReactJS",description:"This plugin allows you to create and preview a ReactJS website!",image:"/assets/plugins/react/react.svg",id:"react",latestVersion:"3.1.1"},{name:"Perl",description:"This plugin allows you to run perl code directly in the browser!!",image:"/assets/plugins/webperl/webperl.png",id:"webperl",latestVersion:"1.0.0"},{name:"Hex Editor",description:"View and edit binary files in the code editor!",image:"/assets/plugins/hexy/logo.png",id:"hexy",latestVersion:"1.0.0"}]},async checkPluginStatus(e){return!!await getPlugin(e)},async getDownloadSize(e){if(!window.pluginSizes){let e=await fetch("/assets/plugins/sizes.json");e=await e.json(),window.pluginSizes=e}return window.pluginSizes[e]},async getOldPlugins(){let e=this.availablePlugins(),t=[],n=[];var o=this;let r=[];return e.forEach(e=>{r.push(async function(){await o.checkPluginStatus(e.id)&&t.push(e)}())}),await Promise.all(r),r=[],t.forEach(e=>{r.push(async function(){await o.getVersion(e.id)!==e.latestVersion&&n.push(e)}())}),await Promise.all(r),n},Base64:Base64};