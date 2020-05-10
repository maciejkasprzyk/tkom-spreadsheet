import {BaseNode} from "./BaseNode";

export class WhileNode extends BaseNode {
  constructor(condition, block) {
    super();
    this.condition = condition;
    this.block = block;
  }

  exec(env) {
    while (this.condition.exec(env)) {
      this.block.exec(env);
    }
  }
}
