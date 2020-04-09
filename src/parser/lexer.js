import * as moo from 'moo'

const tokens = {
  whitespace: {match: /[\s]+/, lineBreaks: true},
  identifier: {
    match: /[a-zA-Z]+[0-9]*/,
    type: moo.keywords({
      "kwIf": "if"
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
  compOperator: /==|>=|<=|<|>|!=/,
  equal: '=',
  number: {
    match: /[1-9][0-9]*(?:,[0-9]*)?|0(?:\.[0-9]+)?/, // ?: dont create capturing group
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


