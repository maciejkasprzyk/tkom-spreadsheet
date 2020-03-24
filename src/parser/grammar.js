// Generated automatically by nearley, version 2.19.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

  /* eslint-disable */

  const moo = require("moo");
  const tokens = require('./tokens.js')

  const post = require("./parserPostProcessors.js")

  const lexer = moo.states(tokens);
  // ignore whitespaces tokens
  lexer.next = (next => () => {
      let tok;
      while ((tok = next.call(lexer)) && tok.type === "whitespace") {}
      return tok;
  })(lexer.next);

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "expression", "symbols": ["multi_expr"], "postprocess": 
        ([a]) => {
          post.log("expression")
          post.log("a:", a);
          return a;
         }
          },
    {"name": "expression", "symbols": ["multi_expr", (lexer.has("plus") ? {type: "plus"} : plus), "expression"], "postprocess": 
        ([a,_,b]) => {
          post.log("expression")
          post.log("a:", a)
          post.log("b:", b)
          return a+b;
         }
            },
    {"name": "expression", "symbols": ["multi_expr", (lexer.has("minus") ? {type: "minus"} : minus), "expression"], "postprocess": 
        ([a,_,b]) => {
          post.log("expression")
          post.log("a:", a)
          post.log("b:", b)
          return a-b;
         }
            },
    {"name": "multi_expr", "symbols": ["primary"], "postprocess": 
        ([a]) => {
          post.log("multi_expr")
          post.log("a:", a);
          return a;
         }
            },
    {"name": "multi_expr", "symbols": ["primary", (lexer.has("asterisk") ? {type: "asterisk"} : asterisk), "multi_expr"], "postprocess": 
        ([a,_,b]) => {
          post.log("multi_expr")
          post.log("a:", a)
          post.log("b:", b)
          return a*b;
         }
            },
    {"name": "multi_expr", "symbols": ["primary", (lexer.has("slash") ? {type: "slash"} : slash), "multi_expr"], "postprocess": 
        ([a,_,b]) => {
          post.log("multi_expr")
          post.log("a:", a)
          post.log("b:", b)
          return a/b;
         }
            },
    {"name": "primary", "symbols": [(lexer.has("lparen") ? {type: "lparen"} : lparen), "expression", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": 
        (data) => { return data[1]; }
            },
    {"name": "primary", "symbols": ["number"], "postprocess": 
        (data) => {
          post.log("number:", data[0]);
          return data[0];
        }
          },
    {"name": "primary", "symbols": ["cell_ref"], "postprocess": id},
    {"name": "primary", "symbols": ["func"], "postprocess": 
        ([func]) => {
          post.log("func:", func)
          return func;
        }
            },
    {"name": "cell_ref", "symbols": [(lexer.has("label") ? {type: "label"} : label)], "postprocess": 
        ([label]) => {
          post.log("label:", label.value)
          return  post.getByLabel(label.value);
        }
          },
    {"name": "number", "symbols": [(lexer.has("float") ? {type: "float"} : float)], "postprocess": id},
    {"name": "number", "symbols": [(lexer.has("int") ? {type: "int"} : int)], "postprocess": 
        (data) => {
          post.log("int:",data[0].value);
          return data[0].value;
        }
            },
    {"name": "func", "symbols": [(lexer.has("func_call") ? {type: "func_call"} : func_call), "args", (lexer.has("func_call_end") ? {type: "func_call_end"} : func_call_end)], "postprocess": 
        ([func_name, args]) => {
          // todo call function smth like: global[func_name.value](...args)
          post.log("func_name:", func_name.value)
          post.log("args:", args)
          let sum = 0;
          for (const x of args){
            sum += x;
          }
          return sum;
        }
            },
    {"name": "args", "symbols": ["range"], "postprocess": 
        ([range]) => {
          post.log("range:", range)
          return range;
        }
            },
    {"name": "args", "symbols": ["list"], "postprocess": 
        ([list]) => {
          post.log("list(args):", list)
          return list;
        }
            },
    {"name": "range", "symbols": [(lexer.has("label") ? {type: "label"} : label), (lexer.has("colon") ? {type: "colon"} : colon), (lexer.has("label") ? {type: "label"} : label)], "postprocess": 
        ([label1, _, label2]) => {
          // todo get values for range label1:label2
          post.log("label1:", label1.value)
          post.log("label2:", label2.value)
          return [label1.value,":",label2.value];
        }
            },
    {"name": "list", "symbols": [(lexer.has("label") ? {type: "label"} : label)], "postprocess": 
        ([label]) => {
          post.getByLabel(label.value)
          post.log("label(list):", label.value)
          return  [post.getByLabel(label.value)];
        }
            },
    {"name": "list", "symbols": [(lexer.has("label") ? {type: "label"} : label), (lexer.has("semicolon") ? {type: "semicolon"} : semicolon), "list"], "postprocess": 
        ([label, _, list]) => {
          post.getByLabel(label.value)
          post.log("label(label ; list):", label.value)
          post.log("list(label ; list):", list)
          list.push(post.getByLabel(label.value));
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