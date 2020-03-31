// tokenizer has two states: main and func_args
export default {
  main:{
    whitespace: { match: /[\s]+/, lineBreaks: true },
    func_call:  {
      match: /[a-zA-Z_$][0-9a-zA-Z_$]*\(/,
      push: 'func_args', // change to func_args state
      value: x => x.slice(0, -1), // remove last character
    },
    label: /[a-zA-Z]+[1-9]+[0-9]*/,
    plus: '+',
    asterisk: '*',
    slash: '/',
    minus: '-',
    lparen: '(',
    rparen: ')',
    number: {
      match: /[1-9][0-9]*(?:,[0-9]*)?|0\.[0-9]+/, // examples : 0 | 0,123 | -14 | +0,23
      value: x=> parseFloat(x),
    },
  },
  func_args:{
    func_call_end:  {match: ')', pop: 1}, // come back to main state
    label: /[a-zA-Z]+[1-9]+[0-9]*/,
    semicolon: ';',
    colon: ':',
    whitespace: /[ ]+/,
  }
};
