import {BaseNode} from "./BaseNode";

export class RangeNode extends BaseNode {
  constructor(startCell, endCell, token) {
    super(token);
    this.cell1 = startCell;
    this.cell2 = endCell;
  }

  getCells(env) {
    return env.getCellsByRange(this.cell1,this.cell2);
  }

  exec(env) {
    return this;
  }

  findCellsReferenced(env) {
    return env.getCellsByRange(this.cell1, this.cell2);
  }

  unParse(env) {
    return env.getCell(this.cell1.x, this.cell1.y).label + ':' + env.getCell(this.cell2.x, this.cell2.y).label
  }
}
