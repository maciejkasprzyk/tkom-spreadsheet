# Tkom-spreadsheet

Spreadsheet with macros. [Live demo](https://maciejkasprzyk.github.io/tkom-spreadsheet/).  

## Running locally

Clone git repo:\
`git clone https://github.com/maciejkasprzyk/tkom-spreadsheet.git`

Install dependencies via [npm:](https://www.npmjs.com/) \
`npm install`

Start development server:\
`npm run start`

Visit http://localhost:3000/tkom-spreadsheet in browser.

## Usage

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
