var __awaiter=this&&this.__awaiter||function(e,o,a,l){return new(a=a||Promise)(function(i,t){function n(e){try{s(l.next(e))}catch(e){t(e)}}function r(e){try{s(l.throw(e))}catch(e){t(e)}}function s(e){var t;e.done?i(e.value):((t=e.value)instanceof a?t:new a(function(e){e(t)})).then(n,r)}s((l=l.apply(e,o||[])).next())})},__generator=this&&this.__generator||function(n,r){var s,o,a,l={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]},e={next:t(0),throw:t(1),return:t(2)};return"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(i){return function(e){var t=[i,e];if(s)throw new TypeError("Generator is already executing.");for(;l;)try{if(s=1,o&&(a=2&t[0]?o.return:t[0]?o.throw||((a=o.return)&&a.call(o),0):o.next)&&!(a=a.call(o,t[1])).done)return a;switch(o=0,(t=a?[2&t[0],a.value]:t)[0]){case 0:case 1:a=t;break;case 4:return l.label++,{value:t[1],done:!1};case 5:l.label++,o=t[1],t=[0];continue;case 7:t=l.ops.pop(),l.trys.pop();continue;default:if(!((a=0<(a=l.trys).length&&a[a.length-1])||6!==t[0]&&2!==t[0])){l=0;continue}if(3===t[0]&&(!a||t[1]>a[0]&&t[1]<a[3])){l.label=t[1];break}if(6===t[0]&&l.label<a[1]){l.label=a[1],a=t;break}if(a&&l.label<a[2]){l.label=a[2],l.ops.push(t);break}a[2]&&l.ops.pop(),l.trys.pop();continue}t=r.call(n,l)}catch(e){t=[6,e],o=0}finally{s=a=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}}},__extends=(define("vs/language/typescript/workerManager",["require","exports","./fillers/monaco-editor-core"],function(e,t,i){"use strict";function n(e,t){var i=this;this._modeId=e,this._defaults=t,this._worker=null,this._client=null,this._configChangeListener=this._defaults.onDidChange(function(){return i._stopWorker()}),this._updateExtraLibsToken=0,this._extraLibsChangeListener=this._defaults.onDidExtraLibsChange(function(){return i._updateExtraLibs()})}Object.defineProperty(t,"__esModule",{value:!0}),t.WorkerManager=void 0,n.prototype._stopWorker=function(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null},n.prototype.dispose=function(){this._configChangeListener.dispose(),this._extraLibsChangeListener.dispose(),this._stopWorker()},n.prototype._updateExtraLibs=function(){return __awaiter(this,void 0,void 0,function(){var t,i;return __generator(this,function(e){switch(e.label){case 0:return this._worker?(t=++this._updateExtraLibsToken,[4,this._worker.getProxy()]):[2];case 1:return i=e.sent(),this._updateExtraLibsToken===t&&i.updateExtraLibs(this._defaults.getExtraLibs()),[2]}})})},n.prototype._getClient=function(){var e,t=this;return this._client||(this._worker=i.editor.createWebWorker({moduleId:"vs/language/typescript/tsWorker",label:this._modeId,keepIdleModels:!0,createData:{compilerOptions:this._defaults.getCompilerOptions(),extraLibs:this._defaults.getExtraLibs(),customWorkerPath:this._defaults.workerOptions.customWorkerPath,inlayHintsOptions:this._defaults.inlayHintsOptions}}),e=this._worker.getProxy(),this._defaults.getEagerModelSync()&&(e=e.then(function(e){return t._worker?t._worker.withSyncedResources(i.editor.getModels().filter(function(e){return e.getModeId()===t._modeId}).map(function(e){return e.uri})):e})),this._client=e),this._client},n.prototype.getLanguageServiceWorker=function(){for(var t,i=this,n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];return this._getClient().then(function(e){t=e}).then(function(e){if(i._worker)return i._worker.withSyncedResources(n)}).then(function(e){return t})},t.WorkerManager=n}),define("vs/language/typescript/lib/lib.index",["require","exports"],function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.libFileSet=void 0,t.libFileSet={},t.libFileSet["lib.d.ts"]=!0,t.libFileSet["lib.dom.d.ts"]=!0,t.libFileSet["lib.dom.iterable.d.ts"]=!0,t.libFileSet["lib.es2015.collection.d.ts"]=!0,t.libFileSet["lib.es2015.core.d.ts"]=!0,t.libFileSet["lib.es2015.d.ts"]=!0,t.libFileSet["lib.es2015.generator.d.ts"]=!0,t.libFileSet["lib.es2015.iterable.d.ts"]=!0,t.libFileSet["lib.es2015.promise.d.ts"]=!0,t.libFileSet["lib.es2015.proxy.d.ts"]=!0,t.libFileSet["lib.es2015.reflect.d.ts"]=!0,t.libFileSet["lib.es2015.symbol.d.ts"]=!0,t.libFileSet["lib.es2015.symbol.wellknown.d.ts"]=!0,t.libFileSet["lib.es2016.array.include.d.ts"]=!0,t.libFileSet["lib.es2016.d.ts"]=!0,t.libFileSet["lib.es2016.full.d.ts"]=!0,t.libFileSet["lib.es2017.d.ts"]=!0,t.libFileSet["lib.es2017.full.d.ts"]=!0,t.libFileSet["lib.es2017.intl.d.ts"]=!0,t.libFileSet["lib.es2017.object.d.ts"]=!0,t.libFileSet["lib.es2017.sharedmemory.d.ts"]=!0,t.libFileSet["lib.es2017.string.d.ts"]=!0,t.libFileSet["lib.es2017.typedarrays.d.ts"]=!0,t.libFileSet["lib.es2018.asyncgenerator.d.ts"]=!0,t.libFileSet["lib.es2018.asynciterable.d.ts"]=!0,t.libFileSet["lib.es2018.d.ts"]=!0,t.libFileSet["lib.es2018.full.d.ts"]=!0,t.libFileSet["lib.es2018.intl.d.ts"]=!0,t.libFileSet["lib.es2018.promise.d.ts"]=!0,t.libFileSet["lib.es2018.regexp.d.ts"]=!0,t.libFileSet["lib.es2019.array.d.ts"]=!0,t.libFileSet["lib.es2019.d.ts"]=!0,t.libFileSet["lib.es2019.full.d.ts"]=!0,t.libFileSet["lib.es2019.object.d.ts"]=!0,t.libFileSet["lib.es2019.string.d.ts"]=!0,t.libFileSet["lib.es2019.symbol.d.ts"]=!0,t.libFileSet["lib.es2020.bigint.d.ts"]=!0,t.libFileSet["lib.es2020.d.ts"]=!0,t.libFileSet["lib.es2020.full.d.ts"]=!0,t.libFileSet["lib.es2020.intl.d.ts"]=!0,t.libFileSet["lib.es2020.promise.d.ts"]=!0,t.libFileSet["lib.es2020.sharedmemory.d.ts"]=!0,t.libFileSet["lib.es2020.string.d.ts"]=!0,t.libFileSet["lib.es2020.symbol.wellknown.d.ts"]=!0,t.libFileSet["lib.es2021.d.ts"]=!0,t.libFileSet["lib.es2021.full.d.ts"]=!0,t.libFileSet["lib.es2021.promise.d.ts"]=!0,t.libFileSet["lib.es2021.string.d.ts"]=!0,t.libFileSet["lib.es2021.weakref.d.ts"]=!0,t.libFileSet["lib.es5.d.ts"]=!0,t.libFileSet["lib.es6.d.ts"]=!0,t.libFileSet["lib.esnext.d.ts"]=!0,t.libFileSet["lib.esnext.full.d.ts"]=!0,t.libFileSet["lib.esnext.intl.d.ts"]=!0,t.libFileSet["lib.esnext.promise.d.ts"]=!0,t.libFileSet["lib.esnext.string.d.ts"]=!0,t.libFileSet["lib.esnext.weakref.d.ts"]=!0,t.libFileSet["lib.scripthost.d.ts"]=!0,t.libFileSet["lib.webworker.d.ts"]=!0,t.libFileSet["lib.webworker.importscripts.d.ts"]=!0,t.libFileSet["lib.webworker.iterable.d.ts"]=!0}),this&&this.__extends||function(){var n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])})(e,t)};return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function i(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(i.prototype=t.prototype,new i)}}()),__assign=this&&this.__assign||function(){return(__assign=Object.assign||function(e){for(var t,i=1,n=arguments.length;i<n;i++)for(var r in t=arguments[i])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)},__awaiter=this&&this.__awaiter||function(e,o,a,l){return new(a=a||Promise)(function(i,t){function n(e){try{s(l.next(e))}catch(e){t(e)}}function r(e){try{s(l.throw(e))}catch(e){t(e)}}function s(e){var t;e.done?i(e.value):((t=e.value)instanceof a?t:new a(function(e){e(t)})).then(n,r)}s((l=l.apply(e,o||[])).next())})},__generator=this&&this.__generator||function(n,r){var s,o,a,l={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]},e={next:t(0),throw:t(1),return:t(2)};return"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(i){return function(e){var t=[i,e];if(s)throw new TypeError("Generator is already executing.");for(;l;)try{if(s=1,o&&(a=2&t[0]?o.return:t[0]?o.throw||((a=o.return)&&a.call(o),0):o.next)&&!(a=a.call(o,t[1])).done)return a;switch(o=0,(t=a?[2&t[0],a.value]:t)[0]){case 0:case 1:a=t;break;case 4:return l.label++,{value:t[1],done:!1};case 5:l.label++,o=t[1],t=[0];continue;case 7:t=l.ops.pop(),l.trys.pop();continue;default:if(!((a=0<(a=l.trys).length&&a[a.length-1])||6!==t[0]&&2!==t[0])){l=0;continue}if(3===t[0]&&(!a||t[1]>a[0]&&t[1]<a[3])){l.label=t[1];break}if(6===t[0]&&l.label<a[1]){l.label=a[1],a=t;break}if(a&&l.label<a[2]){l.label=a[2],l.ops.push(t);break}a[2]&&l.ops.pop(),l.trys.pop();continue}t=r.call(n,l)}catch(e){t=[6,e],o=0}finally{s=a=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}}};define("vs/language/typescript/languageFeatures",["require","exports","./monaco.contribution","./lib/lib.index","./fillers/monaco-editor-core"],function(K,e,R,E,p){"use strict";function u(e,t,i){if("string"==typeof e)return e;if(void 0===e)return"";var n="";if(i=void 0===i?0:i){n+=t;for(var r=0;r<i;r++)n+="  "}if(n+=e.messageText,i++,e.next)for(var s=0,o=e.next;s<o.length;s++)n+=u(o[s],t,i);return n}function c(e){return e?e.map(function(e){return e.text}).join(""):""}Object.defineProperty(e,"__esModule",{value:!0}),e.InlayHintsAdapter=e.RenameAdapter=e.CodeActionAdaptor=e.FormatOnTypeAdapter=e.FormatAdapter=e.FormatHelper=e.Kind=e.OutlineAdapter=e.ReferenceAdapter=e.DefinitionAdapter=e.OccurrencesAdapter=e.QuickInfoAdapter=e.SignatureHelpAdapter=e.SuggestAdapter=e.DiagnosticsAdapter=e.LibFiles=e.Adapter=e.flattenDiagnosticMessageText=void 0,e.flattenDiagnosticMessageText=u,W.prototype._textSpanToRange=function(e,t){var i=e.getPositionAt(t.start),e=e.getPositionAt(t.start+t.length);return{startLineNumber:i.lineNumber,startColumn:i.column,endLineNumber:e.lineNumber,endColumn:e.column}};var l,t,i,n,r,s,H,o,a=W;function W(e){this._worker=e}function d(e){this._worker=e,this._libFiles={},this._hasFetchedLibFiles=!1,this._fetchLibFilesPromise=null}function g(e,t,s,i){function n(){for(var e=0,t=p.editor.getModels();e<t.length;e++){var i=t[e];a(i),r(i)}}var o=l.call(this,i)||this,r=(o._libFiles=e,o._defaults=t,o._selector=s,o._disposables=[],o._listener=Object.create(null),function(e){var t,i,n,r;e.getModeId()===s&&(i=function(){o._defaults.getDiagnosticsOptions().onlyVisible&&!e.isAttachedToEditor()||o._doValidate(e)},n=e.onDidChangeContent(function(){clearTimeout(t),t=setTimeout(i,500)}),r=e.onDidChangeAttached(function(){o._defaults.getDiagnosticsOptions().onlyVisible&&(e.isAttachedToEditor()?i():p.editor.setModelMarkers(e,o._selector,[]))}),o._listener[e.uri.toString()]={dispose:function(){n.dispose(),r.dispose(),clearTimeout(t)}},i())}),a=function(e){p.editor.setModelMarkers(e,o._selector,[]);e=e.uri.toString();o._listener[e]&&(o._listener[e].dispose(),delete o._listener[e])};return o._disposables.push(p.editor.onDidCreateModel(function(e){return r(e)})),o._disposables.push(p.editor.onWillDisposeModel(a)),o._disposables.push(p.editor.onDidChangeModelLanguage(function(e){a(e.model),r(e.model)})),o._disposables.push({dispose:function(){for(var e=0,t=p.editor.getModels();e<t.length;e++){var i=t[e];a(i)}}}),o._disposables.push(o._defaults.onDidChange(n)),o._disposables.push(o._defaults.onDidExtraLibsChange(n)),p.editor.getModels().forEach(function(e){return r(e)}),o}function f(){return null!==t&&t.apply(this,arguments)||this}function j(e){var t,i,n="*@"+e.name+"*";return"param"===e.name&&e.text?(t=(i=e.text)[0],i=i.slice(1),n+="`"+t.text+"`",0<i.length&&(n+=" — "+i.map(function(e){return e.text}).join(" "))):Array.isArray(e.text)?n+=" — "+e.text.map(function(e){return e.text}).join(" "):e.text&&(n+=" — "+e.text),n}function b(){var e=null!==i&&i.apply(this,arguments)||this;return e.signatureHelpTriggerCharacters=["(",","],e}function h(){return null!==n&&n.apply(this,arguments)||this}function m(){return null!==r&&r.apply(this,arguments)||this}function _(e,t){t=s.call(this,t)||this;return t._libFiles=e,t}function y(e,t){t=H.call(this,t)||this;return t._libFiles=e,t}function v(){return null!==o&&o.apply(this,arguments)||this}e.Adapter=a,d.prototype.isLibFile=function(e){return!!e&&0===e.path.indexOf("/lib.")&&!!E.libFileSet[e.path.slice(1)]},d.prototype.getOrCreateModel=function(e){var t=p.Uri.parse(e),i=p.editor.getModel(t);if(i)return i;if(this.isLibFile(t)&&this._hasFetchedLibFiles)return p.editor.createModel(this._libFiles[t.path.slice(1)],"typescript",t);i=R.typescriptDefaults.getExtraLibs()[e];return i?p.editor.createModel(i.content,"typescript",t):null},d.prototype._containsLibFile=function(e){for(var t=0,i=e;t<i.length;t++){var n=i[t];if(this.isLibFile(n))return!0}return!1},d.prototype.fetchLibFilesIfNecessary=function(t){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return this._containsLibFile(t)?[4,this._fetchLibFiles()]:[2];case 1:return e.sent(),[2]}})})},d.prototype._fetchLibFiles=function(){var t=this;return this._fetchLibFilesPromise||(this._fetchLibFilesPromise=this._worker().then(function(e){return e.getLibFiles()}).then(function(e){t._hasFetchedLibFiles=!0,t._libFiles=e})),this._fetchLibFilesPromise},e.LibFiles=d,__extends(g,l=a),g.prototype.dispose=function(){this._disposables.forEach(function(e){return e&&e.dispose()}),this._disposables=[]},g.prototype._doValidate=function(l){return __awaiter(this,void 0,void 0,function(){var t,i,n,r,s,o,a=this;return __generator(this,function(e){switch(e.label){case 0:return[4,this._worker(l.uri)];case 1:return t=e.sent(),l.isDisposed()?[2]:(i=[],n=this._defaults.getDiagnosticsOptions(),r=n.noSyntaxValidation,o=n.noSemanticValidation,n=n.noSuggestionDiagnostics,r||i.push(t.getSyntacticDiagnostics(l.uri.toString())),o||i.push(t.getSemanticDiagnostics(l.uri.toString())),n||i.push(t.getSuggestionDiagnostics(l.uri.toString())),[4,Promise.all(i)]);case 2:return!(r=e.sent())||l.isDisposed()?[2]:(s=r.reduce(function(e,t){return t.concat(e)},[]).filter(function(e){return-1===(a._defaults.getDiagnosticsOptions().diagnosticCodesToIgnore||[]).indexOf(e.code)}),o=s.map(function(e){return e.relatedInformation||[]}).reduce(function(e,t){return t.concat(e)},[]).map(function(e){return e.file?p.Uri.parse(e.file.fileName):null}),[4,this._libFiles.fetchLibFilesIfNecessary(o)]);case 3:return e.sent(),l.isDisposed()||p.editor.setModelMarkers(l,this._selector,s.map(function(e){return a._convertDiagnostics(l,e)})),[2]}})})},g.prototype._convertDiagnostics=function(e,t){var i=t.start||0,n=t.length||1,r=e.getPositionAt(i),s=r.lineNumber,r=r.column,i=e.getPositionAt(i+n),n=i.lineNumber,i=i.column,o=[];return t.reportsUnnecessary&&o.push(p.MarkerTag.Unnecessary),t.reportsDeprecated&&o.push(p.MarkerTag.Deprecated),{severity:this._tsDiagnosticCategoryToMarkerSeverity(t.category),startLineNumber:s,startColumn:r,endLineNumber:n,endColumn:i,message:u(t.messageText,"\n"),code:t.code.toString(),tags:o,relatedInformation:this._convertRelatedInformation(e,t.relatedInformation)}},g.prototype._convertRelatedInformation=function(o,e){var a=this;if(!e)return[];var l=[];return e.forEach(function(e){var t,i,n,r,s=o;(s=e.file?a._libFiles.getOrCreateModel(e.file.fileName):s)&&(r=e.start||0,n=e.length||1,t=(i=s.getPositionAt(r)).lineNumber,i=i.column,n=(r=s.getPositionAt(r+n)).lineNumber,r=r.column,l.push({resource:s.uri,startLineNumber:t,startColumn:i,endLineNumber:n,endColumn:r,message:u(e.messageText,"\n")}))}),l},g.prototype._tsDiagnosticCategoryToMarkerSeverity=function(e){switch(e){case 1:return p.MarkerSeverity.Error;case 3:return p.MarkerSeverity.Info;case 0:return p.MarkerSeverity.Warning;case 2:return p.MarkerSeverity.Hint}return p.MarkerSeverity.Info},e.DiagnosticsAdapter=g,__extends(f,t=a),Object.defineProperty(f.prototype,"triggerCharacters",{get:function(){return["."]},enumerable:!1,configurable:!0}),f.prototype.provideCompletionItems=function(a,l,e,t){return __awaiter(this,void 0,void 0,function(){var r,s,o,t,i;return __generator(this,function(e){switch(e.label){case 0:return t=a.getWordUntilPosition(l),r=new p.Range(l.lineNumber,t.startColumn,l.lineNumber,t.endColumn),s=a.uri,o=a.getOffsetAt(l),[4,this._worker(s)];case 1:return t=e.sent(),a.isDisposed()?[2]:[4,t.getCompletionsAtPosition(s.toString(),o)];case 2:return!(i=e.sent())||a.isDisposed()?[2]:[2,{suggestions:i.entries.map(function(e){var t,i=r,n=(e.replacementSpan&&(n=a.getPositionAt(e.replacementSpan.start),t=a.getPositionAt(e.replacementSpan.start+e.replacementSpan.length),i=new p.Range(n.lineNumber,n.column,t.lineNumber,t.column)),[]);return-1!==(null==(t=e.kindModifiers)?void 0:t.indexOf("deprecated"))&&n.push(p.languages.CompletionItemTag.Deprecated),{uri:s,position:l,offset:o,range:i,label:e.name,insertText:e.name,sortText:e.sortText,kind:f.convertKind(e.kind),tags:n}})}]}})})},f.prototype.resolveCompletionItem=function(o,e){return __awaiter(this,void 0,void 0,function(){var t,i,n,r,s;return __generator(this,function(e){switch(e.label){case 0:return i=(t=o).uri,n=t.position,r=t.offset,[4,this._worker(i)];case 1:return[4,e.sent().getCompletionEntryDetails(i.toString(),r,t.label)];case 2:return(s=e.sent())?[2,{uri:i,position:n,label:s.name,kind:f.convertKind(s.kind),detail:c(s.displayParts),documentation:{value:f.createDocumentationString(s)}}]:[2,t]}})})},f.convertKind=function(e){switch(e){case S.primitiveType:case S.keyword:return p.languages.CompletionItemKind.Keyword;case S.variable:case S.localVariable:return p.languages.CompletionItemKind.Variable;case S.memberVariable:case S.memberGetAccessor:case S.memberSetAccessor:return p.languages.CompletionItemKind.Field;case S.function:case S.memberFunction:case S.constructSignature:case S.callSignature:case S.indexSignature:return p.languages.CompletionItemKind.Function;case S.enum:return p.languages.CompletionItemKind.Enum;case S.module:return p.languages.CompletionItemKind.Module;case S.class:return p.languages.CompletionItemKind.Class;case S.interface:return p.languages.CompletionItemKind.Interface;case S.warning:return p.languages.CompletionItemKind.File}return p.languages.CompletionItemKind.Property},f.createDocumentationString=function(e){var t=c(e.documentation);if(e.tags)for(var i=0,n=e.tags;i<n.length;i++)t+="\n\n"+j(n[i]);return t},e.SuggestAdapter=f,__extends(b,i=a),b._toSignatureHelpTriggerReason=function(e){switch(e.triggerKind){case p.languages.SignatureHelpTriggerKind.TriggerCharacter:return e.triggerCharacter?e.isRetrigger?{kind:"retrigger",triggerCharacter:e.triggerCharacter}:{kind:"characterTyped",triggerCharacter:e.triggerCharacter}:{kind:"invoked"};case p.languages.SignatureHelpTriggerKind.ContentChange:return e.isRetrigger?{kind:"retrigger"}:{kind:"invoked"};default:return p.languages.SignatureHelpTriggerKind.Invoke,{kind:"invoked"}}},b.prototype.provideSignatureHelp=function(r,s,e,a){return __awaiter(this,void 0,void 0,function(){var t,i,n,o;return __generator(this,function(e){switch(e.label){case 0:return t=r.uri,i=r.getOffsetAt(s),[4,this._worker(t)];case 1:return n=e.sent(),r.isDisposed()?[2]:[4,n.getSignatureHelpItems(t.toString(),i,{triggerReason:b._toSignatureHelpTriggerReason(a)})];case 2:return!(n=e.sent())||r.isDisposed()?[2]:(o={activeSignature:n.selectedItemIndex,activeParameter:n.argumentIndex,signatures:[]},n.items.forEach(function(r){var s={label:"",parameters:[]};s.documentation={value:c(r.documentation)},s.label+=c(r.prefixDisplayParts),r.parameters.forEach(function(e,t,i){var n=c(e.displayParts),e={label:n,documentation:{value:c(e.documentation)}};s.label+=n,s.parameters.push(e),t<i.length-1&&(s.label+=c(r.separatorDisplayParts))}),s.label+=c(r.suffixDisplayParts),o.signatures.push(s)}),[2,{value:o,dispose:function(){}}])}})})},e.SignatureHelpAdapter=b,__extends(h,n=a),h.prototype.provideHover=function(a,l,e){return __awaiter(this,void 0,void 0,function(){var t,i,n,r,s,o;return __generator(this,function(e){switch(e.label){case 0:return t=a.uri,i=a.getOffsetAt(l),[4,this._worker(t)];case 1:return n=e.sent(),a.isDisposed()?[2]:[4,n.getQuickInfoAtPosition(t.toString(),i)];case 2:return!(n=e.sent())||a.isDisposed()?[2]:(r=c(n.documentation),s=n.tags?n.tags.map(j).join("  \n\n"):"",o=c(n.displayParts),[2,{range:this._textSpanToRange(a,n.textSpan),contents:[{value:"```typescript\n"+o+"\n```\n"},{value:r+(s?"\n\n"+s:"")}]}])}})})},e.QuickInfoAdapter=h,__extends(m,r=a),m.prototype.provideDocumentHighlights=function(s,o,e){return __awaiter(this,void 0,void 0,function(){var t,i,n,r=this;return __generator(this,function(e){switch(e.label){case 0:return t=s.uri,i=s.getOffsetAt(o),[4,this._worker(t)];case 1:return n=e.sent(),s.isDisposed()?[2]:[4,n.getOccurrencesAtPosition(t.toString(),i)];case 2:return!(n=e.sent())||s.isDisposed()?[2]:[2,n.map(function(e){return{range:r._textSpanToRange(s,e.textSpan),kind:e.isWriteAccess?p.languages.DocumentHighlightKind.Write:p.languages.DocumentHighlightKind.Text}})]}})})},e.OccurrencesAdapter=m,__extends(_,s=a),_.prototype.provideDefinition=function(c,d,e){return __awaiter(this,void 0,void 0,function(){var t,i,n,r,s,o,a,l,u;return __generator(this,function(e){switch(e.label){case 0:return t=c.uri,i=c.getOffsetAt(d),[4,this._worker(t)];case 1:return n=e.sent(),c.isDisposed()?[2]:[4,n.getDefinitionAtPosition(t.toString(),i)];case 2:return!(r=e.sent())||c.isDisposed()?[2]:[4,this._libFiles.fetchLibFilesIfNecessary(r.map(function(e){return p.Uri.parse(e.fileName)}))];case 3:if(e.sent(),c.isDisposed())return[2];for(s=[],o=0,a=r;o<a.length;o++)l=a[o],(u=this._libFiles.getOrCreateModel(l.fileName))&&s.push({uri:u.uri,range:this._textSpanToRange(u,l.textSpan)});return[2,s]}})})},e.DefinitionAdapter=_,__extends(y,H=a),y.prototype.provideReferences=function(c,d,e,t){return __awaiter(this,void 0,void 0,function(){var t,i,n,r,s,o,a,l,u;return __generator(this,function(e){switch(e.label){case 0:return t=c.uri,i=c.getOffsetAt(d),[4,this._worker(t)];case 1:return n=e.sent(),c.isDisposed()?[2]:[4,n.getReferencesAtPosition(t.toString(),i)];case 2:return!(r=e.sent())||c.isDisposed()?[2]:[4,this._libFiles.fetchLibFilesIfNecessary(r.map(function(e){return p.Uri.parse(e.fileName)}))];case 3:if(e.sent(),c.isDisposed())return[2];for(s=[],o=0,a=r;o<a.length;o++)l=a[o],(u=this._libFiles.getOrCreateModel(l.fileName))&&s.push({uri:u.uri,range:this._textSpanToRange(u,l.textSpan)});return[2,s]}})})},e.ReferenceAdapter=y,__extends(v,o=a),v.prototype.provideDocumentSymbols=function(u,e){return __awaiter(this,void 0,void 0,function(){var t,i,a,n,l=this;return __generator(this,function(e){switch(e.label){case 0:return t=u.uri,[4,this._worker(t)];case 1:return i=e.sent(),u.isDisposed()?[2]:[4,i.getNavigationBarItems(t.toString())];case 2:return!(i=e.sent())||u.isDisposed()?[2]:(a=function(e,t,i){var n={name:t.text,detail:"",kind:D[t.kind]||p.languages.SymbolKind.Variable,range:l._textSpanToRange(u,t.spans[0]),selectionRange:l._textSpanToRange(u,t.spans[0]),tags:[]};if(i&&(n.containerName=i),t.childItems&&0<t.childItems.length)for(var r=0,s=t.childItems;r<s.length;r++){var o=s[r];a(e,o,n.name)}e.push(n)},n=[],i.forEach(function(e){return a(n,e)}),[2,n])}})})},e.OutlineAdapter=v,w.unknown="",w.keyword="keyword",w.script="script",w.module="module",w.class="class",w.interface="interface",w.type="type",w.enum="enum",w.variable="var",w.localVariable="local var",w.function="function",w.localFunction="local function",w.memberFunction="method",w.memberGetAccessor="getter",w.memberSetAccessor="setter",w.memberVariable="property",w.constructorImplementation="constructor",w.callSignature="call",w.indexSignature="index",w.constructSignature="construct",w.parameter="parameter",w.typeParameter="type parameter",w.primitiveType="primitive type",w.label="label",w.alias="alias",w.const="const",w.let="let",w.warning="warning";var S=w;function w(){}e.Kind=S;var F,x,k,A,V,C,D=Object.create(null),O=(D[S.module]=p.languages.SymbolKind.Module,D[S.class]=p.languages.SymbolKind.Class,D[S.enum]=p.languages.SymbolKind.Enum,D[S.interface]=p.languages.SymbolKind.Interface,D[S.memberFunction]=p.languages.SymbolKind.Method,D[S.memberVariable]=p.languages.SymbolKind.Property,D[S.memberGetAccessor]=p.languages.SymbolKind.Property,D[S.memberSetAccessor]=p.languages.SymbolKind.Property,D[S.variable]=p.languages.SymbolKind.Variable,D[S.const]=p.languages.SymbolKind.Variable,D[S.localVariable]=p.languages.SymbolKind.Variable,D[S.variable]=p.languages.SymbolKind.Variable,D[S.function]=p.languages.SymbolKind.Function,D[S.localFunction]=p.languages.SymbolKind.Function,__extends(I,F=a),I._convertOptions=function(e){return{ConvertTabsToSpaces:e.insertSpaces,TabSize:e.tabSize,IndentSize:e.tabSize,IndentStyle:2,NewLineCharacter:"\n",InsertSpaceAfterCommaDelimiter:!0,InsertSpaceAfterSemicolonInForStatements:!0,InsertSpaceBeforeAndAfterBinaryOperators:!0,InsertSpaceAfterKeywordsInControlFlowStatements:!0,InsertSpaceAfterFunctionKeywordForAnonymousFunctions:!0,InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis:!1,InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets:!1,InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces:!1,PlaceOpenBraceOnNewLineForControlBlocks:!1,PlaceOpenBraceOnNewLineForFunctions:!1}},I.prototype._convertTextChanges=function(e,t){return{text:t.newText,range:this._textSpanToRange(e,t.span)}},I);function I(){return null!==F&&F.apply(this,arguments)||this}function T(){return null!==x&&x.apply(this,arguments)||this}function P(){return null!==k&&k.apply(this,arguments)||this}function L(){return null!==A&&A.apply(this,arguments)||this}function M(e,t){t=V.call(this,t)||this;return t._libFiles=e,t}function N(){return null!==C&&C.apply(this,arguments)||this}e.FormatHelper=O,__extends(T,x=O),T.prototype.provideDocumentRangeFormattingEdits=function(o,a,l,e){return __awaiter(this,void 0,void 0,function(){var t,i,n,r,s=this;return __generator(this,function(e){switch(e.label){case 0:return t=o.uri,i=o.getOffsetAt({lineNumber:a.startLineNumber,column:a.startColumn}),n=o.getOffsetAt({lineNumber:a.endLineNumber,column:a.endColumn}),[4,this._worker(t)];case 1:return r=e.sent(),o.isDisposed()?[2]:[4,r.getFormattingEditsForRange(t.toString(),i,n,O._convertOptions(l))];case 2:return!(r=e.sent())||o.isDisposed()?[2]:[2,r.map(function(e){return s._convertTextChanges(o,e)})]}})})},e.FormatAdapter=T,__extends(P,k=O),Object.defineProperty(P.prototype,"autoFormatTriggerCharacters",{get:function(){return[";","}","\n"]},enumerable:!1,configurable:!0}),P.prototype.provideOnTypeFormattingEdits=function(s,o,a,l,e){return __awaiter(this,void 0,void 0,function(){var t,i,n,r=this;return __generator(this,function(e){switch(e.label){case 0:return t=s.uri,i=s.getOffsetAt(o),[4,this._worker(t)];case 1:return n=e.sent(),s.isDisposed()?[2]:[4,n.getFormattingEditsAfterKeystroke(t.toString(),i,a,O._convertOptions(l))];case 2:return!(n=e.sent())||s.isDisposed()?[2]:[2,n.map(function(e){return r._convertTextChanges(s,e)})]}})})},e.FormatOnTypeAdapter=P,__extends(L,A=O),L.prototype.provideCodeActions=function(l,u,c,e){return __awaiter(this,void 0,void 0,function(){var t,i,n,r,s,o,a=this;return __generator(this,function(e){switch(e.label){case 0:return t=l.uri,i=l.getOffsetAt({lineNumber:u.startLineNumber,column:u.startColumn}),n=l.getOffsetAt({lineNumber:u.endLineNumber,column:u.endColumn}),r=O._convertOptions(l.getOptions()),s=c.markers.filter(function(e){return e.code}).map(function(e){return e.code}).map(Number),[4,this._worker(t)];case 1:return o=e.sent(),l.isDisposed()?[2]:[4,o.getCodeFixesAtPosition(t.toString(),i,n,s,r)];case 2:return!(o=e.sent())||l.isDisposed()?[2,{actions:[],dispose:function(){}}]:[2,{actions:o.filter(function(e){return 0===e.changes.filter(function(e){return e.isNewFile}).length}).map(function(e){return a._tsCodeFixActionToMonacoCodeAction(l,c,e)}),dispose:function(){}}]}})})},L.prototype._tsCodeFixActionToMonacoCodeAction=function(e,t,i){for(var n=[],r=0,s=i.changes;r<s.length;r++)for(var o=0,a=s[r].textChanges;o<a.length;o++){var l=a[o];n.push({resource:e.uri,edit:{range:this._textSpanToRange(e,l.span),text:l.newText}})}return{title:i.description,edit:{edits:n},diagnostics:t.markers,kind:"quickfix"}},e.CodeActionAdaptor=L,__extends(M,V=a),M.prototype.provideRenameEdits=function(d,p,g,e){return __awaiter(this,void 0,void 0,function(){var t,i,n,r,s,o,a,l,u,c;return __generator(this,function(e){switch(e.label){case 0:return r=d.uri,t=r.toString(),i=d.getOffsetAt(p),[4,this._worker(r)];case 1:return n=e.sent(),d.isDisposed()?[2]:[4,n.getRenameInfo(t,i,{allowRenameOfImportPath:!1})];case 2:if(!1===(r=e.sent()).canRename)return[2,{edits:[],rejectReason:r.localizedErrorMessage}];if(void 0!==r.fileToRename)throw new Error("Renaming files is not supported.");return[4,n.findRenameLocations(t,i,!1,!1,!1)];case 3:if(!(s=e.sent())||d.isDisposed())return[2];for(o=[],a=0,l=s;a<l.length;a++){if(u=l[a],!(c=this._libFiles.getOrCreateModel(u.fileName)))throw new Error("Unknown file "+u.fileName+".");o.push({resource:c.uri,edit:{range:this._textSpanToRange(c,u.textSpan),text:g}})}return[2,{edits:o}]}})})},e.RenameAdapter=M,__extends(N,C=a),N.prototype.provideInlayHints=function(o,a,e){return __awaiter(this,void 0,void 0,function(){var t,i,n,r,s=this;return __generator(this,function(e){switch(e.label){case 0:return r=o.uri,t=r.toString(),i=o.getOffsetAt({lineNumber:a.startLineNumber,column:a.startColumn}),n=o.getOffsetAt({lineNumber:a.endLineNumber,column:a.endColumn}),[4,this._worker(r)];case 1:return r=e.sent(),o.isDisposed()?[2,[]]:[4,r.provideInlayHints(t,i,n)];case 2:return[2,e.sent().map(function(e){return __assign(__assign({},e),{position:o.getPositionAt(e.position),kind:s._convertHintKind(e.kind)})})]}})})},N.prototype._convertHintKind=function(e){switch(e){case"Parameter":return p.languages.InlayHintKind.Parameter;case"Type":return p.languages.InlayHintKind.Type;default:return p.languages.InlayHintKind.Other}},e.InlayHintsAdapter=N}),define("vs/language/typescript/tsMode",["require","exports","./workerManager","./languageFeatures","./fillers/monaco-editor-core"],function(e,t,s,o,a){"use strict";var i,n;function r(e,t){function i(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return n.getLanguageServiceWorker.apply(n,e)}var n=new s.WorkerManager(t,e),r=new o.LibFiles(i);return a.languages.registerCompletionItemProvider(t,new o.SuggestAdapter(i)),a.languages.registerSignatureHelpProvider(t,new o.SignatureHelpAdapter(i)),a.languages.registerHoverProvider(t,new o.QuickInfoAdapter(i)),a.languages.registerDocumentHighlightProvider(t,new o.OccurrencesAdapter(i)),a.languages.registerDefinitionProvider(t,new o.DefinitionAdapter(r,i)),a.languages.registerReferenceProvider(t,new o.ReferenceAdapter(r,i)),a.languages.registerDocumentSymbolProvider(t,new o.OutlineAdapter(i)),a.languages.registerDocumentRangeFormattingEditProvider(t,new o.FormatAdapter(i)),a.languages.registerOnTypeFormattingEditProvider(t,new o.FormatOnTypeAdapter(i)),a.languages.registerCodeActionProvider(t,new o.CodeActionAdaptor(i)),a.languages.registerRenameProvider(t,new o.RenameAdapter(r,i)),a.languages.registerInlayHintsProvider(t,new o.InlayHintsAdapter(i)),new o.DiagnosticsAdapter(r,e,t,i),i}Object.defineProperty(t,"__esModule",{value:!0}),t.getTypeScriptWorker=t.getJavaScriptWorker=t.setupJavaScript=t.setupTypeScript=void 0,t.setupTypeScript=function(e){n=r(e,"typescript")},t.setupJavaScript=function(e){i=r(e,"javascript")},t.getJavaScriptWorker=function(){return new Promise(function(e,t){if(!i)return t("JavaScript not registered!");e(i)})},t.getTypeScriptWorker=function(){return new Promise(function(e,t){if(!n)return t("TypeScript not registered!");e(n)})}});