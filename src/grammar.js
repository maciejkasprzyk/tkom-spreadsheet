// Generated automatically by nearley, version 2.19.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

  const moo = require("moo");
  const tokens = require('./tokens.js')

  const lexer = moo.compile(tokens);

  const debug = false;
  function log() {
    if (debug) {
      console.log(...arguments);
    }
  }

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "expression", "symbols": ["multi_expr"], "postprocess": 
        ([a]) => {
          log("expression")
          log("a:", a);
          return a;
         }
          },
    {"name": "expression", "symbols": ["expression", (lexer.has("plus") ? {type: "plus"} : plus), "multi_expr"], "postprocess": 
        ([a,_,b]) => {
          log("expression")
          log("a:", a)
          log("b:", b)
          return a+b;
         }
            },
    {"name": "expression", "symbols": ["expression", (lexer.has("minus") ? {type: "minus"} : minus), "multi_expr"], "postprocess": 
        ([a,_,b]) => {
          log("expression")
          log("a:", a)
          log("b:", b)
          return a-b;
         }
            },
    {"name": "multi_expr", "symbols": ["primary"], "postprocess": 
        ([a]) => {
          log("multi_expr")
          log("a:", a);
          return a;
         }
            },
    {"name": "multi_expr", "symbols": ["multi_expr", (lexer.has("asterisk") ? {type: "asterisk"} : asterisk), "primary"], "postprocess": 
        ([a,_,b]) => {
          log("multi_expr")
          log("a:", a)
          log("b:", b)
          return a*b;
         }
            },
    {"name": "multi_expr", "symbols": ["multi_expr", (lexer.has("slash") ? {type: "slash"} : slash), "primary"], "postprocess": 
        ([a,_,b]) => {
          log("multi_expr")
          log("a:", a)
          log("b:", b)
          return a/b;
         }
            },
    {"name": "primary", "symbols": [(lexer.has("lparen") ? {type: "lparen"} : lparen), "expression", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": 
        (data) => { return data[1]; }
            },
    {"name": "primary", "symbols": ["number"], "postprocess": 
        (data) => {
          log("number:", data[0]);
          return data[0];
        }
          },
    {"name": "primary", "symbols": ["cell_ref"], "postprocess": id},
    {"name": "cell_ref", "symbols": [(lexer.has("label") ? {type: "label"} : label)], "postprocess":  (data) => {
          return 0;
        } },
    {"name": "number", "symbols": [(lexer.has("float") ? {type: "float"} : float)], "postprocess": id},
    {"name": "number", "symbols": [(lexer.has("int") ? {type: "int"} : int)], "postprocess": (data) => {log("int:",data[0].value); return data[0].value; }}
]
  , ParserStart: "expression"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
