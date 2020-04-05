import {observable} from "mobx";
import {Parser} from "../interpreter/parser";
import {nodeTypes} from "../interpreter/nodeTypes";
import {findLabelsReferenced} from "../interpreter/lexer";

class Variable {

  @observable formula = null;
  @observable value = null;
  @observable error = null;

  ast = null;

  // cells that observe us -> we are used in their formula
  observers = [];
  // cells that we observe for changes -> we use them in our formula
  subjects = [];

  unregisterFromAllSubjects() {
    for (const cell of this.subjects) {
      cell._unregisterObserver(this);
    }
    this.subjects = [];
  }

  observe(cell) {
    cell.observers.push(this);
    this.subjects.push(cell);
  }

  _unregisterObserver(v) {
    const index = this.observers.indexOf(v);
    if (index === this.observers.length - 1) {
      this.observers.pop();
    } else {
      this.observers[index] = this.observers.pop();
    }
  }
}

class Cell extends Variable {

  constructor(x, y, manager) {
    super();
    this.x = x;
    this.y = y;
    this.manager = manager;
  }

  set(str) {
    this.manager.set(this, str)
  }
}


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

  getVarByName(name) {
    // todo if not a cell look for variable
    return this.getCellByLabel(name)
  }

  /**
   * @param cellLabel For example: A2, AB13, C13 etc as string
   */
  getCellByLabel(cellLabel) {
    cellLabel = cellLabel.toUpperCase();
    let index = 0;
    while (index < cellLabel.length && isUpperLetter(cellLabel[index])) {
      index++;
    }
    const letters = cellLabel.substring(0, index);
    const digits = cellLabel.substring(index);

    if (letters.length === 0 || digits.length === 0) {
      throw Error(`Incorrect label: ${cellLabel}`)

    }

    const y_index = parseInt(digits) - 1;

    let x_index = 0;
    for (let i = 0; i < letters.length; i++) {
      x_index *= ("Z".charCodeAt(0) - 'A'.charCodeAt(0) + 1);
      x_index += letters[i].charCodeAt(0) - "A".charCodeAt(0);
    }

    if (this.x <= x_index || this.y <= y_index) {
      throw Error(`No cell: ${cellLabel}`)
    }
    return this.cells[y_index][x_index];
  }

  set(variable, string) {
    variable.unregisterFromAllSubjects();
    try {

      if (isFormula(string)) {

        variable.formula = string;
        const parser = new Parser();
        parser.feed(variable.formula.substring(1));
        variable.ast = parser.results;
        this.updateVariable(variable);

        // todo manage ranges
        for (const label of findLabelsReferenced(variable.formula.substring(1))) {
          variable.observe(this.getVarByName(label));
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
      variable.error = e.message;
    }
  }


  updateVariable(variable) {
    // todo exec this.ast
    variable.value = this.execute(variable.ast);
  }


  execute(x) {
    // its a primitive
    if (!x.type) {
      return x;
    }

    switch (x.type) {
      case nodeTypes.multiplication:
        return this.execute(x.op1) * this.execute(x.op2);

      case nodeTypes.division:
        return this.execute(x.op1) / this.execute(x.op2);

      case nodeTypes.addition:
        return this.execute(x.op1) + this.execute(x.op2);

      case nodeTypes.subtraction:
        return this.execute(x.op1) - this.execute(x.op2);

      case nodeTypes.functionCall:
        if (!this.functions.hasOwnProperty(x.identifier)) {
          throw Error(`No function ${x.identifier}`);
        }
        let argsList = [];
        if (x.args.type === nodeTypes.list) {
          for (const arg of x.args) {
            argsList.push(this.getVarByName(arg).value)
          }
        } else if (x.args.type === nodeTypes.range) {
          argsList = this.getValuesByRange(x.args.identifier1, x.args.identifier2);
        }
        return this.functions[x.identifier](argsList);

      case nodeTypes.variable:
        return this.getVarByName(x.identifier).value;


      default:
        throw Error("Not handled node type");

    }
  }
}


// helper functions

function topologicalSort(startVariable) {
  let visited = [];
  let sorted = [];
  dfs(startVariable);

  function dfs(variable) {
    if (sorted.includes(variable)) {
      return;
    }
    if (visited.includes(variable)) {
      throw Error("cycle");
    }
    visited.push(variable);
    for (const neighbour of variable.observers) {
      dfs(neighbour)
    }
    sorted.push(variable);
  }
  return sorted.reverse().slice(1);
}

function isFormula(x) {
  return x.charAt(0) === '=';
}

function isUpperLetter(x) {
  return 'A'.charCodeAt(0) <= x.charCodeAt(0) && x.charCodeAt(0) <= 'Z'.charCodeAt(0);
}
