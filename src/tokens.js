// tokenizer has two states: main and func_args
module.exports = {
  // main:{
    func_call:  {
      match: /[a-zA-Z_$][0-9a-zA-Z_$]*\(/,
      // push: 'func_args', // change to func_args state
      value: x => x.slice(0, -1), // remove last character
    },
    whitespace: /[ ]+/, // whitespaces are later ignored and not passed to parser
    plus: '+',
    minus: '-',
    asterisk: '*',
    slash: '/',
    label: /[a-zA-Z]+[1-9]+[0-9]*/,
    int: {
      match: /[+-]?[1-9]+[0-9]*/, // examples : 0 | 0,123 | -14 | +0,23
      value: x=> parseInt(x),
    },
    float: {
      match: /[-+]?[1-9][0-9]*(?:,[0-9]*)|0\.[0-9]+/, // examples : 0 | 0,123 | -14 | +0,23
      value: x=> parseFloat(x),
    },
    lparen: '(',
    rparen: ')',
  // },
  // func_args:{
  //   args_end:  {match: ')', pop: 1}, // come back to main state
  //   label: /[a-zA-Z]+[1-9]+[0-9]*/,
  //   semicolon: ';',
  //   comma: ',',
  //   whitespace: /[ ]*/, // whitespaces are later ignored and not passed to parser
  //
  // }
};
