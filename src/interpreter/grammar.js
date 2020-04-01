// Generated automatically by nearley, version 2.19.1
// http://github.com/Hardmath123/nearley
function id(x) { return x[0]; }

  /* eslint-disable */
  import * as p from './parserPostProcessors.js'
  import {lexer} from './lexer.js'
let Lexer = lexer;
let ParserRules = [
    {"name": "input", "symbols": ["sum"]},
    {"name": "sum", "symbols": ["product"], "postprocess": id},
    {"name": "sum", "symbols": ["sum", (lexer.has("plus") ? {type: "plus"} : plus), "product"], "postprocess": p.addition},
    {"name": "sum", "symbols": ["sum", (lexer.has("minus") ? {type: "minus"} : minus), "product"], "postprocess": p.subtraction},
    {"name": "product", "symbols": ["primary"], "postprocess": id},
    {"name": "product", "symbols": ["product", (lexer.has("asterisk") ? {type: "asterisk"} : asterisk), "primary"], "postprocess": p.multiplication},
    {"name": "product", "symbols": ["product", (lexer.has("slash") ? {type: "slash"} : slash), "primary"], "postprocess": p.division},
    {"name": "primary", "symbols": [(lexer.has("lparen") ? {type: "lparen"} : lparen), "sum", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": p.return1},
    {"name": "primary", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": p.token},
    {"name": "primary", "symbols": [(lexer.has("minus") ? {type: "minus"} : minus), (lexer.has("number") ? {type: "number"} : number)], "postprocess": p.negative},
    {"name": "primary", "symbols": ["cell_ref"], "postprocess": id},
    {"name": "primary", "symbols": ["function_call"], "postprocess": id},
    {"name": "cell_ref", "symbols": [(lexer.has("variable") ? {type: "variable"} : variable)], "postprocess": p.variable},
    {"name": "function_call", "symbols": [(lexer.has("function_identifier") ? {type: "function_identifier"} : function_identifier), "args", (lexer.has("func_call_end") ? {type: "func_call_end"} : func_call_end)], "postprocess": p.functionCall},
    {"name": "args", "symbols": ["range"], "postprocess": id},
    {"name": "args", "symbols": ["list"], "postprocess": p.list},
    {"name": "range", "symbols": [(lexer.has("variable") ? {type: "variable"} : variable), (lexer.has("colon") ? {type: "colon"} : colon), (lexer.has("variable") ? {type: "variable"} : variable)], "postprocess": p.range},
    {"name": "list", "symbols": [(lexer.has("variable") ? {type: "variable"} : variable)], "postprocess": id},
    {"name": "list", "symbols": [(lexer.has("list") ? {type: "list"} : list), (lexer.has("semicolon") ? {type: "semicolon"} : semicolon), "variable"], "postprocess": p.listAdd}
];
let ParserStart = "input";
export default { Lexer, ParserRules, ParserStart };
