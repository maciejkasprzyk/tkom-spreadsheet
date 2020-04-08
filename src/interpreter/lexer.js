import * as moo from 'moo'

const tokens = {
  whitespace: {match: /[\s]+/, lineBreaks: true},
  identifier: {
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


