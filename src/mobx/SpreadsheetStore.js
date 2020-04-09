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
        let argsList = [];
        if (x.args.type === nodeTypes.list) {
          for (const arg of x.args.list) {
            argsList.push(this.getVarByName(arg.identifier).value)
          }
        } else if (x.args.type === nodeTypes.range) {
          argsList = this.getCellsByRange(x.args.cell1.identifier, x.args.cell2.identifier).map((x) => x.value);
        }
        return this.functions[x.identifier](argsList);
      case nodeTypes.ifCondition:
        if (this.executeFormula(x.condition) === true) {
          return this.executeFormula(x.exprTrue);
        } else {
          return this.executeFormula(x.exprFalse);
        }
      case nodeTypes.comparision:
        return x.func(this.executeFormula(x.op1), this.executeFormula(x.op2));
      default:
        throw Error("Not handled node type");
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
        if (node.type === 'list') {
          for (const variable of node.list) {
            references.push(variable.identifier)
          }
        }
        for (const property in node) {
          if (node.hasOwnProperty(property)) {
            dfs(node[property]);
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
