import {BaseNode} from "./BaseNode";

export class RangeNode extends BaseNode {
  constructor(startCell, endCell) {
    super();
    this.cell1 = startCell;
    this.cell2 = endCell;
  }

  exec(env) {
    return env.getCellsByRange(this.cell1,this.cell2).map(x=>x.value);
  }

  findVarsReferenced(env) {
    return env.getCellsByRange(this.cell1, this.cell2);
  }

}
