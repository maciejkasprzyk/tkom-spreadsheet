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
    {
        "name": "comparison",
        "symbols": ["sum", (lexer.has("compOperator") ? {type: "compOperator"} : compOperator), "sum"],
        "postprocess": p.comparison
    },
    {"name": "sum", "symbols": ["product"], "postprocess": id},
    {
        "name": "sum",
        "symbols": ["sum", (lexer.has("plus") ? {type: "plus"} : plus), "product"],
        "postprocess": p.addition
    },
    {
        "name": "sum",
        "symbols": ["sum", (lexer.has("minus") ? {type: "minus"} : minus), "product"],
        "postprocess": p.subtraction
    },
    {"name": "product", "symbols": ["primary"], "postprocess": id},
    {
        "name": "product",
        "symbols": ["product", (lexer.has("asterisk") ? {type: "asterisk"} : asterisk), "primary"],
        "postprocess": p.multiplication
    },
    {
        "name": "product",
        "symbols": ["product", (lexer.has("slash") ? {type: "slash"} : slash), "primary"],
        "postprocess": p.division
    },
    {
        "name": "primary",
        "symbols": [(lexer.has("lparen") ? {type: "lparen"} : lparen), "expr", (lexer.has("rparen") ? {type: "rparen"} : rparen)],
        "postprocess": p.return1
    },
    {"name": "primary", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": p.token},
    {
        "name": "primary",
        "symbols": [(lexer.has("minus") ? {type: "minus"} : minus), (lexer.has("number") ? {type: "number"} : number)],
        "postprocess": p.negative
    },
    {"name": "primary", "symbols": ["variable"], "postprocess": id},
    {"name": "primary", "symbols": ["function_call"], "postprocess": id},
    {"name": "primary", "symbols": ["range"], "postprocess": id},
    {
        "name": "variable",
        "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)],
        "postprocess": p.variable
    },
    {
        "name": "function_call",
        "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), (lexer.has("lparen") ? {type: "lparen"} : lparen), "args", (lexer.has("rparen") ? {type: "rparen"} : rparen)],
        "postprocess": p.functionCall
    },
    {
        "name": "function_call",
        "symbols": [(lexer.has("kwIf") ? {type: "kwIf"} : kwIf), (lexer.has("lparen") ? {type: "lparen"} : lparen), "args", (lexer.has("rparen") ? {type: "rparen"} : rparen)],
        "postprocess": p.functionCall
    },
    {"name": "args$ebnf$1", "symbols": []},
    {
        "name": "args$ebnf$1$subexpression$1",
        "symbols": [(lexer.has("semicolon") ? {type: "semicolon"} : semicolon), "expr"]
    },
    {
        "name": "args$ebnf$1",
        "symbols": ["args$ebnf$1", "args$ebnf$1$subexpression$1"],
        "postprocess": function arrpush(d) {
            return d[0].concat([d[1]]);
        }
    },
    {"name": "args", "symbols": ["expr", "args$ebnf$1"], "postprocess": p.argsAdd},
    {
        "name": "range",
        "symbols": ["variable", (lexer.has("colon") ? {type: "colon"} : colon), "variable"],
        "postprocess": p.range
    }
];
let ParserStart = "formulaEntry";
export default { Lexer, ParserRules, ParserStart };
