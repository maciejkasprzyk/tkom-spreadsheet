import {BaseNode} from "./BaseNode";

export class DynamicCellNode extends BaseNode {

  constructor(x,y) {
    super();
    this.x = x;
    this.y = y;
  }

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
