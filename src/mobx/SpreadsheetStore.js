import {Environment} from "../environment/Environment";
import {Parser} from "../parser/parsers";
import {lexer} from "../parser/lexer";
import {observable} from "mobx";


export class SpreadsheetStore {

  @observable annotations = []

  constructor(x, y) {
    this.env = new Environment(x, y);
  }

  reset() {
    this.env.reset()
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
        } else if (cell.value) {
          x = cell.value;
        } else {
          continue;
        }
        result[cell.label] = x;
      }
    }
    return result
  }

  run(code) {
    this.annotations = []
    if (code === "") {
      return;
    }
    try {
      const parser = new Parser();
      parser.feed(code);
      for (const line of parser.results) {
        line.exec(this.env);
      }
    } catch (e) {
      if (e.name !== "UserError") {
        throw e;
      }

      const regex = /.*line (\d*).*col (\d*)/gm;

      const m = regex.exec(e.message)
      if (m !== null) {
        const line = parseInt(m[1]) - 1
        const col = parseInt(m[2])
        const lines = e.message.split("\n");
        const n = Math.min(5, lines.length)
        let message = ""
        if (4 in lines) {
          lines[4] = lines[4].substring(0, lines[4].indexOf("Instead"));
        }
        for (let i = 0; i < n; i++) {
          message +=lines[i] + '\n'
        }
        this.annotations = [{row: line, column: col, type: 'error', text: message}];
      } else {
        this.annotations = [{row: 0, column: 0, type: 'error', text: e.message}];
      }
      console.log(e.message)
    }
  }

  logParseTree(code) {
    this.annotations = []
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
    this.annotations = []
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
