(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{15:function(e,t,n){"use strict";function r(e){return void 0===e||e instanceof Array?e:e.callee||e instanceof NodeList||e instanceof DOMTokenList||e instanceof HTMLCollection?Array.prototype.slice.call(e):[e]}n.d(t,"f",(function(){return u})),n.d(t,"g",(function(){return f})),n.d(t,"e",(function(){return a})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return d})),n.d(t,"d",(function(){return l})),n.d(t,"b",(function(){return v}));var o={};function c(){if(!o.matcher)for(var e=0,t=["matchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector","webkitMatchesSelector"];e<t.length;e++){var n=t[e];if(n in Element.prototype){o.matcher=n;break}}return o.matcher}function i(e,t,n,o,c){if(!t||!n)return!1;for(var i=r(e),u=r(t),f=r(n),a=0;a<i.length;++a)for(var s=0;s<u.length;++s)i[a]["".concat(o,"EventListener")](u[s],f[Math.min(s,f.length-1)],c);return!0}function u(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document;return t.querySelector(e)}function f(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document;return r(t.querySelectorAll(e))}function a(e,t,n,r){return i(e,t,n,"add",r)}function s(e,t,n,r){return i(e,t,n,"remove",r)}function d(e){var t=e;return 0===e.type.indexOf("touch")&&(t=e.touches[0]||e.changedTouches[0]),{clientX:t.clientX,clientY:t.clientY}}function l(e){for(var t=0,n=0;e&&!isNaN(e.offsetLeft)&&!isNaN(e.offsetTop);)t+=e.offsetLeft-("BODY"!==e.tagName?e.scrollLeft:0),n+=e.offsetTop-("BODY"!==e.tagName?e.scrollTop:0),e=e.offsetParent;return{top:n,left:t}}function v(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2?arguments[2]:void 0,o=c(),i=r(t).find((function(t){return e[o]&&e[o](t)}));return!i&&n&&(i=r(t).find((function(t){return h(e,t)}))),i}function h(e,t){var n="string"==typeof t,r=!1;do{r=n?v(e,t):e===t,e=e.parentNode}while(!r&&e);return!!r}},2:function(e,t,n){"use strict";n.r(t);var r=n(15),o=n(20);Object(r.f)("#touch").innerText=o.b?"true":"false",Object(r.f)("#passive-events").innerText=o.a?"true":"false"},20:function(e,t,n){"use strict";var r;n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return u}));var o={};Object.defineProperties(o,{check:{get:function(){if(void 0!==r)return r;function e(){}var t=Object.defineProperty({},"passive",{get:function(){r=!0}});return window.addEventListener("_",e,t),window.removeEventListener("_",e,t),r}}});var c={};Object.defineProperties(c,{check:{get:function(){return"ontouchstart"in window}}});var i=o.check,u=c.check}}]);