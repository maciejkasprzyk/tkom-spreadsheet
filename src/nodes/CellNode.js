import {PositionedNode} from "./PositionedNode";

export class CellNode extends PositionedNode {

  constructor(token) {
    super(token);
    this.x = token.value.x;
    this.y = token.value.y;
  }

  exec(env) {
    return env.getCell(this.x, this.y).value;
  }

  findCellsReferenced(env) {
    return [env.getCell(this.x, this.y)];
  }
}
