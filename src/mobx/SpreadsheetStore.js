import {observable} from "mobx";
import * as mathjs from 'mathjs';


function isFormula(x) {
  return x.charAt(0) === '=';
}

export class Cell {

  @observable value = null;
  @observable formula = null;

  constructor(sheet, x ,y) {
    this.sheet = sheet;
    this.i = x;
    this.j = y;
  }

  set(string) {
    if (isFormula(string)) {
      this.formula = string;
      try {
        // this.value = mathjs.evaluate(string.substring(1), {'A':5});
        this.value = this.sheet.getCellByLabel(string.substring(1)).value;
        console.log(this.value)
      }
      catch (e) {
        console.log(e);
        this.value = "error";
      }
    } else {
      this.value = string;
    }
  }
}


function isUpperLetter(x) {
  return 'A'.charCodeAt(0) <= x.charCodeAt(0) && x.charCodeAt(0) <= 'Z'.charCodeAt(0);
}

export class SpreadsheetStore {

  @observable cells = [];

  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.cells = Array(y);
    for (let i = 0; i < y; i++) {
      this.cells[i] = Array(x);
      for (let j = 0; j < x; j++) {
        this.cells[i][j] = new Cell(this,i,j);
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
