import * as moo from 'moo'

// lexer has two states: main and func_args
const tokens = {
  whitespace: {match: /[\s]+/, lineBreaks: true},
  function_identifier: {
    match: /[a-zA-Z_$][0-9a-zA-Z_$]*\(/,
    value: x => x.slice(0, -1), // remove last character
  },
  variable: {
    match: /[a-zA-Z]+[0-9]*/,
    type: moo.keywords({
      "if": "if"
    })
  },
  plus: '+',
  asterisk: '*',
  slash: '/',
  minus: '-',
  lparen: '(',
  rparen: ')',
  semicolon: ';',
  colon: ':',
  number: {
    match: /[1-9][0-9]*(?:,[0-9]*)?|0\.[0-9]+/, // examples : 0 | 0,123 | -14 | +0,23
    value: x => parseFloat(x),
  },

};

export const lexer = moo.compile(tokens);

// ignore whitespaces tokens
lexer.next = (next => () => {
  let tok;
  while ((tok = next.call(lexer)) && tok.type === "whitespace") {
  }
  return tok;
})(lexer.next);


