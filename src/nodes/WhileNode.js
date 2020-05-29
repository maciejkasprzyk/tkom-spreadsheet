import {BaseNode} from "./BaseNode";

export class WhileNode extends BaseNode {
  constructor(condition, block, token) {
    super(token);
    this.condition = condition;
    this.block = block;
  }

  exec(env) {
    while (this.condition.exec(env)) {
      for (const line of this.block) {
        line.exec(env);
      }
    }
  }
}
