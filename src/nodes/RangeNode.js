import {BaseNode} from "./BaseNode";

export class RangeNode extends BaseNode {
  constructor(startCell, endCell, token) {
    super(token);
    this.cell1 = startCell;
    this.cell2 = endCell;
  }

  exec(env) {
    // return env.getCellsByRange(this.cell1,this.cell2).map(x=>x.value);
  }

  findCellsReferenced(env) {
    return env.getCellsByRange(this.cell1, this.cell2);
  }

}
