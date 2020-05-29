import {BaseNode} from "./BaseNode";
import {errorInfoExecDecorator} from "../utils";

export class CellNode extends BaseNode {

  constructor(x,y,token) {
    super(token);
    this.x = x;
    this.y = y;
  }

  @errorInfoExecDecorator
  exec(env) {
    return env.getCell(this.x, this.y).value;
  }

  findCellsReferenced(env) {
    return [env.getCell(this.x, this.y)];
  }
}
