import {Environment} from "../environment/Environment";
import {Parser} from "../parser/parsers";
import {lexer} from "../parser/lexer";


export class SpreadsheetStore {

  constructor(x, y) {
    this.env = new Environment(x, y);
  }

  onCellSet(x, y, value) {
    this.env.setCell(x, y, value);
  }

  cellsToObjects() {
    const result = {};

    for (let i = 0; i < this.env.y; i++) {
      for (let j = 0; j < this.env.x; j++) {
        const cell = this.env.getCell(j, i);
        let x;
        if (cell.formula) {
          x = cell.formula
        }
        else if (cell.value) {
          x = cell.value;
        }
        else {
          continue;
        }
        result[cell.label] = x;
      }
    }
    return result
  }

  run(code) {
    if (code === "") {
      return;
    }
    try {
      const parser = new Parser();
      parser.feed(code);
      parser.results.exec(this.env);
    } catch (e) {
      if (e.name !== "UserError") {
        throw e;
      }
      // todo fancy errors
      console.log(e.message);
    }
  }

  logParseTree(code) {
    try {
      const parser = new Parser();
      parser.feed(code);
      console.log(parser.results);
    } catch (e) {
      if (e.name !== "UserError") {
        throw e;
      }
      console.log(e.message);
    }
  }

  logLexerOutput(code) {
    try {
      lexer.reset(code);
      const result = [];
      let tok = lexer.next();
      while (tok !== undefined) {
        result.push(tok);
        tok = lexer.next()
      }
      console.log(result);
    } catch (e) {
      if (e.name !== "UserError") {
        throw e;
      }

      console.log(e.message);
    }
  }

}
