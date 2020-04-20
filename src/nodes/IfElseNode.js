import {BaseNode} from "./BaseNode";

export class ifElseNode extends BaseNode {
  constructor(condition, block, elseBlock) {
    super();
    this.condition = condition;
    this.block = block;
    this.elseBlock = elseBlock;
  }

  exec(env) {
    if (this.condition.exec(env)) {
      this.block.exec(env);
    } else {
      if (this.elseBlock !== null) {
        this.elseBlock.exec(env);
      }
    }
  }
}
