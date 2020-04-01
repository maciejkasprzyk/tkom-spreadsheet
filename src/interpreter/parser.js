import * as nearley from 'nearley';
import grammar from "./grammar.js";


export class Parser {
  cellsReferenced = [];
  constructor(getByLabel) {
    this.parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    // to understand it read comment in parserPostProcessors.js
    // post.getByLabel = (label) => {
    //   const cell = getByLabel(label);
    //   this.cellsReferenced.push(cell);
    //   return cell.value;
    // };
  }

  feed(s) {
    return this.parser.feed(s);
  }

  get results() {
    return this.parser.results[0][0];
  }
}
