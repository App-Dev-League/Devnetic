!function(e,n){"function"==typeof define&&define.amd?define(n):"object"==typeof exports?module.exports=n():e.NProgress=n()}(this,function(){var n,t,a={version:"0.2.0"},u=a.settings={minimum:.08,easing:"ease",positionUsing:"",speed:200,trickle:!0,trickleRate:.02,trickleSpeed:800,showSpinner:!0,barSelector:'[role="bar"]',spinnerSelector:'[role="spinner"]',parent:"body",template:'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'};function c(e,n,t){return e<n?n:t<e?t:e}function l(e){return 100*(-1+e)}a.configure=function(e){var n,t;for(n in e)void 0!==(t=e[n])&&e.hasOwnProperty(n)&&(u[n]=t);return this},a.status=null,a.set=function(t){var e=a.isStarted(),r=(t=c(t,u.minimum,1),a.status=1===t?null:t,a.render(!e)),i=r.querySelector(u.barSelector),s=u.speed,o=u.easing;return r.offsetWidth,d(function(e){var n;""===u.positionUsing&&(u.positionUsing=a.getPositioningCSS()),f(i,(n=t,(n="translate3d"===u.positionUsing?{transform:"translate3d("+l(n)+"%,0,0)"}:"translate"===u.positionUsing?{transform:"translate("+l(n)+"%,0)"}:{"margin-left":l(n)+"%"}).transition="all "+s+"ms "+o,n)),1===t?(f(r,{transition:"none",opacity:1}),r.offsetWidth,setTimeout(function(){f(r,{transition:"all "+s+"ms linear",opacity:0}),setTimeout(function(){a.remove(),e()},s)},s)):setTimeout(e,s)}),this},a.isStarted=function(){return"number"==typeof a.status},a.start=function(){a.status||a.set(0);var e=function(){setTimeout(function(){a.status&&(a.trickle(),e())},u.trickleSpeed)};return u.trickle&&e(),this},a.done=function(e){return e||a.status?a.inc(.3+.5*Math.random()).set(1):this},a.inc=function(e){var n=a.status;return n?("number"!=typeof e&&(e=(1-n)*c(Math.random()*n,.1,.95)),n=c(n+e,0,.994),a.set(n)):a.start()},a.trickle=function(){return a.inc(Math.random()*u.trickleRate)},t=n=0,a.promise=function(e){return e&&"resolved"!==e.state()&&(0===t&&a.start(),n++,t++,e.always(function(){0==--t?(n=0,a.done()):a.set((n-t)/n)})),this},a.render=function(e){if(a.isRendered())return document.getElementById("nprogress");g(document.documentElement,"nprogress-busy");var n=document.createElement("div"),t=(n.id="nprogress",n.innerHTML=u.template,n.querySelector(u.barSelector)),e=e?"-100":l(a.status||0),r=document.querySelector(u.parent);return f(t,{transition:"all 0 linear",transform:"translate3d("+e+"%,0,0)"}),u.showSpinner||(t=n.querySelector(u.spinnerSelector))&&h(t),r!=document.body&&g(r,"nprogress-custom-parent"),r.appendChild(n),n},a.remove=function(){v(document.documentElement,"nprogress-busy"),v(document.querySelector(u.parent),"nprogress-custom-parent");var e=document.getElementById("nprogress");e&&h(e)},a.isRendered=function(){return!!document.getElementById("nprogress")},a.getPositioningCSS=function(){var e=document.body.style,n="WebkitTransform"in e?"Webkit":"MozTransform"in e?"Moz":"msTransform"in e?"ms":"OTransform"in e?"O":"";return n+"Perspective"in e?"translate3d":n+"Transform"in e?"translate":"margin"};var r=[],d=function(e){r.push(e),1==r.length&&i()};function i(){var e=r.shift();e&&e(i)}var s=["Webkit","O","Moz","ms"],o={},f=function(e,n){var t,r,i=arguments;if(2==i.length)for(t in n)void 0!==(r=n[t])&&n.hasOwnProperty(t)&&m(e,t,r);else m(e,i[1],i[2])};function m(e,n,t){var r=(r=n).replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,function(e,n){return n.toUpperCase()});n=o[r]||(o[r]=function(e){var n=document.body.style;if(e in n)return e;for(var t,r=s.length,i=e.charAt(0).toUpperCase()+e.slice(1);r--;)if((t=s[r]+i)in n)return t;return e}(r)),e.style[n]=t}function p(e,n){return 0<=("string"==typeof e?e:y(e)).indexOf(" "+n+" ")}function g(e,n){var t=y(e),r=t+n;p(t,n)||(e.className=r.substring(1))}function v(e,n){var t=y(e);p(e,n)&&(t=t.replace(" "+n+" "," "),e.className=t.substring(1,t.length-1))}function y(e){return(" "+(e.className||"")+" ").replace(/\s+/gi," ")}function h(e){e&&e.parentNode&&e.parentNode.removeChild(e)}return a});