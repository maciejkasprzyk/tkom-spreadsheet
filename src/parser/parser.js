const nearley = require("nearley");
const grammar = require("./grammar.js");
const post = require('./parserPostProcessors');


export class Parser {
  cellsReferenced = [];
  constructor(getByLabel, debug = false) {
    this.parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    post.getByLabel = (label) => {
      const cell = getByLabel(label);
      this.cellsReferenced.push(cell);
      return cell.value;
    };

    post.log = debug ? (function () {
      console.log(...arguments)
    }) : () => {};
  }

  feed(s) {
    return this.parser.feed(s);
  }

  get results() {
    return this.parser.results;
  }
}
