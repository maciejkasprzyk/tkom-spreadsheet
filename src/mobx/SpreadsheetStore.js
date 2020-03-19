import {observable} from "mobx";

export class Cell {
  value = null;
  expr = null;

  constructor(value) {
    this.value = value;
  }
}

export class SpreadsheetStore {

  @observable cells = [];

  constructor(x, y) {
    this.cells = Array(x);
    for (let i = 0; i < x; i++) {
      this.cells[i] = Array(y);
      for (let j = 0; j < y; j++) {
        this.cells[i][j] = new Cell(`${i}-${j}`)
      }
    }
  }


}
