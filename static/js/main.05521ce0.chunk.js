(this["webpackJsonptkom-spreadsheet"]=this["webpackJsonptkom-spreadsheet"]||[]).push([[0],{1:function(e,r,t){"use strict";t.d(r,"a",(function(){return i}));var s=t(25),n=t(34),a=t.n(n),o={ws:/[ \t\u00A0\u1680\u2000-\u200a\u2028\u2029\u202f\u3000]+/,end:{match:/\n/,lineBreaks:!0},identifier:{match:/[a-zA-Z]+[0-9]*/,type:s.keywords({kwIf:"if",kwWhile:"while",kwFor:"for",kwElse:"else",kwDef:"def"})},dot:".",lparen:"(",rparen:")",lsquare:"[",rsquare:"]",plus:"+",asterisk:"*",slash:"/",minus:"-",semicolon:";",colon:":",compOperator:/==|>=|<=|<|>|!=/,assign:"=",number:{match:/[1-9][0-9]*(?:,[0-9]*)?|0(?:\.[0-9]+)?/,value:function(e){return parseFloat(e)}}},i=new a.a(s.compile(o),"ws","end")},13:function(e,r,t){"use strict";var s=t(6),n=t(7),a=t(15),o=t(3),i=t(4);function l(e){var r=Object(o.a)(e,3),t=r[0],s=(r[1],r[2]);return{type:i.a.addition,op1:t,op2:s}}function c(e){var r=Object(o.a)(e,3),t=r[0],s=(r[1],r[2]);return{type:i.a.subtraction,op1:t,op2:s}}function u(e){var r=Object(o.a)(e,3),t=r[0],s=(r[1],r[2]);return{type:i.a.multiplication,op1:t,op2:s}}function p(e){var r=Object(o.a)(e,3),t=r[0],s=(r[1],r[2]);return{type:i.a.division,op1:t,op2:s}}function f(e){return e[1]}function m(e){var r=Object(o.a)(e,1)[0];return{type:i.a.primary,value:r.value}}function h(e){var r=Object(o.a)(e,2),t=(r[0],r[1]);return{type:i.a.primary,value:-t.value}}function b(e){var r=Object(o.a)(e,3),t=r[0],s=(r[1],r[2]);return{type:i.a.functionCall,identifier:t.value,args:s}}function _(e){var r=Object(o.a)(e,1)[0];return{type:i.a.variable,identifier:r.value}}function y(e){var r=Object(o.a)(e,3),t=r[0],s=(r[1],r[2]);return{type:i.a.range,cell1:t,cell2:s}}function d(e){var r=Object(o.a)(e,2),t=r[0],s=r[1],n=[t],a=!0,i=!1,l=void 0;try{for(var c,u=s[Symbol.iterator]();!(a=(c=u.next()).done);a=!0){var p=c.value;n.push(p[1])}}catch(f){i=!0,l=f}finally{try{a||null==u.return||u.return()}finally{if(i)throw l}}return n}function v(e){var r=Object(o.a)(e,3),t=r[0],s=r[1],n=r[2];return{type:i.a.comparision,op1:t,op2:n,operator:s.value}}function x(){return[]}var E=t(1);function g(e){return e[0]}var k={Lexer:E.a,ParserRules:[{name:"formulaEntry",symbols:["expr"]},{name:"expr",symbols:["comparison"],postprocess:g},{name:"comparison",symbols:["sum"],postprocess:g},{name:"comparison",symbols:["sum",E.a.has("compOperator")?{type:"compOperator"}:compOperator,"sum"],postprocess:v},{name:"sum",symbols:["product"],postprocess:g},{name:"sum",symbols:["sum",E.a.has("plus")?{type:"plus"}:plus,"product"],postprocess:l},{name:"sum",symbols:["sum",E.a.has("minus")?{type:"minus"}:minus,"product"],postprocess:c},{name:"product",symbols:["primary"],postprocess:g},{name:"product",symbols:["product",E.a.has("asterisk")?{type:"asterisk"}:asterisk,"primary"],postprocess:u},{name:"product",symbols:["product",E.a.has("slash")?{type:"slash"}:slash,"primary"],postprocess:p},{name:"primary",symbols:[E.a.has("lparen")?{type:"lparen"}:lparen,"expr",E.a.has("rparen")?{type:"rparen"}:rparen],postprocess:f},{name:"primary",symbols:[E.a.has("number")?{type:"number"}:number],postprocess:m},{name:"primary",symbols:[E.a.has("minus")?{type:"minus"}:minus,E.a.has("number")?{type:"number"}:number],postprocess:h},{name:"primary",symbols:["variable"],postprocess:g},{name:"primary",symbols:["function_call"],postprocess:g},{name:"primary",symbols:["range"],postprocess:g},{name:"variable",symbols:[E.a.has("identifier")?{type:"identifier"}:identifier],postprocess:_},{name:"function_call",symbols:[E.a.has("identifier")?{type:"identifier"}:identifier,E.a.has("lparen")?{type:"lparen"}:lparen,"args",E.a.has("rparen")?{type:"rparen"}:rparen],postprocess:b},{name:"function_call",symbols:[E.a.has("kwIf")?{type:"kwIf"}:kwIf,E.a.has("lparen")?{type:"lparen"}:lparen,"args",E.a.has("rparen")?{type:"rparen"}:rparen],postprocess:b},{name:"args$ebnf$1",symbols:[]},{name:"args$ebnf$1$subexpression$1",symbols:[E.a.has("semicolon")?{type:"semicolon"}:semicolon,"expr"]},{name:"args$ebnf$1",symbols:["args$ebnf$1","args$ebnf$1$subexpression$1"],postprocess:function(e){return e[0].concat([e[1]])}},{name:"args",symbols:["expr","args$ebnf$1"],postprocess:d},{name:"args",symbols:[],postprocess:x},{name:"range",symbols:["variable",E.a.has("colon")?{type:"colon"}:colon,"variable"],postprocess:y},{name:"entry",symbols:["code"]},{name:"code$ebnf$1",symbols:[]},{name:"code$ebnf$1$subexpression$1",symbols:[E.a.has("end")?{type:"end"}:end,"statement"]},{name:"code$ebnf$1",symbols:["code$ebnf$1","code$ebnf$1$subexpression$1"],postprocess:function(e){return e[0].concat([e[1]])}},{name:"code",symbols:["statement","code$ebnf$1"],postprocess:d},{name:"statement",symbols:["expr"],postprocess:function(e){return{expr:Object(o.a)(e,1)[0],type:i.a.expr}}},{name:"statement",symbols:["assigment"],postprocess:g},{name:"statement",symbols:["blockStart"],postprocess:g},{name:"statement",symbols:[],postprocess:null},{name:"blockStart",symbols:[E.a.has("kwWhile")?{type:"kwWhile"}:kwWhile,"expr",E.a.has("end")?{type:"end"}:end,"block"],postprocess:function(e){var r=Object(o.a)(e,4),t=r[1],s=r[3];return{type:i.a.whileLoop,condition:t,block:s}}},{name:"blockStart$ebnf$1$subexpression$1",symbols:["else"]},{name:"blockStart$ebnf$1",symbols:["blockStart$ebnf$1$subexpression$1"],postprocess:g},{name:"blockStart$ebnf$1",symbols:[],postprocess:function(e){return null}},{name:"blockStart",symbols:[E.a.has("kwIf")?{type:"kwIf"}:kwIf,"expr",E.a.has("end")?{type:"end"}:end,"block","blockStart$ebnf$1"],postprocess:function(e){var r=Object(o.a)(e,5),t=r[1],s=r[3],n=r[4];return{type:i.a.ifElse,condition:t,block:s,elseBlock:n}}},{name:"else",symbols:[E.a.has("kwElse")?{type:"kwElse"}:kwElse,E.a.has("end")?{type:"end"}:end,"block"],postprocess:function(e){return Object(o.a)(e,3)[2]}},{name:"assigment",symbols:["expr",E.a.has("assign")?{type:"assign"}:assign,"expr"],postprocess:function(e){var r=Object(o.a)(e,3),t=r[0],s=(r[1],r[2]);return{type:i.a.assigment,left:t,right:s}}},{name:"block$ebnf$1$subexpression$1",symbols:[E.a.has("end")?{type:"end"}:end]},{name:"block$ebnf$1",symbols:["block$ebnf$1$subexpression$1"],postprocess:g},{name:"block$ebnf$1",symbols:[],postprocess:function(e){return null}},{name:"block",symbols:[E.a.has("indent")?{type:"indent"}:indent,"code",E.a.has("dedent")?{type:"dedent"}:dedent,"block$ebnf$1"],postprocess:function(e){return Object(o.a)(e,2)[1]}}],ParserStart:"entry"};function O(e){return e[0]}var w={Lexer:E.a,ParserRules:[{name:"formulaEntry",symbols:["expr"]},{name:"expr",symbols:["comparison"],postprocess:O},{name:"comparison",symbols:["sum"],postprocess:O},{name:"comparison",symbols:["sum",E.a.has("compOperator")?{type:"compOperator"}:compOperator,"sum"],postprocess:v},{name:"sum",symbols:["product"],postprocess:O},{name:"sum",symbols:["sum",E.a.has("plus")?{type:"plus"}:plus,"product"],postprocess:l},{name:"sum",symbols:["sum",E.a.has("minus")?{type:"minus"}:minus,"product"],postprocess:c},{name:"product",symbols:["primary"],postprocess:O},{name:"product",symbols:["product",E.a.has("asterisk")?{type:"asterisk"}:asterisk,"primary"],postprocess:u},{name:"product",symbols:["product",E.a.has("slash")?{type:"slash"}:slash,"primary"],postprocess:p},{name:"primary",symbols:[E.a.has("lparen")?{type:"lparen"}:lparen,"expr",E.a.has("rparen")?{type:"rparen"}:rparen],postprocess:f},{name:"primary",symbols:[E.a.has("number")?{type:"number"}:number],postprocess:m},{name:"primary",symbols:[E.a.has("minus")?{type:"minus"}:minus,E.a.has("number")?{type:"number"}:number],postprocess:h},{name:"primary",symbols:["variable"],postprocess:O},{name:"primary",symbols:["function_call"],postprocess:O},{name:"primary",symbols:["range"],postprocess:O},{name:"variable",symbols:[E.a.has("identifier")?{type:"identifier"}:identifier],postprocess:_},{name:"function_call",symbols:[E.a.has("identifier")?{type:"identifier"}:identifier,E.a.has("lparen")?{type:"lparen"}:lparen,"args",E.a.has("rparen")?{type:"rparen"}:rparen],postprocess:b},{name:"function_call",symbols:[E.a.has("kwIf")?{type:"kwIf"}:kwIf,E.a.has("lparen")?{type:"lparen"}:lparen,"args",E.a.has("rparen")?{type:"rparen"}:rparen],postprocess:b},{name:"args$ebnf$1",symbols:[]},{name:"args$ebnf$1$subexpression$1",symbols:[E.a.has("semicolon")?{type:"semicolon"}:semicolon,"expr"]},{name:"args$ebnf$1",symbols:["args$ebnf$1","args$ebnf$1$subexpression$1"],postprocess:function(e){return e[0].concat([e[1]])}},{name:"args",symbols:["expr","args$ebnf$1"],postprocess:d},{name:"args",symbols:[],postprocess:x},{name:"range",symbols:["variable",E.a.has("colon")?{type:"colon"}:colon,"variable"],postprocess:y}],ParserStart:"formulaEntry"},$=t(5);t.d(r,"b",(function(){return C})),t.d(r,"a",(function(){return A}));var C=function(){function e(){Object(s.a)(this,e),this.parser=new a.Parser(a.Grammar.fromCompiled(k))}return Object(n.a)(e,[{key:"feed",value:function(e){try{this.parser.feed(e)}catch(r){throw new $.a(r.message)}}},{key:"results",get:function(){try{return this.parser.results[0][0]}catch(e){return null}}}]),e}(),A=function(){function e(){Object(s.a)(this,e),this.parser=new a.Parser(a.Grammar.fromCompiled(w))}return Object(n.a)(e,[{key:"feed",value:function(e){try{this.parser.feed(e)}catch(r){throw new $.a("Syntax error")}}},{key:"results",get:function(){try{return this.parser.results[0][0]}catch(e){return null}}}]),e}()},14:function(e,r,t){e.exports={Spreadsheet:"Spreadsheet_Spreadsheet__2MlAU",focus:"Spreadsheet_focus__2PRei",error:"Spreadsheet_error__2OBGk"}},20:function(e,r,t){e.exports={Editor:"Editor_Editor__3K0No",Top:"Editor_Top__3e9Hb",Bottom:"Editor_Bottom__MdgSJ"}},32:function(module,__webpack_exports__,__webpack_require__){"use strict";var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),_Spreadsheet__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(33),_mobx_SpreadsheetStore__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(39),_parser_functions__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(35),_App_module_scss__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(36),_App_module_scss__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(_App_module_scss__WEBPACK_IMPORTED_MODULE_4__),_Editor__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(37),_parser_lexer__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(1),_parser_parsers__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(13),store=new _mobx_SpreadsheetStore__WEBPACK_IMPORTED_MODULE_2__.a(5,100,_parser_functions__WEBPACK_IMPORTED_MODULE_3__.a);function App(){return Object(react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(populateSheet,[]),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div",{className:_App_module_scss__WEBPACK_IMPORTED_MODULE_4___default.a.App},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Spreadsheet__WEBPACK_IMPORTED_MODULE_1__.a,{x:store.x,y:store.y,cells:store.cells,onCellSet:function(e,r,t){e.set(r,t)}}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Editor__WEBPACK_IMPORTED_MODULE_5__.a,{examples:examples,onSubmit:function(e){if(""!==e)try{var r=new _parser_parsers__WEBPACK_IMPORTED_MODULE_7__.b;r.feed(e),store.exec(r.results)}catch(t){if("UserError"!==t.name)throw t;console.log(t.message)}},onLogLexerOutput:function(e){try{_parser_lexer__WEBPACK_IMPORTED_MODULE_6__.a.reset(e);for(var r=[],t=_parser_lexer__WEBPACK_IMPORTED_MODULE_6__.a.next();void 0!==t;)r.push(t),t=_parser_lexer__WEBPACK_IMPORTED_MODULE_6__.a.next();console.log(r)}catch(s){if("UserError"!==s.name)throw s;console.log(s.message)}},onLogParseTree:function(e){try{var r=new _parser_parsers__WEBPACK_IMPORTED_MODULE_7__.b;r.feed(e),console.log(r.results)}catch(t){if("UserError"!==t.name)throw t;console.log(t.message)}}}))}__webpack_exports__.a=App;var examples=["i = 0\nwhile i < 5\n    cell[15][i] = i\n    i = i + 1","A1 = 5\ni = 5\nwhile i > 0\n    i = i - 1\n    A1 = A1 + 2","if A1 == 5\n    A2 = 5\nelse\n    A2 = 10  \n",'A1.background = "#52A"'];function populateSheet(){var cells=store.cells,r=0;cells[r][0].set("Self reference"),cells[r][1].set("=B1"),cells[++r][0].set("Cycle"),cells[r][1].set("=C2"),cells[r][2].set("=B2"),cells[++r][0].set("Auto update working"),cells[r][2].set("=B3"),cells[r][3].set("=B3+C3"),cells[r][1].set("co\u015b"),cells[++r][0].set("Simple math");var x="1+2*(5+5)+2/3+((1*3))/2";cells[r][1].set("="+x),cells[r][2].set("is ".concat(eval(x))),cells[++r][0].set("Complex math"),x="1-1+2*(5+5)+2/3+((1*3))/2",cells[r][1].set("="+x),cells[r][2].set("is ".concat(eval(x))),cells[++r][0].set("Negative numbers"),x="1-1+1",cells[r][1].set("="+x),cells[r][2].set("is ".concat(eval(x))),cells[++r][0].set("Math with labels"),cells[r][1].set("=C7+D7*E7"),cells[r][2].set("2"),cells[r][3].set("2"),cells[r][4].set("2"),cells[++r][0].set("Invalid formulas"),cells[r][1].set("=C7D7*E7"),cells[r][2].set("=as325"),cells[r][3].set("=1**2"),cells[++r][0].set("* and / order"),x="3/3*3",cells[r][1].set("="+x),cells[r][2].set("is ".concat(eval(x))),cells[++r][0].set("- at the begging and --"),x="-1+2",cells[r][1].set("="+x),cells[r][2].set("is ".concat(eval(x))),cells[++r][0].set("function call"),cells[r][1].set("=sum(C11;D11;E11)"),cells[r][2].set("1"),cells[r][3].set("2"),cells[r][4].set("3"),cells[++r][0].set("function with range"),cells[r][1].set("=sum(C11:E12)"),cells[r][2].set("1"),cells[r][3].set("2"),cells[r][4].set("3"),cells[++r][0].set("Not existing function"),cells[r][1].set("=foo(C11:E12)"),cells[++r][0].set("If"),cells[r][1].set("=if(C14<D14;1;0)"),cells[r][2].set("5"),cells[r][3].set("6")}},33:function(e,r,t){"use strict";var s=t(3),n=t(24),a=t.n(n),o=t(0),i=t.n(o),l=t(41),c=t(14),u=t.n(c),p=a.a.mark(f);function f(){var e,r,t;return a.a.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:e=function(e){return String.fromCharCode(e.charCodeAt(0)+1)},r=["A"];case 2:return s.next=5,r.slice().reverse().join("");case 5:r[t=0]=e(r[t]);case 7:if(!(r[t].charCodeAt(0)>"Z".charCodeAt(0))){s.next=16;break}if(r[t]="A",!(++t>=r.length)){s.next=13;break}return r.push("A"),s.abrupt("break",16);case 13:r[t]=e(r[t]),s.next=7;break;case 16:s.next=2;break;case 18:case"end":return s.stop()}}),p)}r.a=Object(l.a)((function(e){var r=function(e){var r=Object(o.useState)(e),t=Object(s.a)(r,2),n=t[0],a=t[1];return[function(e){return n&&n.x===e.x&&n.y===e.y},function(e){a(null==e?null:{x:e.x,y:e.y})}]}(),t=Object(s.a)(r,2),n=t[0],a=t[1],l=function(e){13===e.keyCode&&e.target.blur()},c=f();return i.a.createElement("div",{className:u.a.Spreadsheet},i.a.createElement("table",null,i.a.createElement("thead",null,i.a.createElement("tr",null,i.a.createElement("th",null),Array(e.x).fill(0).map((function(e,r){return i.a.createElement("th",{key:r},c.next().value)})))),i.a.createElement("tbody",null,e.cells.map((function(r,t){return i.a.createElement("tr",{key:t},i.a.createElement("th",null,t+1),r.map((function(r,t){return i.a.createElement("td",{style:{backgroundColor:r.background},onClick:function(e){return function(e,r){a(r)}(0,r)},key:t},n(r)?i.a.createElement("input",{onKeyDown:l,onFocus:function(e){return function(e,r){e.target.value=r.formula?r.formula:r.value,e.target.parentNode.classList.add(u.a.focus)}(e,r)},onBlur:function(t){return function(r,t){e.onCellSet(t,r.target.value),r.target.parentNode.classList.remove(u.a.focus),n(t)&&a(null)}(t,r)},autoFocus:!0}):i.a.createElement("div",{className:r.error?u.a.error:""},r.error?r.error:r.value))})))})))))}))},34:function(e,r,t){!function(){function r(e,r,t){this.lexer=e,this.indents=[],this.tokens=[""],this.afterNewLine=!0,this.ws=r,this.nl=t,this.previous=null}function t(e,r){return 0===e.lastIndexOf(r,0)}function s(e){for(var r="",t=0;t<e.length;++t){for(var s=e.charCodeAt(t),n="",a=0;a<4;++a){var o=s%16;s/=16;var i=o<10?48:87;n=String.fromCharCode(o+i)+n}r+="\\u"+n}return'"'+r+'"'}r.prototype.next=function(){return this.ignoreExcessiveEndsNext()},r.prototype.ignoreExcessiveEndsNext=function(){var e=this.ignoreWhiteSpaceNext();if(void 0===e)return e;for(;null!==this.previous&&this.previous.type===this.end&&e.type===this.end;);return this.previous=e,e},r.prototype.ignoreWhiteSpaceNext=function(){for(var e;(e=this.indentedNext())&&e.type===this.ws;);return e},r.prototype.indentedNext=function(){for(;0===this.tokens.length;)this.generateMoreTokens();return this.tokens.shift()},r.prototype.generateMoreTokens=function(){var e=this.lexer.next(this);if(!e)return this.changeIndent(""),void this.tokens.push(e);this.afterNewLine?(this.afterNewLine=!1,e.type===this.ws?this.changeIndent(e.value,e.col,e.line,e.offset):(this.changeIndent("",e.col,e.line,e.offset),this.tokens.push(e))):this.tokens.push(e),this.afterNewLine=e.type===this.nl},r.prototype.changeIndent=function(e,r,n,a){for(;e!==this.indents[this.indents.length-1];){var o=this.indents[this.indents.length-1];if(t(e,o))return this.tokens.push({type:"indent",text:e,value:e,lineBreaks:0,col:r,line:n,offset:a}),void this.indents.push(e);if(!t(o,e))throw o=s(o),e=s(e),Error("Indentations cannot be compared: "+o+" and "+e+".");this.tokens.push({type:"dedent",text:e,value:e,lineBreaks:0,col:r,line:n,offset:a}),this.tokens.push({type:"end",text:"afterDedent",value:"afterDedent",lineBreaks:0,col:r,line:n,offset:a}),this.indents.pop()}},r.prototype.save=function(){return this.lexer.save()},r.prototype.reset=function(e,r){this.lexer.reset(e.replace(/^\n|\n$/g,""),r),this.indents=[""],this.tokens=[],this.afterNewLine=!0},r.prototype.formatError=function(e){return this.lexer.formatError(e,"Invalid syntax")},r.prototype.has=function(e){return this.lexer.has(e)},e.exports?e.exports=r:window.IndentedLexer=r}()},35:function(e,r,t){"use strict";function s(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];return r.flat().reduce((function(e,r){return e+r}),0)}t.d(r,"a",(function(){return n}));var n={sum:s,avg:function(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];return s(r=r.flat())/r.length},if:function(e,r,t){return e?r:t}}},36:function(e,r,t){e.exports={App:"App_App__rq8wc"}},37:function(e,r,t){"use strict";var s=t(3),n=t(0),a=t.n(n),o=t(20),i=t.n(o),l=t(38),c=t.n(l),u=(t(58),t(59),t(60),function(e){var r=Object(n.useState)(""),t=Object(s.a)(r,2),o=t[0],l=t[1];return a.a.createElement("div",{className:i.a.Editor},a.a.createElement("div",{className:i.a.Top},e.examples.map((function(e,r){return a.a.createElement("button",{key:r,onClick:function(){return l(e)}}," Example ",r," ")}))),a.a.createElement(c.a,{mode:"python",theme:"cobalt",onChange:l,value:o,height:"100%",width:"100%"}),a.a.createElement("div",{className:i.a.Bottom},a.a.createElement("button",{onClick:function(){return e.onLogParseTree(o)}}," Log parse tree "),a.a.createElement("button",{onClick:function(){return e.onLogLexerOutput(o)}}," Log tokens "),a.a.createElement("button",{onClick:function(){return e.onSubmit(o)}}," Run ")))});u.defaultProps={examples:["123","hello world"]},r.a=u},39:function(e,r,t){"use strict";var s,n,a,o,i,l,c=t(3),u=t(21),p=t(6),f=t(7),m=t(13),h=t(4),b=t(5),_=t(19),y=t(9),d=t(8),v=t(18),x=t(16),E=t(17),g=(t(50),t(2)),k=(s=function(){function e(){Object(p.a)(this,e),Object(x.a)(this,"formula",n,this),Object(x.a)(this,"value",a,this),this.ast=null,this.observers=[],this.subjects=[]}return Object(f.a)(e,[{key:"unregisterFromAllSubjects",value:function(){var e=!0,r=!1,t=void 0;try{for(var s,n=this.subjects[Symbol.iterator]();!(e=(s=n.next()).done);e=!0){s.value._unregisterObserver(this)}}catch(a){r=!0,t=a}finally{try{e||null==n.return||n.return()}finally{if(r)throw t}}this.subjects=[]}},{key:"observe",value:function(e){e.observers.push(this),this.subjects.push(e)}},{key:"_unregisterObserver",value:function(e){var r=this.observers.indexOf(e);r===this.observers.length-1?this.observers.pop():this.observers[r]=this.observers.pop()}}]),e}(),n=Object(E.a)(s.prototype,"formula",[g.m],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),a=Object(E.a)(s.prototype,"value",[g.m],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),s),O=(o=function(e){function r(e,t,s){var n;return Object(p.a)(this,r),n=Object(_.a)(this,Object(y.a)(r).call(this)),Object(x.a)(n,"background",i,Object(d.a)(n)),Object(x.a)(n,"error",l,Object(d.a)(n)),n.x=e,n.y=t,n.manager=s,n}return Object(v.a)(r,e),Object(f.a)(r,[{key:"set",value:function(e){this.manager.setCell(this,e)}}]),r}(k),i=Object(E.a)(o.prototype,"background",[g.m],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),l=Object(E.a)(o.prototype,"error",[g.m],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),o);function w(e){for(var r=function(e){for(var r,t=0;t<e.length&&(1===(r=e[t]).length&&r.match(/[a-z]/i));)t++;var s=e.substring(0,t),n=e.substring(t);if(0===s.length||0===n.length)throw new b.a("Incorrect identifier: ".concat(e));return[s,n]}(e),t=Object(c.a)(r,2),s=t[0],n=t[1],a=parseInt(n)-1,o=0,i=0;i<s.length;i++)o*="Z".charCodeAt(0)-"A".charCodeAt(0)+1,o+=s[i].charCodeAt(0)-"A".charCodeAt(0);return[o,a]}t.d(r,"a",(function(){return $}));var $=function(){function e(r,t,s){Object(p.a)(this,e),this.cells=[],this.variables={},this.x=r,this.y=t,this.variables=s,this.cells=Array(t);for(var n=0;n<t;n++){this.cells[n]=Array(r);for(var a=0;a<r;a++)this.cells[n][a]=new O(n,a,this)}}return Object(f.a)(e,[{key:"updateObservers",value:function(e){var r=!0,t=!1,s=void 0;try{for(var n,a=function(e){var r=[],t=[];return function e(s){if(t.includes(s))return;if(r.includes(s))throw new b.a("Cycle");r.push(s);var n=!0,a=!1,o=void 0;try{for(var i,l=s.observers[Symbol.iterator]();!(n=(i=l.next()).done);n=!0){var c=i.value;e(c)}}catch(u){a=!0,o=u}finally{try{n||null==l.return||l.return()}finally{if(a)throw o}}t.push(s)}(e),t.reverse().slice(1)}(e)[Symbol.iterator]();!(r=(n=a.next()).done);r=!0){var o=n.value;this.execFormula(o)}}catch(i){t=!0,s=i}finally{try{r||null==a.return||a.return()}finally{if(t)throw s}}}},{key:"execFormula",value:function(e){e.value=this.execExpr(e.ast)}},{key:"exec",value:function(e){if(Array.isArray(e)){var r=!0,t=!1,s=void 0;try{for(var n,a=e[Symbol.iterator]();!(r=(n=a.next()).done);r=!0){var o=n.value;this.exec(o)}}catch(c){t=!0,s=c}finally{try{r||null==a.return||a.return()}finally{if(t)throw s}}}else switch(e.type){case h.a.assigment:var i=this.execLeft(e.left),l=this.execExpr(e.right);return i.value=l,l;case h.a.expr:return this.execExpr(e.expr);case h.a.whileLoop:for(;this.execExpr(e.condition);)this.exec(e.block);break;case h.a.ifElse:this.execExpr(e.condition)?this.exec(e.block):null!==e.elseBlock&&this.exec(e.elseBlock);break;default:throw Error("Not handled node type ".concat(e.type))}}},{key:"execLeft",value:function(e){switch(e.type){case h.a.variable:return this.getOrCreateVar(e.identifier);default:throw new b.a("Assign to rvalue.")}}},{key:"execExpr",value:function(e){var r,t=this;switch(e.type){case h.a.primary:return e.value;case h.a.variable:return this.getVarByName(e.identifier).value;case h.a.multiplication:return this.execExpr(e.op1)*this.execExpr(e.op2);case h.a.division:return this.execExpr(e.op1)/this.execExpr(e.op2);case h.a.addition:return this.execExpr(e.op1)+this.execExpr(e.op2);case h.a.subtraction:return this.execExpr(e.op1)-this.execExpr(e.op2);case h.a.functionCall:if(!this.variables.hasOwnProperty(e.identifier))throw new b.a("No function: ".concat(e.identifier));var s=this.variables[e.identifier];if(!((r=s)&&r.constructor&&r.call&&r.apply))throw new b.a("".concat(e.identifier," is not a function."));var n=e.args.map((function(e){return t.execExpr(e)}));return s.apply(void 0,Object(u.a)(n));case h.a.comparision:var a=this.execExpr(e.op1),o=this.execExpr(e.op2);switch(e.operator){case"==":return a===o;case">=":return a>=o;case"<=":return a<=o;case"<":return a<o;case">":return a>o;case"!=":return a!==o;default:throw Error("Unknown comparison operator")}case h.a.range:return this.getCellsByRange(e.cell1.identifier,e.cell2.identifier).map((function(e){return e.value}));default:throw Error("Not handled node type ".concat(e.type))}}},{key:"setCell",value:function(e,r){e.unregisterFromAllSubjects();try{"="===r.charAt(0)?this.setFormula(e,r):this.setValue(e,r),this.updateObservers(e),e.error=null}catch(t){if("UserError"!==t.name)throw t;e.error=t.message}}},{key:"setValue",value:function(e,r){var t=parseFloat(r);isNaN(t)?e.value=r:e.value=t,e.formula=null,e.ast=null}},{key:"setFormula",value:function(e,r){e.formula=r;var t=new m.a;t.feed(e.formula.substring(1)),e.ast=t.results,this.execFormula(e);var s=!0,n=!1,a=void 0;try{for(var o,i=this.findVarsReferenced(e.ast)[Symbol.iterator]();!(s=(o=i.next()).done);s=!0){var l=o.value;e.observe(l)}}catch(c){n=!0,a=c}finally{try{s||null==i.return||i.return()}finally{if(n)throw a}}}},{key:"setVariable",value:function(e,r){var t=this.getOrCreateVar(e);this.setValue(t,r)}},{key:"getOrCreateVar",value:function(e){try{return this.getVarByName(e)}catch(r){return this.variables[e]=new k}}},{key:"getVarByName",value:function(e){var r=this.getCellByName(e);if(null==r){if(this.variables.hasOwnProperty(e))return this.variables[e];throw new b.a("No variable: ".concat(e))}return r}},{key:"getCellByName",value:function(e){var r,t;try{var s=w(e),n=Object(c.a)(s,2);r=n[0],t=n[1]}catch(a){return null}return this.x<=r||this.y<=t?null:this.cells[t][r]}},{key:"getCellsByRange",value:function(e,r){var t=w(e),s=Object(c.a)(t,2),n=s[0],a=s[1],o=w(r),i=Object(c.a)(o,2),l=i[0],u=i[1];if(this.x<=n||this.y<=a)throw new b.a("No cell: ".concat(e));if(this.x<=l||this.y<=u)throw new b.a("No cell: ".concat(r));for(var p=[],f=a;f<=u;f++)for(var m=n;m<=l;m++)p.push(this.cells[f][m]);return p}},{key:"findVarsReferenced",value:function(e){var r=this;var t=[],s=[];!function e(r){if(void 0!==r.type){if("variable"===r.type)return void s.push(r.identifier);if("range"===r.type)return void t.push([r.cell1.identifier,r.cell2.identifier]);for(var n in r)if(r.hasOwnProperty(n))if(Array.isArray(r[n])){var a=!0,o=!1,i=void 0;try{for(var l,c=r[n][Symbol.iterator]();!(a=(l=c.next()).done);a=!0){e(l.value)}}catch(u){o=!0,i=u}finally{try{a||null==c.return||c.return()}finally{if(o)throw i}}}else e(r[n])}}(e);var n=[];n.push.apply(n,Object(u.a)(s.map((function(e){return r.getVarByName(e)}))));for(var a=0,o=t;a<o.length;a++){var i=Object(c.a)(o[a],2),l=i[0],p=i[1];n.push.apply(n,Object(u.a)(this.getCellsByRange(l,p)))}return n}}]),e}()},4:function(e,r,t){"use strict";t.d(r,"a",(function(){return s}));var s={multiplication:"multiplication",division:"division",addition:"addition",subtraction:"subtraction",functionCall:"functionCall",variable:"variable",range:"range",list:"list",ifCondition:"ifCondition",comparision:"comparision",expr:"expr",assigment:"assigment",primary:"primary",whileLoop:"whileLoop",ifElse:"ifElse"}},42:function(e,r,t){e.exports=t(477)},47:function(e,r,t){},477:function(e,r,t){"use strict";t.r(r);var s=t(0),n=t.n(s),a=t(12),o=t.n(a),i=(t(47),t(32));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(n.a.createElement(i.a,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},5:function(e,r,t){"use strict";t.d(r,"a",(function(){return c}));var s=t(6),n=t(19),a=t(9),o=t(8),i=t(18),l=t(40),c=function(e){function r(){var e,t;Object(s.a)(this,r);for(var i=arguments.length,l=new Array(i),c=0;c<i;c++)l[c]=arguments[c];return(t=Object(n.a)(this,(e=Object(a.a)(r)).call.apply(e,[this].concat(l)))).name="UserError",Error.captureStackTrace&&Error.captureStackTrace(Object(o.a)(t),r),t}return Object(i.a)(r,e),r}(Object(l.a)(Error))}},[[42,1,2]]]);
//# sourceMappingURL=main.05521ce0.chunk.js.map