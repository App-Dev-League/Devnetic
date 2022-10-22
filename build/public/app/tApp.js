class tApp{static config={};static routes={};static cache={};static components={};static cacheSize=0;static started=!1;static database;static currentHash="/";static debugComponentTiming;static debugComponentRendering;static updateQueue=[];static queueTimer=10;static optimizedUpdating=!0;static get version(){return"v0.10.10"}static configure(e){if(null==e)throw"tAppError: No params specified for configuring.";if(tApp.started)throw"tAppError: tApp has already started.";e=tApp.validateConfig(e);if(!e.valid)throw e.error;tApp.config=e.params}static validateConfig(e){return null==e.target||e.target instanceof HTMLElement?null==e.ignoreRoutes||e.ignoreRoutes instanceof Array?null==e.forbiddenRoutes||e.forbiddenRoutes instanceof Array?null==e.errorPages||e.errorPages instanceof Object?null==e.caching||e.caching instanceof Object?null==e.caching||null==e.caching.backgroundPages||e.caching.backgroundPages instanceof Array?(null!=e.caching&&null==e.caching.backgroundPages&&(e.caching.backgroundPages=[]),null!=e.caching&&null==e.caching.persistent&&(e.caching.persistent=!1),null==window.indexedDB&&e.caching.persistent&&(console.warn("tAppWarning: Persistent caching is not available in this browser."),e.caching.persistent=!1),{valid:!0,params:e}):{valid:!1,error:"tAppError: Invalid configure parameter, caching.backgroundPages is not of type Array."}:{valid:!1,error:"tAppError: Invalid configure parameter, caching is not of type Object."}:{valid:!1,error:"tAppError: Invalid configure parameter, errorPages is not of type Object."}:{valid:!1,error:"tAppError: Invalid configure parameter, forbiddenRoutes is not of type Array."}:{valid:!1,error:"tAppError: Invalid configure parameter, ignoreRoutes is not of type Array."}:{valid:!1,error:"tAppError: Invalid configure parameter, target is not of type HTMLElement."}}static route(e,t){if("/"!=e&&"#"!=e.substring(0,1))throw'tAppError: Invalid path, the path can only be "/" or start with "#".';tApp.routes[e]=t,tApp.started&&tApp.updatePage(window.location.hash)}static getCachedPage(e){return new Promise((n,r)=>{if(null==tApp.config.caching)n(null);else if(tApp.config.caching.persistent){let t=tApp.database.transaction(["cachedPages"],"readwrite").objectStore("cachedPages").get(e);t.onerror=e=>{r("tAppError: Persistent caching is not available in this browser.")},t.onsuccess=e=>{n(t.result)}}else n(tApp.cache[e])})}static setCachedPage(r,a){return new Promise((t,n)=>{if(null==tApp.config.caching)t(!1);else if(tApp.config.caching.persistent){r=r.slice(0,r.indexOf("?"));let e=tApp.database.transaction(["cachedPages"],"readwrite").objectStore("cachedPages").put(a,r);e.onerror=e=>{n("tAppError: Persistent caching is not available in this browser.")},e.onsuccess=e=>{t(!0)}}else tApp.cache[r]=a,t(!0)})}static removeCachedPage(a){return new Promise(async(n,r)=>{if(null==tApp.config.caching)n(null);else if(tApp.config.caching.persistent){let t=await tApp.getCachedPage(a),e=tApp.database.transaction(["cachedPages"],"readwrite").objectStore("cachedPages").delete(a);e.onerror=e=>{r("tAppError: Persistent caching is not available in this browser.")},e.onsuccess=e=>{n(t)}}else{var e=tApp.cache[a];delete tApp.cache[a],n(e)}})}static getCachedPaths(){return new Promise((n,r)=>{if(null==tApp.config.caching)n([]);else if(tApp.config.caching.persistent){let t=tApp.database.transaction(["cachedPages"],"readwrite").objectStore("cachedPages").getAllKeys();t.onerror=e=>{r("tAppError: Persistent caching is not available in this browser.")},t.onsuccess=e=>{n(t.result)}}else n(Object.keys(tApp.cache))})}static getCachedPages(){return new Promise(async(e,t)=>{if(null==tApp.config.caching)e({});else if(tApp.config.caching.persistent){var n=await tApp.getCachedPaths();let t={};for(let e=0;e<n.length;e++)t[n[e]]=await tApp.getCachedPage(n[e]);e(t)}else e(tApp.cache)})}static clearCachedPages(){return new Promise((t,n)=>{if(null==tApp.config.caching)t(!1);else if(tApp.config.caching.persistent){let e=tApp.database.transaction(["cachedPages"],"readwrite").objectStore("cachedPages").clear();e.onerror=e=>{n("tAppError: Persistent caching is not available in this browser.")},e.onsuccess=e=>{t(!0)}}else tApp.cache={},t(!0)})}static getOfflineData(e){return new Promise((t,n)=>{let r=tApp.database.transaction(["offlineStorage"],"readwrite").objectStore("offlineStorage").get(e);r.onerror=e=>{n("tAppError: Offline storage is not available in this browser.")},r.onsuccess=e=>{t(r.result)}})}static setOfflineData(r,a){return new Promise((t,n)=>{let e=tApp.database.transaction(["offlineStorage"],"readwrite").objectStore("offlineStorage").put(a,r);e.onerror=e=>{n("tAppError: Offline storage is not available in this browser.")},e.onsuccess=e=>{t(!0)}})}static removeOfflineData(a){return new Promise(async(t,n)=>{let r=await tApp.getOfflineData(a),e=tApp.database.transaction(["offlineStorage"],"readwrite").objectStore("offlineStorage").delete(a);e.onerror=e=>{n("tAppError: Offline storage is not available in this browser.")},e.onsuccess=e=>{t(r)}})}static getAllOfflineDataKeys(){return new Promise((t,n)=>{let r=tApp.database.transaction(["offlineStorage"],"readwrite").objectStore("offlineStorage").getAllKeys();r.onerror=e=>{n("tAppError: Offline storage is not available in this browser.")},r.onsuccess=e=>{t(r.result)}})}static getAllOfflineData(){return new Promise(async(e,t)=>{var n=await tApp.getAllOfflineDataKeys();let r={};for(let e=0;e<n.length;e++)r[n[e]]=await tApp.getOfflineData(n[e]);e(r)})}static clearOfflineData(){return new Promise((t,n)=>{let e=tApp.database.transaction(["offlineStorage"],"readwrite").objectStore("offlineStorage").clear();e.onerror=e=>{n("tAppError: Offline storage is not available in this browser.")},e.onsuccess=e=>{t(!0)}})}static get(t,i=!1){return new Promise(async(n,r)=>{let a=new URL(t,window.location.href).href.split("#")[0],o=await tApp.getCachedPage(a);var e;fetch(t,{headers:{"tApp-Ignore-Cache":"Ignore-Cache"}}).then(t=>{i?n(t):t.clone().arrayBuffer().then(e=>{200===t.status||0===t.status?(tApp.setCachedPage(a,{data:e,cachedAt:(new Date).getTime(),response:function(e){let n={};for(var t in e)"bodyUsed"!=t&&"object"!=typeof e[t]&&"function"!=typeof e[t]&&(n[t]=e[t]);return null!=e.headers&&(n.headers={},e.headers.forEach((e,t)=>{n.headers[t]=e})),n}(t)}),null==o&&n(t)):r(t)})}).catch(e=>{null==o&&r(e)}),i||null==o||(e=new Response(o.data,o.response),Object.defineProperty(e,"url",{value:a}),n(e))})}static redirect(e,t=document.title){history.replaceState(history.state,t,e),tApp.updatePage(e)}static render(e){if(null==e)throw"tAppError: No HTML specified for rendering.";if(null==tApp.config.target)throw"tAppError: No target DOM specified, use tApp.config.target to set the target.";tApp.config.target.innerHTML=e,function e(t){if("SCRIPT"===t.tagName==1)t.parentNode.replaceChild(function(e){for(var t,n=document.createElement("script"),r=(n.text=e.innerHTML,-1),a=e.attributes;++r<a.length;)n.setAttribute((t=a[r]).name,t.value);return n}(t),t);else for(var n=-1,r=t.childNodes;++n<r.length;)e(r[n])}(tApp.config.target)}static renderFile(e){return new Promise(async(t,n)=>{tApp.get(e).then(e=>{e.clone().text().then(e=>{tApp.render(e),t()})}).catch(e=>{n(e)})})}static escape(e){let t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};return e.replace(/[&<>"']/g,function(e){return t[e]})}static unescape(t){var n={"&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'","&amp;":"&"},r=Object.keys(n);for(let e=0;e<r.length;e++)t=t.replaceAll(r[e],n[r[e]]);return t}static eval(code){return eval(code)}static optionsToEval(n){let r="";var a=Object.keys(n);for(let t=0;t<a.length;t++)if("function"==typeof n[a[t]])r+="let "+a[t]+" = "+n[a[t]].toString()+";";else try{r+="let "+a[t]+" = "+JSON.stringify(n[a[t]])+";"}catch(e){r+="let "+a[t]+" = "+n[a[t]]+";"}return r}static restoreOptions(e){let t="let _____tApp_____returnOptions = {};";var n=Object.keys(e);for(let e=0;e<n.length;e++)t+="_____tApp_____returnOptions."+n[e]+" = "+n[e]+";";return t}static evalInContext(e,t){return null==t&&(t={}),tApp.eval(tApp.optionsToEval(t)+`let _____tApp_____result = (function() {return eval("${e.replaceAll('"','\\"')}")})();${tApp.restoreOptions(t)}[_____tApp_____result, _____tApp_____returnOptions]`)}static getComponentFromDOM(e){for(;null!=e&&"#"!=e.nodeName.substring(0,1)&&null==e.getAttribute("tapp-component");)e=e.parentNode;return null==e||"#"==e.nodeName.substring(0,1)?null:tApp.getComponent(e.getAttribute("tapp-component"))}static getComponent(e){return tApp.components[e]}static removeComponent(e){let t=document.querySelectorAll(`[tapp-component="${e}"]`);for(let e=0;e<t.length;e++)t[e].remove();return null!=tApp.getComponent(e)&&(delete tApp.components[e],!0)}static updateDOM(){tApp.updateComponent(tApp.GlobalComponent,!0)}static queueUpdateComponent(t,e=tApp.queueTimer){tApp.updateQueue.includes(t.id)||(tApp.updateQueue.push(t.id),setTimeout(()=>{tApp.updateQueue.splice(tApp.updateQueue.findIndex(e=>e==t.id),1),tApp.updateComponent(t,!0)},e))}static updateComponent(t,e=!1){null!=tApp.debugComponentRendering&&("function"==typeof tApp.debugComponentRendering?tApp.debugComponentRendering(t,e):tApp.debugComponentRendering&&console.log("update",t,e));let n;null!=tApp.debugComponentTiming&&e&&(n=(new Date).getTime()),t.componentWillUpdate();var r,a=((r=tApp.compileComponent(t,t.props,t.parent)).includes("<body")?(new DOMParser).parseFromString(r,"text/html"):(new DOMParser).parseFromString(r,"text/html").body).childNodes[0],o=document.querySelectorAll(`[tapp-component="${t.id}"]`);for(let e=0;e<o.length;e++)!function a(i,l){if(i.nodeName!=l.nodeName)l.outerHTML=i.outerHTML;else{if(null!=i.attributes&&null!=l.attributes){let n=[],r=[],a=[...i.attributes],o=[...l.attributes];(null!=l.value&&""!=l.value||null!=i.value&&""!=i.value)&&(""!=l.value&&null!=l.value||""==i.value&&null==i.value?l.value!=i.value&&r.push({nodeName:"value",nodeValue:l.value}):n.push({nodeName:"value",nodeValue:""}));for(let t=0;t<a.length;t++){var e;"value"!=a[t].nodeName&&(null==(e=o.find(e=>e.nodeName==a[t].nodeName))?n.push(a[t]):e.nodeValue!=a[t].nodeValue&&r.push(o[t]))}for(let t=0;t<o.length;t++)"value"!=o[t].nodeName&&null==a.find(e=>e.nodeName==o[t].nodeName)&&r.push(o[t]);for(let e=0;e<n.length;e++)"value"==n[e].nodeName?i.value="":i.removeAttribute(n[e].nodeName);for(let e=0;e<r.length;e++)"value"==r[e].nodeName?i.value=r[e].nodeValue:i.setAttribute(r[e].nodeName,r[e].nodeValue)}if("#text"==i.nodeName&&"#text"==l.nodeName&&i.textContent!=l.textContent&&(i.textContent=l.textContent),0==l.childNodes.length||1==l.childNodes.length&&"#text"==l.childNodes[0].nodeName)i.innerHTML!=l.innerHTML&&(i.innerHTML=l.innerHTML);else if(function(t,n){if(t.childNodes.length==n.childNodes.length){for(let e=0;e<t.childNodes.length;e++)if(t.nodeName!=n.nodeName)return;return 1}}(i,l))for(let e=0;e<l.childNodes.length;e++)a(i.childNodes[e],l.childNodes[e]);else{let r=[...i.childNodes],e=[...l.childNodes];var o=[...i.childNodes],p=[...l.childNodes];let t=0,n=0;for(;t<r.length||n<e.length;)t>=r.length?r.splice(t,0,null):n>=e.length?e.splice(n,0,null):r[t].nodeName!=e[n].nodeName&&(p.length<o.length?e.splice(n,0,null):r.splice(t,0,null)),t++,n++;for(let n=0;n<r.length;n++){var s=r.length==r.filter(e=>null==e||"#text"==e.nodeName).length;if(null!=r[n]||null!=e[n])if(null==r[n])if(s)i.appendChild(e[n]);else{let t;for(let e=n;null==t&&e<r.length;e++)null!=r[e]&&(t=r[e]);if(null==t){let t;for(let e=n;null==t&&e<r.length;e--)null!=r[e]&&(t=r[e]);t.after(e[n]),r[n]=e[n]}else t.before(e[n]),r[n]=e[n]}else null==e[n]?(r[n].remove(),r[n]=null):a(r[n],e[n])}}}}(o[e],a);t.componentHasUpdated();for(let e=0;e<t.children.length;e++)tApp.updateComponent(t.children[e]);t.componentChildrenHaveUpdated(),null!=tApp.debugComponentTiming&&e&&("function"==typeof tApp.debugComponentTiming?tApp.debugComponentTiming((new Date).getTime()-n):tApp.debugComponentTiming&&console.log((new Date).getTime()-n+"ms"))}static compileComponent(i,l={},t="global"){if(i instanceof tApp.Component){tApp.components[i.id]=i,"string"==typeof l&&(l=JSON.parse(l));let e=i.render(l),t=null,n=(null!=i.parent&&(t=i.parent.state),null);if(null!=i.parent&&(n=i.parent.id),1!=((p=e).includes("</body>")?(new DOMParser).parseFromString(p,"text/html"):(new DOMParser).parseFromString(p,"text/html").body).childNodes.length)throw"tAppComponentError: Component render output must contain exactly one node/element but can contain subnodes/subelements. To resolve this issue, wrap the entire output of the render in a div or another grouping element. If you only have one node/element, unintentional whitespace at the beginning or end of the render output could be the source of the issue since whitespace can be interpreted as a text node/element.";let r=(p=e).includes("</html>")?(new DOMParser).parseFromString(p,"text/html").children[0]:p.includes("</head>")?(new DOMParser).parseFromString(p,"text/html").body.parentNode.children[0]:p.includes("</body>")?(new DOMParser).parseFromString(p,"text/html").body.parentNode.children[1]:(new DOMParser).parseFromString(p,"text/html").body.childNodes[0],a=(r.setAttribute("tapp-component",i.id),(e=r.outerHTML).matchAll(new RegExp("{{{[\\s|\\t]*(.+?(?=}}}))[\\s|\\t]*}}}","g"))),o=a.next();for(;!o.done;)e=e.replace(o.value[0],tApp.unescape(o.value[0])),o=a.next();for(a=e.matchAll(new RegExp("{%[\\s|\\t]*(.+?(?=%}))[\\s|\\t]*%}","g")),o=a.next();!o.done;)e=e.replace(o.value[0],tApp.unescape(o.value[0])),o=a.next();for(a=e.matchAll(new RegExp("\\[\\[[\\s|\\t]*(.+?(?=\\]\\]))[\\s|\\t]*\\]\\]","g")),o=a.next();!o.done;)e=e.replace(o.value[0],tApp.unescape(o.value[0])),o=a.next();return tApp.compileTemplate(e,{props:l,state:i.state,parent:{state:t,id:n},_this:"tApp.getComponentFromDOM(this)",_parent:`tApp.getComponent("${n}")`},i.id)}{function n(t){let n="",r=!1;for(let e=0;e<t.length;e++)(r=!r&&" "!=t[e]&&"\t"!=t[e]||r)&&(n+=t[e]);r=!1;let a=n.length-1;for(let e=n.length-1;0<=e;e--)r||" "==n[e]||"\t"==n[e]||(r=!0,a=e);return n=n.substring(0,a+1)}p=n(i.substring(0,i.indexOf("{"))),i=n(i.substring(i.indexOf("{"))),i=tApp.evalInContext("let _____tApp_____componentProps = "+i+"; _____tApp_____componentProps",l);let e=tApp.evalInContext(`new ${p}({}, _____tApp_____parent)`,{_____tApp_____parent:t})[0];return e.props=i[0],tApp.compileComponent(e,i[0])}var p}static compileTemplate(e,o,i="global"){function l(t){let n="",r=!1;for(let e=0;e<t.length;e++)(r=!r&&" "!=t[e]&&"\t"!=t[e]||r)&&(n+=t[e]);r=!1;let a=n.length-1;for(let e=n.length-1;0<=e;e--)r||" "==n[e]||"\t"==n[e]||(r=!0,a=e);return n=n.substring(0,a+1)}let t=e.matchAll(new RegExp("{#.+?(?=#})#}","g")),n=t.next();for(;!n.done;)e=e.replace(n.value[0],""),n=t.next();var r,p=(e=(e=(e=function t(n,r,a){var o=Object.keys(r);for(let e=0;e<o.length;e++)n=r[o[e]]instanceof Object?t(n,r[o[e]],a+o[e]+"."):n.replaceAll(new RegExp("{{[\\s|\\t]*"+a+o[e]+"[\\s|\\t]*}}","g"),r[o[e]]);return n}(e=(e=(e=function(t){let n=[],r=[],a="";for(let e=0;e<t.length;e++)""==a&&["[","]","{","}"].includes(t[e])?(r.push(t[e]),a=t[e]):"{{{"==a||"[["==a?("{{{"==a&&"\n"==t[e]||"[["==a&&"\n"==t[e]||r.push(t[e]),n.push(a),a=["[","]","{","}"].includes(t[e])?t[e]:""):"{{{"==n[n.length-1]&&"}}}"==a||"[["==n[n.length-1]&&"]]"==a?(r.push(t[e]),n.pop(),a=["[","]","{","}"].includes(t[e])?t[e]:""):t[e]==a[0]?(r.push(t[e]),a+=t[e]):(a=["[","]","{","}"].includes(t[e])?t[e]:"","{{{"==n[n.length-1]&&"\n"==t[e]||"[["==n[n.length-1]&&"\n"==t[e]||r.push(t[e]));return r.join("")}(e)).replaceAll("{{\\{","{{\\\\{")).replaceAll("{{{","{{\\{"),o,"")).replaceAll("{\\{","{{")).replaceAll("{\\\\{","{\\{")).split("\n");let s=[],c=[],u=[],a="";for(let a=0;a<p.length;a++){let e=l(p[a]);if("IF"==s[s.length-1]&&"{%endif%}"==e.replaceAll(" ","").replaceAll("\t",""))s.pop(),c.pop();else if("WHILE"==s[s.length-1]&&"{%endwhile%}"==e.replaceAll(" ","").replaceAll("\t",""))c[c.length-1].result=tApp.eval(tApp.optionsToEval(o)+c[c.length-1].condition),c[c.length-1].result?a=c[c.length-1].startLine:(s.pop(),c.pop());else if("{%"==e.substring(0,2)&&"%}"==e.substring(e.length-2,e.length)){let t=l(e.substring(2,e.length-2));if(["if ","if\t","if("].includes(t.substring(0,3))){s.push("IF");var d=l(t.substring(2));let e=!0;"IF"!=s[s.length-2]&&"WHILE"!=s[s.length-2]||(e=c[c.length-1].result),c.push({result:tApp.eval(tApp.optionsToEval(o)+d)&&e,additional:e}),c[c.length-1].executed=c[c.length-1].result}else if(["elseif ","elseif\t","elseif("].includes(t.substring(0,7))){if("IF"!=s[s.length-1])throw"tAppError: Else-if missing an if-statement on line "+(a+1)+".";c[c.length-1].executed?c[c.length-1].result=!1:(d=l(t.substring(6)),c[c.length-1].result=tApp.eval(tApp.optionsToEval(o)+d)&&c[c.length-1].additional,c[c.length-1].executed=c[c.length-1].result)}else if(["else if ","else if\t","else if("].includes(t.substring(0,8))){if("IF"!=s[s.length-1])throw"tAppError: Else-if missing an if-statement on line "+(a+1)+".";c[c.length-1].executed?c[c.length-1].result=!1:(r=l(t.substring(7)),c[c.length-1].result=tApp.eval(tApp.optionsToEval(o)+r)&&c[c.length-1].additional,c[c.length-1].executed=c[c.length-1].result)}else if("{%else%}"==e.replaceAll(" ","").replaceAll("\t","")){if("IF"!=s[s.length-1])throw"tAppError: Else missing an if-statement on line "+(a+1)+".";c[c.length-1].result=!c[c.length-1].executed&&c[c.length-1].additional,c[c.length-1].executed=c[c.length-1].result}else["while ","while\t","while("].includes(t.substring(0,6))&&(s.push("WHILE"),r=l(t.substring(5)),c.push({condition:r,result:tApp.eval(tApp.optionsToEval(o)+r),startLine:a}))}else if("IF"==s[s.length-1]&&c[c.length-1].result||null==s[s.length-1]||"WHILE"==s[s.length-1]&&c[c.length-1].result){let t=p[a],n=t.matchAll(new RegExp("{{{@[\\s|\\t]*(.+?(?=}}}))[\\s|\\t]*}}}","g")),r=n.next();for(;!r.done;)o=tApp.evalInContext(l(r.value[1]),o)[1],t=t.replace(r.value[0],""),r=n.next();for(n=t.matchAll(new RegExp("{{{[\\s|\\t]*(.+?(?=}}}))[\\s|\\t]*}}}","g")),r=n.next();!r.done;){let e=tApp.evalInContext(l(r.value[1]),o);null==e[0]&&(e[0]=""),o=e[1],t=t.replace(r.value[0],e[0]),r=n.next()}for(n=t.matchAll(new RegExp("\\[\\[[\\s|\\t]*(.+?(?=\\]\\]))[\\s|\\t]*\\]\\]","g")),r=n.next();!r.done;)t=t.replace(r.value[0],tApp.compileComponent(r.value[1],o,i)),r=n.next();u.push(t)}}return a=(a=(a=u.join("\n")).replaceAll("{\\%","{%")).replaceAll("{{\\{","{{{")}static renderTemplateHTML(e,t){e=tApp.compileTemplate(e,t),tApp.render(e)}static renderTemplate(n,r){return new Promise(async(e,t)=>{tApp.get(n).then(e=>{e.clone().text().then(e=>{tApp.renderTemplateHTML(e,r)})}).catch(e=>{t(e)})})}static renderPath(e){if(null==e)throw"tAppError: No path specified for rendering.";tApp.updatePage(e)}static updatePage(e){null!=e&&""!=e||(e="/");var t=tApp.currentHash,i=(tApp.currentHash=e).split("/").filter(e=>""!=e);if(!(null!=tApp.config.ignoreRoutes&&tApp.config.ignoreRoutes instanceof Array&&tApp.config.ignoreRoutes.includes(e)))if(null!=tApp.config.forbiddenRoutes&&tApp.config.forbiddenRoutes instanceof Array&&tApp.config.forbiddenRoutes.includes(e)&&null!=tApp.config.errorPages&&null!=tApp.config.errorPages.forbidden)tApp.updatePage(tApp.config.errorPages.forbidden);else if(null!=tApp.routes[e])tApp.routes[e]({type:"GET",path:e,referrer:t,data:null});else{let r=Object.keys(tApp.routes),a,o={};for(let e=0;e<r.length;e++)if(null==a){let n=r[e].split("/").filter(e=>""!=e);if(i.length==n.length){let t=!0;for(let e=0;e<i.length;e++)t&&i[e]!=n[e]&&("<"==n[e][0]&&">"==n[e][n[e].length-1]?o[n[e].substring(1,n[e].length-1)]=decodeURI(i[e]):t=!1);t?a=r[e]:o={}}}null!=a?tApp.routes[a]({type:"GET",path:e,referrer:t,data:o}):null!=tApp.config.errorPages&&null!=tApp.config.errorPages.notFound?tApp.updatePage(tApp.config.errorPages.notFound):tApp.render("")}}static loadBackgroundPages(){if(null!=tApp.config.caching){for(let e=0;e<tApp.config.caching.backgroundPages.length;e++)tApp.get(tApp.config.caching.backgroundPages[e]);null!=tApp.config.caching.periodicUpdate&&setTimeout(()=>{tApp.loadBackgroundPages()},tApp.config.caching.periodicUpdate)}}static start(){return new Promise((n,e)=>{if(tApp.started)e("tAppError: tApp has already started.");else if(tApp.started=!0,null!=tApp.config.caching&&tApp.config.caching.persistent){Object.defineProperty(window,"indexedDB",{value:window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB}),Object.defineProperty(window,"IDBTransaction",{value:window.IDBTransaction||window.webkitIDBTransaction||window.msIDBTransaction}),Object.defineProperty(window,"IDBKeyRange",{value:window.IDBKeyRange=window.IDBKeyRange||window.webkitIDBKeyRange||window.msIDBKeyRange});let t=window.indexedDB.open("tAppCache",5);t.onerror=e=>{console.warn("tAppWarning: Persistent caching is not available in this browser."),tApp.config.caching.persistent=!1,0<Object.keys(tApp.routes).length&&(window.addEventListener("hashchange",()=>{tApp.updatePage(window.location.hash)},!1),tApp.updatePage(window.location.hash)),tApp.loadBackgroundPages(),n(!0)},t.onsuccess=async e=>{tApp.database=t.result,0<Object.keys(tApp.routes).length&&(window.addEventListener("hashchange",()=>{tApp.updatePage(window.location.hash)},!1),tApp.updatePage(window.location.hash)),tApp.loadBackgroundPages(),n(!0)},t.onupgradeneeded=e=>{tApp.database=t.result,tApp.database.objectStoreNames.contains("cachedPages")||tApp.database.createObjectStore("cachedPages"),tApp.database.objectStoreNames.contains("offlineStorage")||tApp.database.createObjectStore("offlineStorage")}}else 0<Object.keys(tApp.routes).length&&(window.addEventListener("hashchange",()=>{tApp.updatePage(window.location.hash)},!1),tApp.updatePage(window.location.hash)),tApp.loadBackgroundPages(),n(!0)})}static install(n="./tApp-service-worker.js"){return new Promise((e,t)=>{"serviceWorker"in navigator?navigator.serviceWorker.register(n).then(function(){e(!0)},function(){t("tAppError: Unable to install full offline functionality, an error occurred.")}):t("tAppError: Full offline functionality is not supported for this website. This issue can occur in unsupported browsers (such as IE) or in insecure contexts (HTTPS/SSL is required for full offline functionality).")})}static uninstall(){return new Promise((n,e)=>{navigator.serviceWorker.getRegistrations().then(function(e){for(var t of e)t.unregister();n(!0)})})}static update(){return new Promise((n,e)=>{navigator.serviceWorker.getRegistrations().then(function(e){for(var t of e)t.update();n(!0)})})}}tApp.Component=class{#id;#parent;#children;constructor(e,t="global"){if(this.#id=(new Date).toJSON()+"::"+Math.random().toString(36).substr(2)+"::"+Math.random().toString(36).substr(2),null!=t?(this.#parent="string"==typeof t?tApp.getComponent(t):t,this.#parent.addChild(this)):this.#parent=null,this.#children=[],this.state={},this.props={},null!=e&&"object"==typeof e)for(var n in e)this.state[n]=e[n]}get id(){return this.#id}get parent(){return this.#parent}get parentId(){return this.#parent.id}get children(){return this.#children}removeChild(e){return-1<this.#children.indexOf(e)&&(this.#children.splice(this.#children.indexOf(e),1),!0)}get childrenIds(){return this.#children.map(e=>e.id)}addChild(e){return!this.#children.includes(e)&&(this.#children.push(e),!0)}setState(e,t,n=tApp.queueTimer){return this.state=function t(n,r,a){if(n.includes(".")){let e=n.split(".");var o=e.splice(0,1);null==a[o]&&(a[o]={}),a[o]=t(e.join("."),r,a[o])}else a[n]=r;return a}(e,t,this.state),tApp.optimizedUpdating?tApp.queueUpdateComponent(this,n):tApp.updateDOM(),t}render(e){throw"tAppComponentError: Render method must be overridden."}componentWillUpdate(){}componentHasUpdated(){}componentChildrenHaveUpdated(){}destroy(){for(;0<this.#children.length;)this.#children[0].destroy();return null!=this.#parent&&this.#parent.removeChild(this),this.#parent=null,tApp.removeComponent(this.id),!0}toString(){return tApp.compileComponent(this)}elements(){return document.querySelectorAll(`[tapp-component="${this.#id}"]`)}},tApp.GlobalComponent=function(){class e extends tApp.Component{#id;constructor(e,t){super(e,null)}render(e){return"<div></div>"}get id(){return"global"}}return new e}(),tApp.compileComponent(tApp.GlobalComponent);