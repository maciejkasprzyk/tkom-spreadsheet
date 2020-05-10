import {lexer} from "./lexer";
import {UserError} from "./errors";

// .*\{type: (\"\w*\").*
// \texpect(lexer.next()).toEqual(expect.objectContaining({"type": $1}));

test('identifier', () => {
  lexer.reset('b\n');
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "identifier"}));
});

test('cell', () => {
  lexer.reset('A1\n');
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "cell"}));
});

test('lessEqual', () => {
  lexer.reset('<=\n');
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "lessEqual"}));
});

test('greaterEqual', () => {
  lexer.reset('>=\n');
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "greaterEqual"}));
});

test('equal', () => {
  lexer.reset('==\n');
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "equal"}));
});

test('incorrect_symbol', () => {
  lexer.reset('@');
  expect(lexer.next).toThrow(UserError);
});

test('math_symbols', () => {
  lexer.reset('1+2*(5+5)+2/3+((1*3))/2');
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "number"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "plus"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "number"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "asterisk"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "lparen"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "number"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "plus"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "number"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "rparen"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "plus"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "number"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "slash"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "number"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "plus"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "lparen"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "lparen"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "number"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "asterisk"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "number"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "rparen"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "rparen"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "slash"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "number"}));
});

test('math symbols_with_labels', () => {
  lexer.reset('C7+D7*E7');
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "cell"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "plus"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "cell"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "asterisk"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "cell"}));
});

test('defFunction', () => {
  lexer.reset('def func()\n' +
    '    body\n' +
    'cos\n');
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "kwDef"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "identifier"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "lparen"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "rparen"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "end"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "indent"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "identifier"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "end"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "dedent"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "identifier"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "end"}));
});


test('indication', () => {

  lexer.reset('a\n' +
    '    b\n' +
    '    c\n' +
    '        d\n' +
    'e\n');
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "identifier"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "end"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "indent"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "identifier"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "end"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "identifier"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "end"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "indent"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "identifier"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "end"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "dedent"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "dedent"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "identifier"}));
	expect(lexer.next()).toEqual(expect.objectContaining({"type": "end"}));
  });


test('if_whole', () => {
  lexer.reset('if A1 == 5\n' +
    '    A2 = 5\n' +
    'else\n' +
    '    A2 = 10\n');
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "kwIf"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "cell"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "equal"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "number"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "end"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "indent"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "cell"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "assign"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "number"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "end"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "dedent"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "kwElse"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "end"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "indent"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "cell"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "assign"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "number"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "end"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "dedent"}));
});


test('while_whole', () => {

  lexer.reset('i = 0\n' +
    'while i < 5\n' +
    '    cell[15][i] = i\n');
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "identifier"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "assign"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "number"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "end"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "kwWhile"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "identifier"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "less"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "number"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "end"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "indent"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "identifier"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "lsquare"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "number"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "rsquare"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "lsquare"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "identifier"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "rsquare"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "assign"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "identifier"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "end"}));
  expect(lexer.next()).toEqual(expect.objectContaining({"type": "dedent"}));
});
