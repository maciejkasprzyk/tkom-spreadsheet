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
    cellLabel.toUpperCase();
    let index = 0;
    while (index < cellLabel.length - 1 && isUpperLetter(cellLabel[index])) {
      index++;
    }
    const letters = cellLabel.substring(0, index);
    const digits = cellLabel.substring(index);

    const x_index = parseInt(digits) - 1;

    let y_index = 0;
    for (let i = 0; i < letters.length; i++) {
      y_index *= ("Z".charCodeAt(0) - 'A'.charCodeAt(0) + 1);
      y_index += letters[i].charCodeAt(0) - "A".charCodeAt(0);
    }

    return this.cells[x_index][y_index];
  }
}


export class Cell {

  @observable formula = null;
  @observable value = 0;

  constructor(sheet, x, y) {
    this.sheet = sheet;
    this.x = x;
    this.y = y;
  }

  // cells that observe ass -> we are used in their formula
  observers = new Set();
  // cells that we observe for changes -> we use them in our formula
  // this is needed to remove us from their observer list when we change formula
  // could avoid this list by parsing old formula for cell one more time
  // dunno which is better
  subjects = [];

  set(string) {
    // remove us from observers list from cells we used in old formula
    for (const cell of this.subjects) {
      cell.removeObserver(this);
    }
    // and clear our subject table
    this.subjects = [];

    if (isFormula(string)) {

      this.formula = string;
      try {
        this.calculateValue();
        // todo this code is temporary (testing only), will change when I finish parser
        let cellReferenced = this.sheet.getCellByLabel(this.formula.substring(1));

        const cellsReferenced = [];
        cellsReferenced.push(cellReferenced);

        if (cellsReferenced.includes(this)) {
          throw Error("cycle");
        }
        let visited = new Set(cellsReferenced);
        let stack = Array.from(cellsReferenced);

        while (stack.length !== 0) {
          const cell = stack.pop();

          for (let i = 0; i < cell.subjects.length; i++) {
            const neighbour = cell.subjects[i];
            if (neighbour === this) {
              throw Error("cycle");
            }
            if (!visited.has(neighbour)) {
              visited.add(neighbour);
              stack.push(neighbour);
            }
          }

        }

        // todo this code will stay the same after writing parser
        for (const cell of cellsReferenced) {
          cell.addObserver(this);
          this.subjects.push(cell);
        }

      } catch (e) {
        this.value = e.message;
        this.formula = null;
      }
    } else {
      this.value = string;
      this.formula = null;
    }
    // todo run topological sorting algorithm
    for (let cell of this.observers) {
      cell.calculateValue();
    }
  }

  addObserver(cell) {
    this.observers.add(cell);
  }

  removeObserver(cell) {
    this.observers.delete(cell);
  }

  calculateValue() {
    // todo add parser here
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
