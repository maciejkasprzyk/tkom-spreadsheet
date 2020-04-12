import {observable} from "mobx";


export class Variable {

  @observable formula = null;
  @observable value = null;

  ast = null;

  // vars that observe us -> we are used in their formula
  observers = [];
  // vars that we observe for changes -> we use them in our formula
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

export class Cell extends Variable {

  @observable background = null;
  @observable error = null;

  constructor(x, y, manager) {
    super();
    this.x = x;
    this.y = y;
    this.manager = manager;
  }


  set(str) {
    this.manager.setCell(this, str)
  }
}
