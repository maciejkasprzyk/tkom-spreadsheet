// Generated automatically by nearley, version 2.19.1
// http://github.com/Hardmath123/nearley
function id(x) { return x[0]; }

  /* eslint-disable */
  import * as p from './parserPostProcessors.js'
  import {lexer} from './lexer.js'
let Lexer = lexer;
let ParserRules = [
    {"name": "formulaEntry", "symbols": ["expr"]},
    {"name": "expr", "symbols": ["comparison"], "postprocess": id},
    {"name": "comparison", "symbols": ["sum"], "postprocess": id},
    {"name": "comparison", "symbols": ["sum", (lexer.has("compOperator") ? {type: "compOperator"} : compOperator), "sum"], "postprocess": p.comparison},
    {"name": "sum", "symbols": ["product"], "postprocess": id},
    {"name": "sum", "symbols": ["sum", (lexer.has("plus") ? {type: "plus"} : plus), "product"], "postprocess": p.addition},
    {"name": "sum", "symbols": ["sum", (lexer.has("minus") ? {type: "minus"} : minus), "product"], "postprocess": p.subtraction},
    {"name": "product", "symbols": ["primary"], "postprocess": id},
    {"name": "product", "symbols": ["product", (lexer.has("asterisk") ? {type: "asterisk"} : asterisk), "primary"], "postprocess": p.multiplication},
    {"name": "product", "symbols": ["product", (lexer.has("slash") ? {type: "slash"} : slash), "primary"], "postprocess": p.division},
    {"name": "primary", "symbols": [(lexer.has("lparen") ? {type: "lparen"} : lparen), "expr", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": p.return1},
    {"name": "primary", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": p.number},
    {"name": "primary", "symbols": [(lexer.has("minus") ? {type: "minus"} : minus), (lexer.has("number") ? {type: "number"} : number)], "postprocess": p.negative},
    {"name": "primary", "symbols": [(lexer.has("variable") ? {type: "variable"} : variable)], "postprocess": p.variable},
    {"name": "primary", "symbols": ["function_call"], "postprocess": id},
    {"name": "primary", "symbols": ["range"], "postprocess": id},
    {"name": "primary", "symbols": ["cell"], "postprocess": id},
    {"name": "cell", "symbols": [(lexer.has("cell") ? {type: "cell"} : cell)], "postprocess": p.cell},
    {"name": "function_call", "symbols": [(lexer.has("variable") ? {type: "variable"} : variable), (lexer.has("lparen") ? {type: "lparen"} : lparen), "args", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": p.functionCall},
    {"name": "function_call", "symbols": [(lexer.has("kwIf") ? {type: "kwIf"} : kwIf), (lexer.has("lparen") ? {type: "lparen"} : lparen), "args", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": p.functionCall},
    {"name": "args$ebnf$1", "symbols": []},
    {"name": "args$ebnf$1$subexpression$1", "symbols": [(lexer.has("semicolon") ? {type: "semicolon"} : semicolon), "expr"]},
    {"name": "args$ebnf$1", "symbols": ["args$ebnf$1", "args$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "args", "symbols": ["expr", "args$ebnf$1"], "postprocess": p.list},
    {"name": "args", "symbols": [], "postprocess": p.emptyList},
    {"name": "range", "symbols": ["cell", (lexer.has("colon") ? {type: "colon"} : colon), "cell"], "postprocess": p.range},
    {"name": "entry", "symbols": ["code"]},
    {"name": "code$ebnf$1", "symbols": []},
    {"name": "code$ebnf$1$subexpression$1", "symbols": [(lexer.has("end") ? {type: "end"} : end), "statement"]},
    {"name": "code$ebnf$1", "symbols": ["code$ebnf$1", "code$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "code", "symbols": ["statement", "code$ebnf$1"], "postprocess": p.list},
    {"name": "statement", "symbols": ["expr"], "postprocess": p.expr},
    {"name": "statement", "symbols": ["assigment"], "postprocess": id},
    {"name": "statement", "symbols": ["blockStart"], "postprocess": id},
    {"name": "statement", "symbols": [], "postprocess": null},
    {"name": "blockStart", "symbols": [(lexer.has("kwWhile") ? {type: "kwWhile"} : kwWhile), "expr", (lexer.has("end") ? {type: "end"} : end), "block"], "postprocess": p.whileLoop},
    {"name": "blockStart$ebnf$1$subexpression$1", "symbols": ["else"]},
    {"name": "blockStart$ebnf$1", "symbols": ["blockStart$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "blockStart$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "blockStart", "symbols": [(lexer.has("kwIf") ? {type: "kwIf"} : kwIf), "expr", (lexer.has("end") ? {type: "end"} : end), "block", "blockStart$ebnf$1"], "postprocess": p.ifElse},
    {"name": "else", "symbols": [(lexer.has("kwElse") ? {type: "kwElse"} : kwElse), (lexer.has("end") ? {type: "end"} : end), "block"], "postprocess": p.elseBlock},
    {"name": "assigment", "symbols": ["expr", (lexer.has("assign") ? {type: "assign"} : assign), "expr"], "postprocess": p.assigment},
    {"name": "block$ebnf$1$subexpression$1", "symbols": [(lexer.has("end") ? {type: "end"} : end)]},
    {"name": "block$ebnf$1", "symbols": ["block$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "block$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "block", "symbols": [(lexer.has("indent") ? {type: "indent"} : indent), "code", (lexer.has("dedent") ? {type: "dedent"} : dedent), "block$ebnf$1"], "postprocess": p.block}
];
let ParserStart = "entry";
export default { Lexer, ParserRules, ParserStart };
