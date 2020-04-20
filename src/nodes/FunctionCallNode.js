import {BaseNode} from "./BaseNode";
import {FunctionIdentifierNode} from "./FunctionIdentifierNode";

export class FunctionCallNode extends BaseNode {
  constructor(identifierToken, args) {
    super();
    this.identifier = new FunctionIdentifierNode(identifierToken);
    this.args = args;
  }

  exec(env) {

    // todo
    const ast = env.getFunctionAst(this.identifier);

  }
}
