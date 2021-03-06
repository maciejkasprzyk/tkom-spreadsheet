// Generated automatically by nearley, version 2.19.1
// http://github.com/Hardmath123/nearley
function id(x) { return x[0]; }

  /* eslint-disable */
  import * as p from './parserPostProcessors.js'
  import {lexer} from './lexer.js'
let Lexer = lexer;
let ParserRules = [
    {"name": "formulaEntry", "symbols": ["sum"]},
    {"name": "expr", "symbols": ["comparison"], "postprocess": id},
    {"name": "comparison", "symbols": ["sum"], "postprocess": id},
    {"name": "comparison", "symbols": ["sum", (lexer.has("equal") ? {type: "equal"} : equal), "sum"], "postprocess": p.equal},
    {"name": "comparison", "symbols": ["sum", (lexer.has("greaterEqual") ? {type: "greaterEqual"} : greaterEqual), "sum"], "postprocess": p.greaterEqual},
    {"name": "comparison", "symbols": ["sum", (lexer.has("lessEqual") ? {type: "lessEqual"} : lessEqual), "sum"], "postprocess": p.lessEqual},
    {"name": "comparison", "symbols": ["sum", (lexer.has("less") ? {type: "less"} : less), "sum"], "postprocess": p.less},
    {"name": "comparison", "symbols": ["sum", (lexer.has("greater") ? {type: "greater"} : greater), "sum"], "postprocess": p.greater},
    {"name": "comparison", "symbols": ["sum", (lexer.has("notEqual") ? {type: "notEqual"} : notEqual), "sum"], "postprocess": p.notEqual},
    {"name": "sum", "symbols": ["product"], "postprocess": id},
    {"name": "sum", "symbols": ["sum", (lexer.has("plus") ? {type: "plus"} : plus), "product"], "postprocess": p.addition},
    {"name": "sum", "symbols": ["sum", (lexer.has("minus") ? {type: "minus"} : minus), "product"], "postprocess": p.subtraction},
    {"name": "product", "symbols": ["primary"], "postprocess": id},
    {"name": "product", "symbols": ["product", (lexer.has("asterisk") ? {type: "asterisk"} : asterisk), "primary"], "postprocess": p.multiplication},
    {"name": "product", "symbols": ["product", (lexer.has("slash") ? {type: "slash"} : slash), "primary"], "postprocess": p.division},
    {"name": "primary", "symbols": [(lexer.has("lparen") ? {type: "lparen"} : lparen), "expr", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": (data) => data[1]},
    {"name": "primary", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": p.number},
    {"name": "primary", "symbols": ["variable"], "postprocess": id},
    {"name": "primary", "symbols": ["function_call"], "postprocess": id},
    {"name": "primary", "symbols": ["range"], "postprocess": id},
    {"name": "primary", "symbols": ["cell"], "postprocess": id},
    {"name": "primary", "symbols": [(lexer.has("minus") ? {type: "minus"} : minus), "primary"], "postprocess": p.negative},
    {"name": "primary", "symbols": ["dynamicCell"], "postprocess": id},
    {"name": "dynamicCell", "symbols": [(lexer.has("lsquare") ? {type: "lsquare"} : lsquare), "sum", (lexer.has("semicolon") ? {type: "semicolon"} : semicolon), "sum", (lexer.has("rsquare") ? {type: "rsquare"} : rsquare)], "postprocess": p.dynamicCell},
    {"name": "cell", "symbols": [(lexer.has("cell") ? {type: "cell"} : cell)], "postprocess": p.cell},
    {"name": "variable", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": p.variable},
    {"name": "function_call", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), (lexer.has("lparen") ? {type: "lparen"} : lparen), "args", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": p.functionCall},
    {"name": "function_call", "symbols": [(lexer.has("kwIf") ? {type: "kwIf"} : kwIf), (lexer.has("lparen") ? {type: "lparen"} : lparen), "args", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": p.functionCall},
    {"name": "args$ebnf$1", "symbols": []},
    {"name": "args$ebnf$1$subexpression$1", "symbols": [(lexer.has("comma") ? {type: "comma"} : comma), "expr"]},
    {"name": "args$ebnf$1", "symbols": ["args$ebnf$1", "args$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "args", "symbols": ["expr", "args$ebnf$1"], "postprocess": p.argsList},
    {"name": "args", "symbols": [], "postprocess": p.emptyList},
    {"name": "range", "symbols": ["cell", (lexer.has("colon") ? {type: "colon"} : colon), "cell"], "postprocess": p.range}
];
let ParserStart = "formulaEntry";
export default { Lexer, ParserRules, ParserStart };
