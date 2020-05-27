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
    {"name": "range", "symbols": ["cell", (lexer.has("colon") ? {type: "colon"} : colon), "cell"], "postprocess": p.range},
    {"name": "entry$ebnf$1", "symbols": []},
    {"name": "entry$ebnf$1$subexpression$1", "symbols": [(lexer.has("end") ? {type: "end"} : end)]},
    {"name": "entry$ebnf$1", "symbols": ["entry$ebnf$1", "entry$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "entry$ebnf$2", "symbols": []},
    {"name": "entry$ebnf$2$subexpression$1", "symbols": [(lexer.has("end") ? {type: "end"} : end)]},
    {"name": "entry$ebnf$2", "symbols": ["entry$ebnf$2", "entry$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "entry", "symbols": ["entry$ebnf$1", "code", "entry$ebnf$2"], "postprocess": (data) => [data[1]]},
    {"name": "code$ebnf$1", "symbols": []},
    {"name": "code$ebnf$1$subexpression$1", "symbols": ["statement"]},
    {"name": "code$ebnf$1", "symbols": ["code$ebnf$1", "code$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "code", "symbols": ["statement", "code$ebnf$1"], "postprocess": p.list},
    {"name": "statement", "symbols": ["expr", "ends"], "postprocess": id},
    {"name": "statement", "symbols": ["reference", "ends"], "postprocess": id},
    {"name": "statement", "symbols": ["return", "ends"], "postprocess": id},
    {"name": "statement", "symbols": ["assigment", "ends"], "postprocess": id},
    {"name": "statement$ebnf$1", "symbols": []},
    {"name": "statement$ebnf$1$subexpression$1", "symbols": [(lexer.has("end") ? {type: "end"} : end)]},
    {"name": "statement$ebnf$1", "symbols": ["statement$ebnf$1", "statement$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statement", "symbols": ["blockStatement", "statement$ebnf$1"], "postprocess": id},
    {"name": "blockStatement", "symbols": [(lexer.has("kwWhile") ? {type: "kwWhile"} : kwWhile), "expr", "ends", "block"], "postprocess": p.whileLoop},
    {"name": "blockStatement$ebnf$1$subexpression$1", "symbols": ["else"]},
    {"name": "blockStatement$ebnf$1", "symbols": ["blockStatement$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "blockStatement$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "blockStatement", "symbols": [(lexer.has("kwIf") ? {type: "kwIf"} : kwIf), "expr", "ends", "block", "blockStatement$ebnf$1"], "postprocess": p.ifElse},
    {"name": "blockStatement", "symbols": [(lexer.has("kwDef") ? {type: "kwDef"} : kwDef), (lexer.has("identifier") ? {type: "identifier"} : identifier), (lexer.has("lparen") ? {type: "lparen"} : lparen), "params", (lexer.has("rparen") ? {type: "rparen"} : rparen), "ends", "block"], "postprocess": p.functionDef},
    {"name": "else", "symbols": [(lexer.has("kwElse") ? {type: "kwElse"} : kwElse), "ends", "block"], "postprocess": p.elseBlock},
    {"name": "assigment", "symbols": ["variable", (lexer.has("assign") ? {type: "assign"} : assign), "expr"], "postprocess": p.assigment},
    {"name": "assigment", "symbols": ["cell", (lexer.has("assign") ? {type: "assign"} : assign), "expr"], "postprocess": p.assigment},
    {"name": "assigment", "symbols": ["dynamicCell", (lexer.has("assign") ? {type: "assign"} : assign), "expr"], "postprocess": p.assigment},
    {"name": "block", "symbols": [(lexer.has("indent") ? {type: "indent"} : indent), "code", (lexer.has("dedent") ? {type: "dedent"} : dedent)], "postprocess": p.block},
    {"name": "ends$ebnf$1$subexpression$1", "symbols": [(lexer.has("end") ? {type: "end"} : end)]},
    {"name": "ends$ebnf$1", "symbols": ["ends$ebnf$1$subexpression$1"]},
    {"name": "ends$ebnf$1$subexpression$2", "symbols": [(lexer.has("end") ? {type: "end"} : end)]},
    {"name": "ends$ebnf$1", "symbols": ["ends$ebnf$1", "ends$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ends", "symbols": ["ends$ebnf$1"], "postprocess": null},
    {"name": "reference", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), (lexer.has("assign") ? {type: "assign"} : assign), (lexer.has("ampersand") ? {type: "ampersand"} : ampersand), "range"], "postprocess": p.reference},
    {"name": "reference", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), (lexer.has("assign") ? {type: "assign"} : assign), (lexer.has("ampersand") ? {type: "ampersand"} : ampersand), "cell"], "postprocess": p.reference},
    {"name": "reference", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), (lexer.has("assign") ? {type: "assign"} : assign), (lexer.has("ampersand") ? {type: "ampersand"} : ampersand), "variable"], "postprocess": p.reference},
    {"name": "return", "symbols": [(lexer.has("kwReturn") ? {type: "kwReturn"} : kwReturn), "expr"], "postprocess": p.returnNode},
    {"name": "params$ebnf$1", "symbols": []},
    {"name": "params$ebnf$1$subexpression$1", "symbols": [(lexer.has("comma") ? {type: "comma"} : comma), "variable"]},
    {"name": "params$ebnf$1", "symbols": ["params$ebnf$1", "params$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "params", "symbols": ["variable", "params$ebnf$1"], "postprocess": p.argsList},
    {"name": "params", "symbols": [], "postprocess": p.emptyList}
];
let ParserStart = "entry";
export default { Lexer, ParserRules, ParserStart };
