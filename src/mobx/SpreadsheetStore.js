import {FormulaParser} from "../parser/parsers";
import {nodeTypes} from "../parser/nodeTypes";
import {UserError} from "../parser/errors";
import {Cell, Variable} from "./variables";
import {getCellIndexes, isFormula, topologicalSort} from "./utils";


export class SpreadsheetStore {
  cells = [];
  variables = {};

  constructor(x, y, functions) {
    this.x = x;
    this.y = y;
    this.functions = functions;
    this.cells = Array(y);
    for (let i = 0; i < y; i++) {
      this.cells[i] = Array(x);
      for (let j = 0; j < x; j++) {
        this.cells[i][j] = new Cell(i, j, this);
      }
    }
  }

  updateObservers(variable) {
    for (const x of topologicalSort(variable)) {
      this.execFormula(x);
    }
  }

  execFormula(variable) {
    variable.value = this.execExpr(variable.ast);
  }


  exec(x) {
    // its either a list or a object with property type set
    if (Array.isArray(x)) {
      for (const x1 of x) {
        this.exec(x1);
      }
      return;
    }
    switch (x.type) {
      case nodeTypes.assigment:
        const left = x.left.identifier;
        const right = this.execExpr(x.right);
        this.setVariable(left, right);
        return right;
      case nodeTypes.expr:
        return this.execExpr(x.expr);
      case nodeTypes.whileLoop:
        while (this.execExpr(x.condition)) {
          this.exec(x.block);
        }
        break;
      default:
        throw Error(`Not handled node type ${x.type}`);
    }
  }

  execExpr(x) {

    switch (x.type) {
      case nodeTypes.primary:
        return x.value;
      case nodeTypes.variable:
        return this.getVarByName(x.identifier).value;

      case nodeTypes.multiplication:
        return this.execExpr(x.op1) * this.execExpr(x.op2);

      case nodeTypes.division:
        return this.execExpr(x.op1) / this.execExpr(x.op2);

      case nodeTypes.addition:
        return this.execExpr(x.op1) + this.execExpr(x.op2);

      case nodeTypes.subtraction:
        return this.execExpr(x.op1) - this.execExpr(x.op2);

      case nodeTypes.functionCall:
        if (!this.functions.hasOwnProperty(x.identifier)) {
          throw new UserError(`No function: ${x.identifier}`);
        }
        const args = x.args.map(a => this.execExpr(a));
        return this.functions[x.identifier](...args);

      case nodeTypes.comparision:
        const a = this.execExpr(x.op1);
        const b = this.execExpr(x.op2);
        switch (x.operator) {
          case '==':
            return a === b;
          case '>=':
            return a >= b;
          case '<=':
            return a <= b;
          case '<':
            return a < b;
          case '>':
            return a > b;
          case '!=':
            return a !== b;
          default:
            throw Error("Unknown comparison operator");
        }

      case nodeTypes.range:
        return this.getCellsByRange(x.cell1.identifier, x.cell2.identifier).map((x) => x.value);

      default:
        throw Error(`Not handled node type ${x.type}`);

    }
  }

  setCell(cell, string) {
    cell.unregisterFromAllSubjects();
    try {
      if (isFormula(string)) {
        this.setFormula(cell, string);
      } else {
        this.setValue(cell, string);
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

  setValue(variable, value) {
    const x = parseFloat(value);
    if (!isNaN(x)) {
      variable.value = x;
    } else {
      variable.value = value;
    }
    variable.formula = null;
    variable.ast = null;
  }

  setFormula(variable, formula) {
    variable.formula = formula;
    const parser = new FormulaParser();
    parser.feed(variable.formula.substring(1));

    variable.ast = parser.results;
    this.execFormula(variable);

    for (const v of this.findVarsReferenced(variable.ast)) {
      variable.observe(v);
    }
  }

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


  /**
   * @param identifier For example: A2, AB13, C13 etc as string
   */
  getCellByName(identifier) {
    let x_index, y_index;
    try {
      [x_index, y_index] = getCellIndexes(identifier);
    }catch (e) {
      return null;
    }

    if (this.x <= x_index || this.y <= y_index) {
      return null;
    }
    return this.cells[y_index][x_index];
  }

  getCellsByRange(start, end) {
    const [x1, y1] = getCellIndexes(start);
    const [x2, y2] = getCellIndexes(end);

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

  findVarsReferenced(ast) {
    function dfs(node) {
      if (node.type !== undefined) {
        if (node.type === 'variable') {
          references.push(node.identifier);
          return;
        }
        if (node.type === 'range') {
          ranges.push([node.cell1.identifier, node.cell2.identifier]);
          return;
        }
        for (const property in node) {
          if (node.hasOwnProperty(property)) {
            if (Array.isArray(node[property])) {
              for (const el of node[property]) {
                dfs(el);
              }
            } else {
              dfs(node[property]);
            }
          }
        }
      }
    }

    const ranges = [];
    const references = [];
    dfs(ast);

    const result = [];
    result.push(...references.map((x) => this.getVarByName(x)));
    for (let [start, end] of ranges) {
      result.push(...this.getCellsByRange(start, end));
    }
    return result;
  }
}
