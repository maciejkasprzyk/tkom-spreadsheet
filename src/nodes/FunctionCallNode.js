import {BaseNode} from "./BaseNode";
import {FunctionIdentifierNode} from "./FunctionIdentifierNode";
import {UserError} from "../parser/errors";
import {ReturnNode} from "./ReturnNode";

export class FunctionCallNode extends BaseNode {
  constructor(identifierToken, args) {
    super();
    this.identifier = new FunctionIdentifierNode(identifierToken);
    this.args = args;
  }

  exec(env) {
    const func = env.getFunction(this.identifier.value);

    if (this.args.length !== func.args.length) {
      throw new UserError(`${func.args.length} params function called with ${this.args.length} params.`);
    }

    const argsValues = [];
    for (const a of this.args) {
      argsValues.push(a.exec(env));
    }

    env.newScope();
    for (let i = 0; i < this.args.length; i++) {
      env.setVariable(func.args[i].identifier, argsValues[i]);
    }


    for (const b of func.block.list) {
      if (b instanceof ReturnNode) {
        const result = b.expr.exec(env);
        env.popScope();
        return result;
      }
      b.exec(env);
    }

    env.popScope();
    return undefined
  }

  unParse(env) {
    console.log(this.args)
    const args = [];
    for (const a of this.args.list) {
      args.push(a.unParse());
    }
    return this.identifier + '( ' + args.join(';') + ')'
  }
}
