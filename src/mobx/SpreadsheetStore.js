import {FormulaParser} from "../parser/parsers";
import {nodeTypes} from "../parser/nodeTypes";
import {UserError} from "../parser/errors";
import {Cell} from "./variables";
import {getCellIndexes, isFormula, topologicalSort} from "./utils";


export class SpreadsheetStore {
  cells = [];

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

  set(variable, string) {
    variable.unregisterFromAllSubjects();
    try {

      if (isFormula(string)) {

        variable.formula = string;
        const parser = new FormulaParser();
        parser.feed(variable.formula.substring(1));

        variable.ast = parser.results;
        this.updateVariable(variable);

        for (const v of this.findVarsReferenced(variable.ast)) {
          variable.observe(v);
        }
      } else {
        const x = parseFloat(string);
        if (!isNaN(x)) {
          variable.value = x;
        } else {
          variable.value = string;
        }
        variable.formula = null;
      }

      for (const x of topologicalSort(variable)) {
        this.updateVariable(x);
      }
      variable.error = null;
    } catch (e) {

      if (e.name !== "UserError") {
        throw e;
      }
      variable.error = e.message;
    }
  }


  updateVariable(variable) {
    variable.value = this.executeFormula(variable.ast);
  }

  executeFormula(x) {
    // its a primitive
    if (!x.type) {
      return x;
    }

    switch (x.type) {
      case nodeTypes.variable:
        return this.getVarByName(x.identifier).value;

      case nodeTypes.multiplication:
        return this.executeFormula(x.op1) * this.executeFormula(x.op2);

      case nodeTypes.division:
        return this.executeFormula(x.op1) / this.executeFormula(x.op2);

      case nodeTypes.addition:
        return this.executeFormula(x.op1) + this.executeFormula(x.op2);

      case nodeTypes.subtraction:
        return this.executeFormula(x.op1) - this.executeFormula(x.op2);

      case nodeTypes.functionCall:
        if (!this.functions.hasOwnProperty(x.identifier)) {
          throw new UserError(`No function: ${x.identifier}`);
        }
        const args = x.args.map(a => this.executeFormula(a));
        return this.functions[x.identifier](...args);

      case nodeTypes.comparision:
        const a = this.executeFormula(x.op1);
        const b = this.executeFormula(x.op2);
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

  getVarByName(identifier) {
    // todo if not a cell look for variable
    return this.getCellByName(identifier)
  }

  /**
   * @param identifier For example: A2, AB13, C13 etc as string
   */
  getCellByName(identifier) {
    const [x_index, y_index] = getCellIndexes(identifier);

    if (this.x <= x_index || this.y <= y_index) {
      throw new UserError(`No cell: ${identifier}`)
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
