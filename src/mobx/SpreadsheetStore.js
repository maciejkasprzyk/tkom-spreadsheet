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


  exec(node) {
    // its either a list or a object with property type set
    if (Array.isArray(node)) {
      for (const x1 of node) {
        this.exec(x1);
      }
      return;
    }
    switch (node.type) {
      case nodeTypes.assigment:
        const left = this.execLeft(node.left);
        const right = this.execExpr(node.right);
        // todo check for errors
        left.value = right;
        return right;
      case nodeTypes.expr:
        return this.execExpr(node.expr);
      case nodeTypes.whileLoop:
        while (this.execExpr(node.condition)) {
          this.exec(node.block);
        }
        break;
      case nodeTypes.ifElse:
        if (this.execExpr(node.condition)) {
          this.exec(node.block);
        } else {
          if (node.elseBlock !== null) {
            this.exec(node.elseBlock);
          }
        }
        break;
      default:
        throw Error(`Not handled node type ${node.type}`);
    }
  }

  execLeft(node) {
    switch (node.type) {
      case nodeTypes.variable:
        return this.getOrCreateVar(node.identifier);
      default:
        throw new UserError("Assign to rvalue.")
    }
  }

  execExpr(node) {

    switch (node.type) {
      case nodeTypes.primary:
        return node.value;
      case nodeTypes.variable:
        return this.getVarByName(node.identifier).value;

      case nodeTypes.multiplication:
        return this.execExpr(node.op1) * this.execExpr(node.op2);

      case nodeTypes.division:
        return this.execExpr(node.op1) / this.execExpr(node.op2);

      case nodeTypes.addition:
        return this.execExpr(node.op1) + this.execExpr(node.op2);

      case nodeTypes.subtraction:
        return this.execExpr(node.op1) - this.execExpr(node.op2);

      case nodeTypes.functionCall:
        if (!this.functions.hasOwnProperty(node.identifier)) {
          throw new UserError(`No function: ${node.identifier}`);
        }
        const args = node.args.map(a => this.execExpr(a));
        return this.functions[node.identifier](...args);

      case nodeTypes.comparision:
        const a = this.execExpr(node.op1);
        const b = this.execExpr(node.op2);
        switch (node.operator) {
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
        return this.getCellsByRange(node.cell1.identifier, node.cell2.identifier).map((x) => x.value);

      default:
        throw Error(`Not handled node type ${node.type}`);

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
