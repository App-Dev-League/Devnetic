const requireExecute=code=>eval(`(() => {
		let exports = {};
		let module = {exports: exports};
		${code}
		let moduleExports = {};
		if(module.exports.constructor == Object && exports.constructor == Object) {
			moduleExports = {...exports, ...module.exports};
		} else if(typeof module.exports == "function" && typeof exports == "function") {
			moduleExports[exports.name] = exports;
		} else if(exports.constructor == Object && Object.keys(exports).length == 0) {
			moduleExports = module.exports;
		} else {
			moduleExports = exports;
		}
		return moduleExports;
		})();`),requireExecuteBrowser=(window.downloadFileCount=0,t=>{let n=document.createElement("script");n.type="text/javascript";try{n.appendChild(document.createTextNode(t))}catch(e){n.text=t}document.body.appendChild(n)}),{install,installAll,require,requireBrowser,_getInstalledData,_registerInstallCallback}=function(){let a={},r="./",n=()=>{};const i=(l,o)=>new Promise(async(s,t)=>{if(null!=(o={...o=null!=o&&o.constructor==Object?o:{}}).node_modules&&"string"==typeof o.node_modules||(o.node_modules="/node_modules/"),"/"!=o.node_modules[o.node_modules.length-1]&&(o.node_modules+="/"),null!=o.path&&"string"==typeof o.path||(o.path=""),null!=o.reinstall&&"boolean"==typeof o.reinstall||(o.reinstall=!1),null!=o.installDependencies&&"boolean"==typeof o.installDependencies||(o.installDependencies=!0),null!=o.installDevDependencies&&"boolean"==typeof o.installDevDependencies||(o.installDevDependencies=!1),(l=o.path+l).includes("/")&&l.endsWith(".js"))null!=o.name&&"string"==typeof o.name||(o.name=c(l)),o.reinstall||null==a[o.name]?fetch(l).then(async e=>{n(),200==e.status?e.text().then(async e=>{let t=l.split("/");t.splice(t.length-1,1);var n=t.join("/")+"/";a[o.name]={data:e,context:n},s()}).catch(async e=>{t("require-browser Fatal Error: Unable to parse `"+l+"`.\n\n"+e)}):t("require-browser Fatal Error: Unable to parse `"+l+"`.\n\n"+err)}).catch(async e=>{t("require-browser Fatal Error: Unable to fetch `"+l+"`.\n\n"+e)}):s();else{let e=!1;l.includes("/")&&!l.startsWith("@")&&(e=!0,l=c(l)),null!=o.name&&"string"==typeof o.name||(o.name=l);let r;r=e?l+"/":o.node_modules+l+"/",fetch(r+"package.json").then(async e=>{200==e.status?e.json().then(async e=>{let t="index.js";if(null!=e.main&&(t=e.main),"/"==(t=null!=e.browser&&null!=e.browser[t]?e.browser[t]:t)[0]&&(t=t.substring(1)),!o.reinstall&&null!=a[o.name]||await i(r+t,o),o.installDependencies){var n=Object.keys(e.dependencies||{});for(let e=0;e<n.length;e++)!o.reinstall&&null!=a[n[e]]||await i(n[e],o)}if(o.installDevDependencies){var l=Object.keys(e.devDependencies||{});for(let e=0;e<l.length;e++)!o.reinstall&&null!=a[l[e]]||await i(l[e],o)}s()}).catch(async e=>{t("require-browser Fatal Error: Unable to parse module `"+l+"`.\n\n"+e)}):t("require-browser Fatal Error: Unable to parse module `"+l+"`.\n\n"+err)}).catch(async e=>{o.reinstall||null==a[o.name]?i(r+"index.js",o).then(async()=>{s()}).catch(async e=>{r.startsWith(o.node_modules)||await i(o.node_modules+r,o),s()}):s()})}}),s=()=>window.location.href.substring(0,window.location.href.length-window.location.hash.length),c=(e,t=s())=>{if(e.includes("://"))return e;var n=t.split("/"),l=e.split("/");n.pop();for(var r=0;r<l.length;r++)"."!=l[r]&&(".."==l[r]?n.pop():n.push(l[r]));return n.join("/")},t=(t,n)=>{if(t.includes("/")&&(t=c(r+t)),null==a[t])throw"require-browser Fatal Error: Unable to find `"+t+"`, ensure that it is installed first.";{var l=r;r=a[t].context;let e;try{e=n(a[t].data)}catch(e){throw r=l,e}return r=l,e}};return{install:i,installAll:(r,s,o)=>new Promise(async(e,t)=>{let l=[];for(let n=0;n<r.length;n++)l.push(new Promise((e,t)=>{i(r[n],s).then(()=>{o&&o(r[n]),e()})}));await Promise.all(l),e()}),require:e=>t(e,requireExecute),requireBrowser:e=>{t(e,requireExecuteBrowser)},_getInstalledData:()=>a,_registerInstallCallback:e=>{"function"==typeof e&&(n=e)}}}();