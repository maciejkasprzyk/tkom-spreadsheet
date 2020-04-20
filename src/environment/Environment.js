import {UserError} from "../parser/errors";
import {FormulaParser} from "../parser/parsers";
import {isFormula, topologicalSort} from "./utils";
import {Variable} from "./Variable";
import {Cell} from "./Cell";

export class Environment {

  constructor(x, y) {
    this.funcitons = {};
    this.x = x;
    this.y = y;
    this.cells = Array(y);
    for (let i = 0; i < y; i++) {
      this.cells[i] = Array(x);
      for (let j = 0; j < x; j++) {
        this.cells[i][j] = new Cell(j, i, this);
      }
    }
  }

  // this is called only by store, there's no equivalent in code to just
  // typing a value into a cell (without =)
  setCell(x, y, string) {
    const cell = this.getCell(x, y);
    cell.unregisterFromAllSubjects();
    try {
      if (isFormula(string)) {
        cell.formula = string;
        const parser = new FormulaParser();
        parser.feed(cell.formula.substring(1));
        const ast = parser.results;
        this.setCellAst(cell, ast);
      } else {
        this._setCellValue(cell, string);
      }
      this.updateObservers(cell);
      cell.error = null;
    } catch (e) {
      if (e.name !== "UserError") {
        throw e;
      }
      cell.error = e.message;
    }
  }

  setCellAst(cell, ast) {
    cell.ast = ast;
    cell.value = cell.ast.exec(this);

    const varsReferenced = cell.ast.findVarsReferenced(this);
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
    const x2 = start.x;
    const y2 = start.y;

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
    try {
      return this.cells[y][x];
    } catch (e) {
      throw new UserError("No such cell");
    }
  }


  updateObservers(variable) {
    for (const x of topologicalSort(variable)) {
      x.value = x.ast.exec(this);
    }
  }


  getFunctionAst(identifier) {
    if (!this.funcitons.hasOwnProperty(identifier)) {
      throw new UserError(`No function: ${identifier}`);
    }
    return this.funcitons[identifier];
  }




  ////////////////////////////////////////////////////////////////////////////


  setVariable(identifier, value) {
    let variable = this.getOrCreateVar(identifier);
    this.setValue(variable, value);
  }






  getOrCreateVar(identifier) {
    try {
      return this.getVarByName(identifier);
    } catch (e) {
      return this.variables[identifier] = new Variable();
    }
  }



  getVarByName(identifier) {
    let variable = this.getCellByName(identifier);
    if (variable == null) {
      if (this.variables.hasOwnProperty(identifier)) {
        return this.variables[identifier];
      } else {
        throw new UserError(`No variable: ${identifier}`);
      }
    }
    return variable;
  }
}
