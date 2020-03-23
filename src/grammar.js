// Generated automatically by nearley, version 2.19.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

  const nm = require('nearley-moo')
  const tokens = require('./tokens.js')

  nm(tokens)
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "expression$ebnf$1", "symbols": []},
    {"name": "expression$ebnf$1$subexpression$1", "symbols": [minus, "multi_expr"], "postprocess": data=>data[1]},
    {"name": "expression$ebnf$1", "symbols": ["expression$ebnf$1", "expression$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "expression", "symbols": ["multi_expr", "expression$ebnf$1"], "postprocess": 
        ([a,b]) => {
          if (b.length === 0) { return a; }
          return a-b;
         }
            },
    {"name": "multi_expr$ebnf$1", "symbols": []},
    {"name": "multi_expr$ebnf$1$subexpression$1", "symbols": [asterisk, "primary"], "postprocess": data=>data[1]},
    {"name": "multi_expr$ebnf$1", "symbols": ["multi_expr$ebnf$1", "multi_expr$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "multi_expr", "symbols": ["primary", "multi_expr$ebnf$1"], "postprocess": 
        ([a,b]) => {
          if (b.length === 0) { return a; }
          return a*b;
         }
            },
    {"name": "multi_expr$ebnf$2", "symbols": []},
    {"name": "multi_expr$ebnf$2$subexpression$1", "symbols": [slash, "primary"], "postprocess": data=>data[1]},
    {"name": "multi_expr$ebnf$2", "symbols": ["multi_expr$ebnf$2", "multi_expr$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "multi_expr", "symbols": ["primary", "multi_expr$ebnf$2"], "postprocess": 
        ([a,b]) => {
          if (b.length === 0) { return a; }
          return a/b;
         }
            },
    {"name": "primary", "symbols": [lparen, "expression", rparen], "postprocess": 
        (data) => { return data[1]; }
            },
    {"name": "primary", "symbols": ["number"], "postprocess": id},
    {"name": "primary", "symbols": ["cell_ref"], "postprocess": id},
    {"name": "cell_ref", "symbols": [label], "postprocess":  (data) => {
          return 0;
        } },
    {"name": "number", "symbols": [float], "postprocess": id},
    {"name": "number", "symbols": [int], "postprocess": (data) => {console.log(data[0]); return data[0].value; }}
]
  , ParserStart: "expression"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
