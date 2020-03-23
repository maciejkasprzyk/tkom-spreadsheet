// Generated automatically by nearley, version 2.19.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

  const moo = require("moo");
  const tokens = require('./tokens.js')

  const lexer = moo.compile(tokens);
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "expression", "symbols": ["multi_expr"], "postprocess": 
        ([a]) => {
          console.log("expression")
          console.log("a:", a);
          return a;
         }
          },
    {"name": "expression$ebnf$1$subexpression$1", "symbols": [(lexer.has("plus") ? {type: "plus"} : plus), "multi_expr"], "postprocess": (data)=>{console.log("data:",data[1]) ;return data[1];}},
    {"name": "expression$ebnf$1", "symbols": ["expression$ebnf$1$subexpression$1"]},
    {"name": "expression$ebnf$1$subexpression$2", "symbols": [(lexer.has("plus") ? {type: "plus"} : plus), "multi_expr"], "postprocess": (data)=>{console.log("data:",data[1]) ;return data[1];}},
    {"name": "expression$ebnf$1", "symbols": ["expression$ebnf$1", "expression$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "expression", "symbols": ["multi_expr", "expression$ebnf$1"], "postprocess": 
        ([a,rest]) => {
          console.log("expression")
          console.log("a:", a)
          console.log("rest:", rest)
          for(const x of rest){
            a+=x;
          }
          return a;
         }
            },
    {"name": "expression$ebnf$2$subexpression$1", "symbols": [(lexer.has("minus") ? {type: "minus"} : minus), "multi_expr"], "postprocess": (data)=>{console.log("data:",data[1]) ;return data[1];}},
    {"name": "expression$ebnf$2", "symbols": ["expression$ebnf$2$subexpression$1"]},
    {"name": "expression$ebnf$2$subexpression$2", "symbols": [(lexer.has("minus") ? {type: "minus"} : minus), "multi_expr"], "postprocess": (data)=>{console.log("data:",data[1]) ;return data[1];}},
    {"name": "expression$ebnf$2", "symbols": ["expression$ebnf$2", "expression$ebnf$2$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "expression", "symbols": ["multi_expr", "expression$ebnf$2"], "postprocess": 
        ([a,rest]) => {
          console.log("expression")
          console.log("a:", a)
          console.log("rest:", rest)
          for(const x of rest){
            a-=x;
          }
          return a;
         }
            },
    {"name": "multi_expr", "symbols": ["primary"], "postprocess": 
        ([a]) => {
          console.log("multi_expr")
          console.log("a:", a);
          return a;
         }
            },
    {"name": "multi_expr$ebnf$1$subexpression$1", "symbols": [(lexer.has("asterisk") ? {type: "asterisk"} : asterisk), "primary"], "postprocess": (data)=>{console.log("data:",data[1]) ;return data[1];}},
    {"name": "multi_expr$ebnf$1", "symbols": ["multi_expr$ebnf$1$subexpression$1"]},
    {"name": "multi_expr$ebnf$1$subexpression$2", "symbols": [(lexer.has("asterisk") ? {type: "asterisk"} : asterisk), "primary"], "postprocess": (data)=>{console.log("data:",data[1]) ;return data[1];}},
    {"name": "multi_expr$ebnf$1", "symbols": ["multi_expr$ebnf$1", "multi_expr$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "multi_expr", "symbols": ["primary", "multi_expr$ebnf$1"], "postprocess": 
        ([a,rest]) => {
          console.log("multi_expr")
          console.log("a:", a)
          console.log("rest:", rest)
          for(const x of rest){
            a*=x;
          }
          return a;
         }
            },
    {"name": "multi_expr$ebnf$2$subexpression$1", "symbols": [(lexer.has("slash") ? {type: "slash"} : slash), "primary"], "postprocess": (data)=>{console.log("data:",data[1]) ;return data[1];}},
    {"name": "multi_expr$ebnf$2", "symbols": ["multi_expr$ebnf$2$subexpression$1"]},
    {"name": "multi_expr$ebnf$2$subexpression$2", "symbols": [(lexer.has("slash") ? {type: "slash"} : slash), "primary"], "postprocess": (data)=>{console.log("data:",data[1]) ;return data[1];}},
    {"name": "multi_expr$ebnf$2", "symbols": ["multi_expr$ebnf$2", "multi_expr$ebnf$2$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "multi_expr", "symbols": ["primary", "multi_expr$ebnf$2"], "postprocess": 
        ([a,rest]) => {
          console.log("multi_expr")
          console.log("a:", a)
          console.log("rest:", rest)
          for(const x of rest){
            a/=x;
          }
          return a;
         }
            },
    {"name": "primary", "symbols": [(lexer.has("lparen") ? {type: "lparen"} : lparen), "expression", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": 
        (data) => { return data[1]; }
            },
    {"name": "primary", "symbols": ["number"], "postprocess": 
        (data) => {
          console.log("number:", data[0]);
          return data[0];
        }
          },
    {"name": "primary", "symbols": ["cell_ref"], "postprocess": id},
    {"name": "cell_ref", "symbols": [(lexer.has("label") ? {type: "label"} : label)], "postprocess":  (data) => {
          return 0;
        } },
    {"name": "number", "symbols": [(lexer.has("float") ? {type: "float"} : float)], "postprocess": id},
    {"name": "number", "symbols": [(lexer.has("int") ? {type: "int"} : int)], "postprocess": (data) => {console.log("int:",data[0].value); return data[0].value; }}
]
  , ParserStart: "expression"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
