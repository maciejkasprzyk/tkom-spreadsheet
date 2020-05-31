import {UserError} from "../parser/errors";

export class BaseNode {
  constructor({value,type,text,offset,line,col}) {
    this.value = value;
    this.type = type;
    this.text = text;
    this.offset  = offset
    this.line = line;
    this.col = col;
  }

  findCellsReferenced(env) {
    let cells = []
    for (let property in this) {
      if (this[property] instanceof BaseNode) {
        cells = cells.concat(this[property].findCellsReferenced(env));
      }
    }
    return cells;
  }


  unParse(env) {
    return this.text;
  }

  exec(env) {
    throw new UserError("Executing non executable")
  }
}
