import {FinalNode} from "./FinalNode";

export class CellNode extends FinalNode {

  constructor(token) {
    super(token);
    this.x = token.value.x;
    this.y = token.value.y;
  }

  exec(env) {
    return env.getCell(this.x, this.y).value;
  }

  findVarsReferenced(env) {
    return [env.getCell(this.x, this.y)];
  }
}
