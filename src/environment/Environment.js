import {UserError} from "../parser/errors";
import {FormulaParser} from "../parser/parsers";
import {isFormula, letterLabelGenerator, topologicalSort} from "../utils";
import {Variable} from "./Variable";
import {Cell} from "./Cell";
import {ReferenceNode} from "../nodes/ReferenceNode";

export class Environment {

  constructor(x, y) {
    this.funcitons = {};
    this.x = x;
    this.y = y;
    this.cells = Array(y);
    for (let i = 0; i < y; i++) {
      this.cells[i] = Array(x);
      const gen = letterLabelGenerator();
      for (let j = 0; j < x; j++) {
        const label = gen.next().value + (i + 1).toString();
        this.cells[i][j] = new Cell(j, i, label);
      }
    }

    // new scope is only used in functions (to prevent them from accessing external variables)
    this.variablesScopes = [{}];
    this.referencesScopes = [{}];
  }

  reset() {
    for (let i = 0; i < this.y; i++) {
      for (let j = 0; j < this.x; j++) {
        this.cells[i][j].reset();
      }
    }

  }

  setCell(x, y, string) {
    const cell = this.getCell(x, y);
    cell.unregisterFromAllSubjects();
    try {
      if (isFormula(string)) {
        if (string.length === 1) {
          return
        }
        this._setCellFormula(cell, string);
      } else {
        this._setCellValue(cell, string);
      }

      this._updateObservers(cell);
      cell.error = null;
    } catch (e) {
      if (e.name !== "UserError") {
        throw e;
      }

      cell.error = e.message.split("\n")[1];
    }
  }


  _setCellFormula(cell, formula) {
    cell.formula = formula;
    const parser = new FormulaParser();
    parser.feed(formula.substring(1));
    cell.ast = parser.results;
    cell.value = cell.ast.exec(this);
    const varsReferenced = cell.ast.findCellsReferenced(this);
    for (const v of varsReferenced) {
      cell.observe(v);
    }
  }

  _setCellValue(variable, value) {
    const x = parseFloat(value);
    if (!isNaN(x)) {
      variable.value = x;
    } else {
      variable.value = value;
    }
    variable.formula = null;
    variable.ast = null;
  }

  getCellsByRange(start, end) {
    const x1 = start.x;
    const y1 = start.y;
    const x2 = end.x;
    const y2 = end.y;

    if (this.x <= x1 || this.y <= y1) {
      throw new UserError(`No cell: ${start}`)
    }
    if (this.x <= x2 || this.y <= y2) {
      throw new UserError(`No cell: ${end}`)
    }

    const result = [];

    for (let i = y1; i <= y2; i++) {
      for (let j = x1; j <= x2; j++) {
        result.push(this.cells[i][j]);
      }
    }

    return result;
  }

  getCell(x, y) {
    let cell;
    try {
      cell = this.cells[y][x];
    } catch (e) {
    }
    if (cell === undefined) {
      throw new UserError("No such cell");
    }
    return cell;
  }


  _updateObservers(cell) {
    for (const x of topologicalSort(cell)) {
      x.value = x.ast.exec(this);
    }
  }


  setVariable(identifier, value) {
    const variables = this.variablesScopes[this.variablesScopes.length - 1];
    let variable;
    try {
      variable = this.getVarByName(identifier);
      variable.value = value;
    } catch (e) {
      variables[identifier] = new Variable(value);
    }
  }


  getVarByName(identifier) {
    const variables = this.variablesScopes[this.variablesScopes.length - 1];
    if (variables.hasOwnProperty(identifier)) {
      return variables[identifier];
    } else {
      throw new UserError(`No variable: ${identifier}`);
    }
  }

  setReference(identifier, node) {
    if (!identifier instanceof String) {
      console.log(identifier)
      throw Error('setReference called with wrong type');
    }
    this.referencesScopes[this.referencesScopes.length - 1][identifier] = node;
  }

  getReference(identifier) {
    if (!identifier instanceof String) {
      throw Error('getReference called with wrong type');
    }
    // console.log(identifier)
    // console.log(this.referencesScopes)
    let x = this.referencesScopes[this.referencesScopes.length - 1][identifier];
    // console.log(x)
    if (x instanceof ReferenceNode) {
      x = this.getReference(x.identifier);
    }
    return x;
  }

  setFunction(identifier, args, block) {
    this.funcitons[identifier] = {args: args, block: block};
  }

  getFunction(identifier) {
    if (!identifier instanceof String || !this.funcitons.hasOwnProperty(identifier)) {
      throw new UserError(`No function: ${identifier}`);
    }
    return this.funcitons[identifier];
  }

  newScope() {
    this.variablesScopes.push({});
    this.referencesScopes.push({});
  }

  popScope() {
    this.variablesScopes.pop();
    this.referencesScopes.pop();
  }

}
