import {BaseNode} from "./BaseNode";
import {errorInfoExecDecorator} from "../utils";

export class DynamicCellNode extends BaseNode {

  constructor(x,y, token) {
    super(token);
    this.x = x;
    this.y = y;
  }

  @errorInfoExecDecorator
  exec(env) {
    const x = this.x.exec(env);
    const y = this.y.exec(env);
    return env.getCell(x, y).value;
  }

  unParse(env) {
    const x = this.x.exec(env);
    const y = this.y.exec(env);
    return env.getCell(x, y).label;
  }
}
