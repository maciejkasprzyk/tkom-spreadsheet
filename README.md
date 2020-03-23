# Tkom-spreadsheet

Spreadsheet with macros.

Live demo [here](https://maciejkasprzyk.github.io/tkom-spreadsheet/).  
Keep in mind that the only formula working right now (for testing) is simple reference of another cell. For example '=A3'.

#### This is still in progress
 * [x] Basic view
 * [x] Auto refresh formula logic
 * [x] Formula lexer
 * [x] Formula parser
 * [ ] Connecting formula parser to view  
 * [ ] Macro support  
... and more coming


#### About

This project uses [moo](https://github.com/no-context/moo) as tokenize and [nearleyjs](https://nearley.js.org/) to parse formulas. View is implemented in [react](https://reactjs.org/) with the help of state management library [mobx](https://mobx.js.org/.)

#### File structure

Source code lives in `/src`:

Spreadsheet view: `components/Spreadsheet.js`  
Spreadsheet model/logic: `mobx/SpreadsheetStore.js`  
Formula lexer: `tokens.js`  
Formula parser: `grammar.ne`  

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
    func_call:  {
      match: /[a-zA-Z_$][0-9a-zA-Z_$]*\(/,
      push: 'func_args', // change to func_args state
      value: x => x.slice(0, -1), // remove last character
    },
    whitespace: /[ ]+/,
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
That is parser code from `grammar.ne` with blocks of javascript code removed:
```
# note: % references a token
expression ->
  multi_expr
  |expression %plus multi_expr
  |expression %minus multi_expr

multi_expr ->
  primary
  |multi_expr %asterisk primary
  |multi_expr %slash primary
    
primary ->
  %lparen expression %rparen
  |number
  |cell_ref 
  |func

cell_ref ->
  %label

number ->
  %float 
  |%int

func ->
  %func_call args %func_call_end

args ->
  range
  |list
    
range ->
  %label %colon %label
    
list ->
  %label
  |%label %semicolon list
```

#### Macro (brief concept only)
Macros will use Javascript (or its superset) in order to be super easy to pick up for someone who knows JS already. I'm not really sure about the functionality yet.  
Things I am taking into consideration:
* aliases for cells and ranges
* [reactive](https://en.wikipedia.org/wiki/Reactive_programming) variables
* possibility to permanently bind Javascript functions to cells (in other words: use JS to write complex formulas)

I still need to think about syntax so I will not give examples here. I hope (please have mercy) that's not a big issue.
