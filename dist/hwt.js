!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.HWT=t():e.HWT=t()}(self,(()=>(()=>{"use strict";var e={d:(t,r)=>{for(var o in r)e.o(r,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:r[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{createElement:()=>i,currentPath:()=>j,deleteChangeListener:()=>n,deleteProperty:()=>a,getBaseName:()=>d,getFileName:()=>y,getParentDirectory:()=>b,getProperty:()=>l,isLeapYear:()=>h,loadScript:()=>p,loadStylesheet:()=>f,merge:()=>c,mergeStyle:()=>m,readFile:()=>u,setChangeListener:()=>o,setProperty:()=>s});const r="__change-listeners__",o=(e,t,o)=>{(null==e[r]||e.propertyIsEnumerable(r)||"object"!=typeof e[r]&&!Array.isArray(e[r]))&&Object.defineProperty(e,r,{value:{},writable:!1,enumerable:!1,configurable:!1}),"function"==typeof o&&(e[r][t]=o)},n=(e,t)=>delete e?.[r]?.[t],c=(e,t)=>{const r=(e,o)=>{Object.keys(e).forEach((n=>{null!=e[n]&&"object"==typeof e[n]?(t[n]=Array.isArray(e[n])?[]:{},r(e[n],[...o,n])):s(t,[...o,n].join("."),e[n])}))};return r(e,""),t},l=(e,t)=>t.split(".").reduce(((e,t)=>e?.[t]),e),s=(e,t,o,n=[])=>!!e&&t.split(".").forEach(((t,c,l)=>{const s=e,a=e[r];if("object"==typeof a&&n.splice(0,0,((e,t)=>Object.values(a).forEach((r=>"function"==typeof r&&r(s,l.slice(c).join("."),e,t,l.slice(0,c).join(".")))))),c<l.length-1)null!=e[t]&&"object"==typeof e[t]||(/^\d+$/.test(l[c+1])&&!Array.isArray(e[t])?e[t]=[]:e[t]={}),e=e[t];else{const r=e[t],c="function"==typeof o?o(r):o;e[t]=c,n.forEach((e=>e(r,c)))}})),a=(e,t,o=[])=>!!e&&t.split(".").every(((t,n,c)=>{const l=e,s=e[r];if("object"==typeof s&&o.splice(0,0,((e,t)=>Object.values(s).forEach((r=>"function"==typeof r&&r(l,c.slice(n).join("."),e,t,c.slice(0,n).join(".")))))),n<c.length-1){if(null==e[t]||"object"!=typeof e[t])return!1;e=e[t]}else{const r=e[t];delete e[t],o.forEach((e=>e(r,void 0)))}})),i=(e,{innerHTML:t,children:r,listeners:o,constructor:n,style:l,...s})=>{const a=document.createElement(e);return t&&(a.innerHTML=t),r&&a.append(...r.filter((e=>!!e))),o&&Object.keys(o).forEach((e=>{"function"==typeof o[e]?a.addEventListener(e,o[e]):a.addEventListener(e,o[e].listener,o[e].useCapture)})),m(a,l),n&&n(a),s&&c(s,a),a},p=(e,t)=>new Promise(((r,o)=>document.head.append(i("script",{src:e,constructor:e=>{e.onload=()=>r(e),e.onerror=e=>o(e)},...t})))),f=(e,t)=>new Promise(((r,o)=>document.head.append(i("link",{href:e,rel:"stylesheet",type:"text/css",constructor:e=>{e.onload=()=>r(e),e.onerror=e=>o(e)},...t})))),u=(e,t="readAsText")=>new Promise((r=>{try{const o=new FileReader;o.onloadend=({target:e})=>r(e.result),o.onabort=()=>r(null),o.onerror=()=>r(null),o[t](e)}catch{r(null)}})),y=e=>e.substr(e.search(/[^\/\\]+$/)),d=e=>y(e).replace(/\.[^.]+$/,""),b=e=>e.replace(/(\\|\/)?([^\\\/]+)?$/g,"");function j(e=""){return`${b(document.currentScript.src)}/${e?.replace(/^(\\|\/)+/g,"")||""}`}const h=e=>e%4==0&&e%100!=0||e%400==0,m=(e,t)=>(t&&"object"==typeof t&&Object.keys(t).forEach((r=>t[r]&&e.style.setProperty(r,t[r]))),e);return t})()));