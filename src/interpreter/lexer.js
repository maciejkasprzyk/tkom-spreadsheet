import * as moo from 'moo'

// lexer has two states: main and func_args
const tokens = {
  main: {
    whitespace: {match: /[\s]+/, lineBreaks: true},
    function_identifier: {
      match: /[a-zA-Z_$][0-9a-zA-Z_$]*\(/,
      push: 'func_args', // change to func_args state
      value: x => x.slice(0, -1), // remove last character
    },
    variable: {
      match: /[a-zA-Z]+[0-9]*/,
      type:moo.keywords({
        "if": "if"
      })
    },
    plus: '+',
    asterisk: '*',
    slash: '/',
    minus: '-',
    lparen: '(',
    rparen: ')',
    number: {
      match: /[1-9][0-9]*(?:,[0-9]*)?|0\.[0-9]+/, // examples : 0 | 0,123 | -14 | +0,23
      value: x => parseFloat(x),
    },
  },
  func_args: {
    func_call_end: {match: ')', pop: 1}, // come back to main state
    variable: /[a-zA-Z]+[1-9]+[0-9]*/,
    semicolon: ';',
    colon: ':',
    whitespace: /[ ]+/,
  }
};

export const lexer = moo.states(tokens);

// ignore whitespaces tokens
lexer.next = (next => () => {
  let tok;
  while ((tok = next.call(lexer)) && tok.type === "whitespace") {
  }
  return tok;
})(lexer.next);


