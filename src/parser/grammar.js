// Generated automatically by nearley, version 2.19.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

  const moo = require("moo");
  const tokens = require('./tokens.js')

  const lexer = moo.states(tokens);

  // ignore whitespaces tokens
  lexer.next = (next => () => {
      let tok;
      while ((tok = next.call(lexer)) && tok.type === "whitespace") {}
      return tok;
  })(lexer.next);


  const debug = true;
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
    {"name": "primary", "symbols": ["func"], "postprocess": 
        ([func]) => {
          log("func:", func)
          return func;
        }
            },
    {"name": "cell_ref", "symbols": [(lexer.has("label") ? {type: "label"} : label)], "postprocess": 
        ([label]) => {
          // todo get value for label
          log("label:", label.value)
          return 1;
        }
          },
    {"name": "number", "symbols": [(lexer.has("float") ? {type: "float"} : float)], "postprocess": id},
    {"name": "number", "symbols": [(lexer.has("int") ? {type: "int"} : int)], "postprocess": 
        (data) => {
          log("int:",data[0].value);
          return data[0].value;
        }
            },
    {"name": "func", "symbols": [(lexer.has("func_call") ? {type: "func_call"} : func_call), "args", (lexer.has("func_call_end") ? {type: "func_call_end"} : func_call_end)], "postprocess": 
        ([func_name, args]) => {
          // todo call function smth like: global[func_name.value](...args)
          log("func_name:", func_name.value)
          log("args:", args)
          let sum = 0;
          for (const x of args){
            sum += x;
          }
          return sum;
        }
            },
    {"name": "args", "symbols": ["range"], "postprocess": 
        ([range]) => {
          log("range:", range)
          return range;
        }
            },
    {"name": "args", "symbols": ["list"], "postprocess": 
        ([list]) => {
          log("list(args):", list)
          return list;
        }
            },
    {"name": "range", "symbols": [(lexer.has("label") ? {type: "label"} : label), (lexer.has("colon") ? {type: "colon"} : colon), (lexer.has("label") ? {type: "label"} : label)], "postprocess": 
        ([label1, _, label2]) => {
          // todo get values for range label1:label2
          log("label1:", label1.value)
          log("label2:", label2.value)
          return [label1.value,":",label2.value];
        }
            },
    {"name": "list", "symbols": [(lexer.has("label") ? {type: "label"} : label)], "postprocess": 
        ([label]) => {
          // todo get value for label
          log("label(list):", label.value)
          return [label.value];
        }
            },
    {"name": "list", "symbols": [(lexer.has("label") ? {type: "label"} : label), (lexer.has("semicolon") ? {type: "semicolon"} : semicolon), "list"], "postprocess": 
        ([label, _, list]) => {
          // todo get values for label
          log("label(label ; list):", label.value)
          log("list(label ; list):", list)
          list.push(label.value);
          return list;
        }
            }
]
  , ParserStart: "expression"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
