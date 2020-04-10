import * as moo from 'moo'
import IndentedLexer from './indentedLexer'

const tokens = {
  ws: /[ \t\u00A0\u1680\u2000-\u200a\u2028\u2029\u202f\u3000]+/,
  end: {match: /\n/, lineBreaks: true},
  identifier: {
    match: /[a-zA-Z]+[0-9]*/,
    type: moo.keywords({
      "kwIf": "if",
      "kwWhile": "while",
      "kwFor": "for",
    })
  },
  lparen: '(',
  rparen: ')',
  lsquare: '[',
  rsquare: ']',
  plus: '+',
  asterisk: '*',
  slash: '/',
  minus: '-',
  semicolon: ';',
  colon: ':',
  compOperator: /==|>=|<=|<|>|!=/,
  assign: '=',
  number: {
    match: /[1-9][0-9]*(?:,[0-9]*)?|0(?:\.[0-9]+)?/, // ?: dont create capturing group
    value: x => parseFloat(x),
  },

};

export const lexer = new IndentedLexer(moo.compile(tokens), 'ws', 'end');


// ignore whitespaces tokens
lexer.next = (next => () => {
  let tok;
  while ((tok = next.call(lexer)) && tok.type === "ws") {
  }
  return tok;
})(lexer.next);


