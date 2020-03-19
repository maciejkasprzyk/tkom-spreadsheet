import {observable} from "mobx";
import * as mathjs from 'mathjs';


function isFormula(x) {
  return x.charAt(0) === '=';
}

export class Cell {

  @observable value = null;
  @observable formula = null;

  constructor(sheet, i ,j) {
    // this.sheet = sheet;
    // this.i = i;
    // this.j = j;
  }

  set(string) {
    if (isFormula(string)) {
      this.formula = string;
      try {
        this.value = mathjs.evaluate(string.substring(1), {'A':5});
      }
      catch (e) {
        this.value = "error";
      }
    } else {
      this.value = string;
    }
  }
}

export class SpreadsheetStore {

  @observable cells = [];

  constructor(x, y) {
    this.cells = Array(x);
    for (let i = 0; i < x; i++) {
      this.cells[i] = Array(y);
      for (let j = 0; j < y; j++) {
        this.cells[i][j] = new Cell();
      }
    }
  }

}
