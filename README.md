# Tkom-spreadsheet

Spreadsheet with macros.

Live demo [here](https://maciejkasprzyk.github.io/tkom-spreadsheet/).  


#### This is still in progress
 * [x] Basic view
 * [x] Auto refresh formula logic
 * [x] Formula lexer
 * [x] Formula parser
 * [x] Connecting formula parser to view  
 * [ ] Macro support  
... and more coming


#### About

This project uses [moo](https://github.com/no-context/moo) as tokenize and [nearleyjs](https://nearley.js.org/) to parse formulas. View is implemented in [react](https://reactjs.org/) with the help of state management library [mobx](https://mobx.js.org/.)

#### File structure

Source code lives in `/src`:

Spreadsheet view: `components/Spreadsheet.js`  
Spreadsheet model/logic: `mobx/SpreadsheetStore.js`  
Formula lexer: `parser/tokens.js`  
Formula parser: `parser/grammar.ne`  

#### Formula examples
 * `=2 * (2 + 2) / 5` and other math expressions
 * `=A1 * (2 + B2) / 5` cell references
 * `=function(A5:B7)` functions accept range
 * `=function(A1;A2;A3)`or lists of args
 * `=1 + sum(A1:B5) * A1`
 * `=avg(C1:C10) / sum(A1:B5)`

 

#### View
Click to edit cell, if you want to put in formula start with `=`. Press enter to confirm. View is kept loosely tied to the model.

#### Spreadsheet logic
Auto refresh of formulas is implemented with a variation of [observer patter](https://en.wikipedia.org/wiki/Observer_pattern). Each cell stores collections of observers (cells that observe this) and subjects (cells that this observe). When cell value changes all observers (and observers of observers) are recalculated. The order in which cells refresh is determined by [topological sorting algorithm with cycle detection](https://en.wikipedia.org/wiki/Topological_sorting#Depth-first_search).

#### Formula lexer
Lexer has two states. When we encounter function call we change state to `func_args`. That is not necessary for lexer to work, but it allows to detect more errors during lexing. For example `sum(A1*B1)` will result in syntex error as `*` is not allowed as function argument. Source code:
```js
// tokenizer has two states: main and func_args
module.exports = {
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
```

#### Formula parser
Parser uses [precedence climbing method](https://en.wikipedia.org/wiki/Operator-precedence_parser#Precedence_climbing_method) to execute parenthesis and operators in adequate order.  
[Diagram](https://maciejkasprzyk.github.io/tkom-spreadsheet/grammar) of parser structure.  

### po konsultacjach

- nody maja byc obiektami klas z metodą exec
- mam obserwowac tylko zmienne, ktore sa podane jako argumenty (jak funkcje bez efektow ubocznych)
- można wywoływać funkcje
- ma byc zapisywanie do pliku -> wszystkie formuly mogę zapisać w funkcji onLoad, która będzie automatycznie uruchamiana i nie wyswietlana użytkownikowi w okienku edycji
- brak odowołań do komórek poprzez A1 A2 itp tylko np ["A","1"] // tego najbardziej nie rozumiem, chyba zostawie to na koniec


