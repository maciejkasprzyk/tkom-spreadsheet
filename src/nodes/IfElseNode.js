import {BaseNode} from "./BaseNode";

export class ifElseNode extends BaseNode {
  constructor(condition, block, elseBlock, token) {
    super(token);
    this.condition = condition;
    this.block = block;
    this.elseBlock = elseBlock;
  }

  exec(env) {
    debugger
    if (this.condition.exec(env)) {
      for (const line of this.block) {
        line.exec(env);
      }
    } else {
      if (this.elseBlock !== null) {
        for (const line of this.elseBlock) {
          line.exec(env);
        }
      }
    }
  }
}
