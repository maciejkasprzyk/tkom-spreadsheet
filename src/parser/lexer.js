import * as moo from 'moo'
import IndentedLexer from './indentedLexer'

function divideIntoLettersAndNumber(cellIdentifier) {
  const regex = /([a-zA-Z]+)([0-9]+)/;
  const match = regex.exec(cellIdentifier);

  return [match[1], match[2]];
}

export function getCellIndexes(cellIdentifier) {
  const [letters, digits] = divideIntoLettersAndNumber(cellIdentifier);

  const y_index = parseInt(digits) - 1;

  let x_index = 0;
  for (let i = 0; i < letters.length; i++) {
    x_index *= ("Z".charCodeAt(0) - 'A'.charCodeAt(0) + 1);
    x_index += letters[i].charCodeAt(0) - "A".charCodeAt(0);
  }
  return {x:x_index, y: y_index}
}

const tokens = {
  ws: /[ \t\u00A0\u1680\u2000-\u200a\u2028\u2029\u202f\u3000]+/,
  end: {match: /\n/, lineBreaks: true},
  cell: {
    match: /[a-zA-Z]+[0-9]+/,
    value: x => getCellIndexes(x),
  },
  variable: {
    match: /[a-zA-Z]+/,
    type: moo.keywords({
      "kwIf": "if",
      "kwWhile": "while",
      "kwFor": "for",
      "kwElse": "else",
      "kwDef": "def",
    })
  },
  dot: '.',
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
  equal: '==',
  greaterEqual: '>=',
  lessEqual: '<=',
  less: '<',
  greater: '>',
  notEqual: '!=',
  assign: '=',
  string: /".*?"/,
  number: {
    match: /[1-9][0-9]*(?:,[0-9]*)?|0(?:\.[0-9]+)?/, // (?: non capturing group
    value: x => parseFloat(x),
  },

};

export const lexer = new IndentedLexer(moo.compile(tokens), 'ws', 'end');

