import {observable} from "mobx";

export class Cell {

  @observable formula = null;
  @observable value = null;
  @observable background = null;
  @observable error = null;

  ast = null;
  // vars that observe us -> we are used in their formula
  observers = [];
  // vars that we observe for changes -> we use them in our formula
  subjects = [];

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

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
