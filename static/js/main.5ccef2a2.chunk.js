(this["webpackJsonptkom-spreadsheet"]=this["webpackJsonptkom-spreadsheet"]||[]).push([[0],{12:function(e,t,r){e.exports=r(23)},17:function(e,t,r){},18:function(e,t,r){},23:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),l=r(2),s=r.n(l),o=(r(17),r(18),r(9)),c=r(6),i=r.n(c),u=r(11),h=r(3),f=r.n(h),v=i.a.mark(b);function b(){var e,t,r;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:e=function(e){return String.fromCharCode(e.charCodeAt(0)+1)},t=["A"];case 2:return n.next=5,t.slice().reverse().join("");case 5:t[r=0]=e(t[r]);case 7:if(!(t[r].charCodeAt(0)>"Z".charCodeAt(0))){n.next=16;break}if(t[r]="A",!(++r>=t.length)){n.next=13;break}return t.push("A"),n.abrupt("break",16);case 13:t[r]=e(t[r]),n.next=7;break;case 16:n.next=2;break;case 18:case"end":return n.stop()}}),v)}var m,y,d,p,g=Object(u.a)((function(e){var t=function(e){var t=Object(n.useState)(e),r=Object(o.a)(t,2),a=r[0],l=r[1];return[function(e){return a&&a.x===e.x&&a.y===e.y},function(e){l(null==e?null:{x:e.x,y:e.y})}]}(),r=Object(o.a)(t,2),l=r[0],s=r[1],c=function(e){13===e.keyCode&&e.target.blur()},i=b();return a.a.createElement("div",{className:f.a.Spreadsheet},a.a.createElement("table",null,a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null),Array(e.x).fill(0).map((function(e,t){return a.a.createElement("th",{key:t},i.next().value)})))),a.a.createElement("tbody",null,e.cells.map((function(t,r){return a.a.createElement("tr",{key:r},a.a.createElement("th",null,r+1),t.map((function(t,r){return a.a.createElement("td",{onClick:function(e){return function(e,t){s(t)}(0,t)},key:r},l(t)?a.a.createElement("input",{onKeyDown:c,onFocus:function(e){return function(e,t){e.target.value=t.formula?t.formula:t.value,e.target.parentNode.classList.add(f.a.focus)}(e,t)},onBlur:function(r){return function(t,r){e.onCellSet(r,t.target.value),t.target.parentNode.classList.remove(f.a.focus),l(r)&&s(null)}(r,t)},autoFocus:!0}):a.a.createElement("div",{className:t.error?f.a.error:""},t.error?t.error:t.value))})))})))))})),k=r(4),A=r(5),C=(r(22),r(7)),w=r(8),x=r(1),j=function(){function e(t,r){Object(C.a)(this,e),this.cells=[],this.x=t,this.y=r,this.cells=Array(r);for(var n=0;n<r;n++){this.cells[n]=Array(t);for(var a=0;a<t;a++)this.cells[n][a]=new O(this,n,a)}}return Object(w.a)(e,[{key:"getCellByLabel",value:function(e){e=e.toUpperCase();for(var t,r=0;r<e.length&&(t=e[r],"A".charCodeAt(0)<=t.charCodeAt(0)&&t.charCodeAt(0)<="Z".charCodeAt(0));)r++;var n=e.substring(0,r),a=e.substring(r);if(0===n.length||0===a.length)throw Error("Incorrect label: ".concat(e));for(var l=parseInt(a)-1,s=0,o=0;o<n.length;o++)s*="Z".charCodeAt(0)-"A".charCodeAt(0)+1,s+=n[o].charCodeAt(0)-"A".charCodeAt(0);if(this.x<=s||this.y<=l)throw Error("No cell: ".concat(e));return this.cells[l][s]}}]),e}(),O=(m=function(){function e(t,r,n){Object(C.a)(this,e),Object(k.a)(this,"formula",y,this),Object(k.a)(this,"value",d,this),Object(k.a)(this,"error",p,this),this.observers=[],this.subjects=[],this.sheet=t,this.x=r,this.y=n}return Object(w.a)(e,[{key:"set",value:function(e){this.unregisterFromAllSubjects();try{if(function(e){return"="===e.charAt(0)}(e)){this.formula=e;var t=[this.sheet.getCellByLabel(this.formula.substring(1))];this.calculateValue();for(var r=0,n=t;r<n.length;r++){var a=n[r];this.observe(a)}}else this.value=e,this.formula=null;var l=this.topologicalSort(),s=!0,o=!1,c=void 0;try{for(var i,u=l[Symbol.iterator]();!(s=(i=u.next()).done);s=!0){i.value.calculateValue()}}catch(h){o=!0,c=h}finally{try{s||null==u.return||u.return()}finally{if(o)throw c}}this.error=null}catch(f){this.error=f.message}}},{key:"unregisterFromAllSubjects",value:function(){var e=!0,t=!1,r=void 0;try{for(var n,a=this.subjects[Symbol.iterator]();!(e=(n=a.next()).done);e=!0){n.value.unregisterObserver(this)}}catch(l){t=!0,r=l}finally{try{e||null==a.return||a.return()}finally{if(t)throw r}}this.subjects=[]}},{key:"observe",value:function(e){e.registerObserver(this),this.subjects.push(e)}},{key:"topologicalSort",value:function(){var e=[],t=[];return function r(n){if(t.includes(n))return;if(e.includes(n))throw Error("cycle");e.push(n);var a=!0,l=!1,s=void 0;try{for(var o,c=n.observers[Symbol.iterator]();!(a=(o=c.next()).done);a=!0){var i=o.value;r(i)}}catch(u){l=!0,s=u}finally{try{a||null==c.return||c.return()}finally{if(l)throw s}}t.push(n)}(this),t.reverse().slice(1)}},{key:"registerObserver",value:function(e){this.observers.push(e)}},{key:"unregisterObserver",value:function(e){var t=this.observers.indexOf(e);t===this.observers.length-1?this.observers.pop():this.observers[t]=this.observers.pop()}},{key:"calculateValue",value:function(){var e=this.sheet.getCellByLabel(this.formula.substring(1));this.value=e.value}}]),e}(),y=Object(A.a)(m.prototype,"formula",[x.m],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),d=Object(A.a)(m.prototype,"value",[x.m],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),p=Object(A.a)(m.prototype,"error",[x.m],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),m);var E=new j(5,10);var S=function(){return Object(n.useEffect)((function(){E.cells[0][0].set("Self reference"),E.cells[0][1].set("=B1"),E.cells[1][0].set("Cycle"),E.cells[1][1].set("=C2"),E.cells[1][2].set("=B2"),E.cells[2][0].set("Auto update working"),E.cells[2][2].set("=B3"),E.cells[2][3].set("=C3"),E.cells[2][1].set("co\u015b")}),[]),a.a.createElement("div",{className:"App"},a.a.createElement(g,{x:E.x,y:E.y,cells:E.cells,onCellSet:function(e,t){e.set(t)}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(a.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},3:function(e,t,r){e.exports={Spreadsheet:"Spreadsheet_Spreadsheet__2MlAU",focus:"Spreadsheet_focus__2PRei",error:"Spreadsheet_error__2OBGk"}}},[[12,1,2]]]);
//# sourceMappingURL=main.5ccef2a2.chunk.js.map