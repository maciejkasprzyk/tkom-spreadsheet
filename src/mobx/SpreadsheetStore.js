import {observable} from "mobx";

export class SpreadsheetStore {
  cells = [];

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.cells = Array(y);
    for (let i = 0; i < y; i++) {
      this.cells[i] = Array(x);
      for (let j = 0; j < x; j++) {
        this.cells[i][j] = new Cell(this, i, j);
      }
    }
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
}


export class Cell {

  @observable formula = null;
  @observable value = null;
  @observable error = null;

  constructor(sheet, x, y) {
    this.sheet = sheet;
    this.x = x;
    this.y = y;
  }

  // cells that observe ass -> we are used in their formula
  observers = [];
  // cells that we observe for changes -> we use them in our formula
  // this is needed to remove us from their observer list when we change formula
  // could avoid this list by parsing old formula for cell one more time
  // dunno which is better
  subjects = [];

  set(string) {
    this.unregisterFromAllSubjects();
    try {
      if (isFormula(string)) {
        // todo parse for every reference here
        this.formula = string;
        // noinspection JSUnresolvedFunction
        const cellsReferenced = [this.sheet.getCellByLabel(this.formula.substring(1))];
        this.calculateValue();
        for (const cell of cellsReferenced) {
          this.observe(cell);
        }
      } else {
        this.value = string;
        this.formula = null;
      }

      const x = this.topologicalSort();
      for (const cell of x) {
        cell.calculateValue();
      }
      this.error = null;
    } catch (e) {
      this.error = e.message;
    }


  }

  unregisterFromAllSubjects() {
    for (const cell of this.subjects) {
      cell.unregisterObserver(this);
    }
    this.subjects = [];
  }

  observe(cell) {
    cell.registerObserver(this);
    this.subjects.push(cell);
  }

  topologicalSort() {
    let visited = [];
    let sorted = [];
    dfs(this);

    function dfs(cell) {
      if (sorted.includes(cell)) {
        return;
      }
      if (visited.includes(cell)) {
        throw Error("cycle");
      }
      visited.push(cell);
      for (const neighbour of cell.observers) {
        dfs(neighbour)
      }
      sorted.push(cell);
    }

    return sorted.reverse().slice(1);
  }

  registerObserver(cell) {
    this.observers.push(cell);
  }

  unregisterObserver(cell) {
    const index = this.observers.indexOf(cell);
    if (index === this.observers.length - 1) {
      this.observers.pop();
    } else {
      this.observers[index] = this.observers.pop();
    }
  }

  calculateValue() {
    // todo add parser here
    // noinspection JSUnresolvedFunction
    let cellReferenced = this.sheet.getCellByLabel(this.formula.substring(1));
    this.value = cellReferenced.value;
  }

}

// helper functions

function isFormula(x) {
  return x.charAt(0) === '=';
}

function isUpperLetter(x) {
  return 'A'.charCodeAt(0) <= x.charCodeAt(0) && x.charCodeAt(0) <= 'Z'.charCodeAt(0);
}
