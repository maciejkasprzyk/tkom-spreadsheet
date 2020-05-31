# Tkom-spreadsheet

Project for TKOM course at Warsaw University of Technology.\
Spreadsheet with macros. [Live demo](https://maciejkasprzyk.github.io/tkom-spreadsheet/).  


## Running locally

Clone git repo:\
`git clone https://github.com/maciejkasprzyk/tkom-spreadsheet.git`

Install dependencies via [npm:](https://www.npmjs.com/) \
`npm install`

Start development server:\
`npm run start`

Visit http://localhost:3000/tkom-spreadsheet in browser.

## Features

- saving and reading from file
- variables, conditions, loops and references
- defining functions and using them in spreadsheet formulas
- reactive cells, cells update when you change other cells they depend on

## Usage
The app composes of two elements, spreadsheet on the left and code editor on the right.\
Use the spreadsheet as any normal one, click to edit a cell, start with equal sign (=) to enter a formula.\
Type code in the editor, click run button to execute it.


Most of the language syntax is intuitive best explained via examples. \
Examples can be found [here](examples). Download and open using [demo](https://maciejkasprzyk.github.io/tkom-spreadsheet/) to see this in action. 


Less intuitive features:
- Use squares to reference a cell with dynamic coordinates
```
i = 0
while i < 5
    [0;i] = i 
```
- functions can only use their parameters and cannot reference global variables
```
var = 5
def foo(b):
    A1 = b
```
Referencing `var` from `foo` would cause an execution error. 
- you can loop over ranges
```
for a in A1:A5
    a = 5
```

## Implementation
This project uses [moo](https://github.com/no-context/moo) as tokenizer and [nearleyjs](https://nearley.js.org/) as parser. View is implemented in [react](https://reactjs.org/) with the help of state management library [mobx](https://mobx.js.org/.)

### Spreadsheet refresh logic
Auto refresh of formulas is implemented with a variation of [observer patter](https://en.wikipedia.org/wiki/Observer_pattern). Each cell stores collections of observers (cells that observe this) and subjects (cells that this observes). When cell value changes all observers (and observers of observers) are recalculated. The order in which cells refresh is determined by [topological sorting algorithm with cycle detection](https://en.wikipedia.org/wiki/Topological_sorting#Depth-first_search).

### Lexer
Tokens from this [file](src/parser/lexer.js) are fed to moo to generate stateless lexer.\
Then there are two more layers of processing added [here](src/parser/indentedLexer.js).\
First layer makes the lexer indentation aware (lexer becomes stateful).\
Second layer removes whitespace tokens, so we don't need to mess with then in the parser.

### Parser
There are two parsers, one is a subset of the other.
1) **Formula parser** \
Used when parsing formulas from cells.
It uses [precedence climbing method](https://en.wikipedia.org/wiki/Operator-precedence_parser#Precedence_climbing_method) to execute parenthesises and operators in adequate order.  
[Diagram](https://maciejkasprzyk.github.io/tkom-spreadsheet/formulaGrammar.html) \
[Soruce code](src/parser/formulaGrammar.ne)
2) **Macro parser** \
Used when parsing code.\
[Diagram](https://maciejkasprzyk.github.io/tkom-spreadsheet/grammar.html) \
[Soruce code](src/parser/grammar.ne)

#### Ast
While parsing an abstract syntax tree is being build. Nodes of the tree represent different operations. Source code of nodes lives [here](src/nodes).

### Interpreter
Each node implements an `exec(env)` method. Env is an environment in which the node is being executed. It stores information about variables, defined functions, references and cells and implements methods to read and change them. 

#### Unparsing of formulas
Let's consider this statement:
```
a = 5
A1 = 5 + a * 2 * [1;0] 
```
In a result a formula `= 5 + ( 5 * ( 2*B1 ) )` will be assigned to cell `A1`
It's achieved with a couple of steps:
- those two lines are first tokenized then parsed into an abstract syntax tree
- statement `a = 5` is executed setting the `a` variable in the environment
- the interpreter realizes the secoznd statement is an assign to a cell
- it travels the right sight of assignment replacing variables with their values a the time of execution. \
In out case: the node which symbolizes variable `a` is changed to constant node with value of `5`
- then the interpreter unparses the syntax tree into a new string `= 5 + ( 5 * ( 2*B1 ) )`
- the formula for cell A1 is set as this string, then the normal logic of setting a cell node starts: the formula is parsed and executed, all other cells that depend on `A1` are updated etc...

### Testing

Test are mostly constructed like this:
- run some code
- check if cells have appropriate values
Test can be found in files with `.test.js` extension.
Most of then are located [here](src/mobx/SpreadsheetStore.test.js)


To run tests:
`npm run test`
