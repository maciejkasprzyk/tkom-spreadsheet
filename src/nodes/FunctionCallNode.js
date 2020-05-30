import {UserError} from "../parser/errors";
import {BaseNode} from "./BaseNode";

export class FunctionCallNode extends BaseNode {
  constructor(identifier, args, token) {
    super(token);
    this.identifier = identifier;
    this.args = args;
  }

  exec(env) {
    const func = env.getFunction(this.identifier);

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

    for (const b of func.block) {
      try {
        b.exec(env);
      } catch (e) {
        if (e.name === 'returnHandler') {
          return e.result;
        } else {
          throw e;
        }
      }
    }

    env.popScope();
    return undefined
  }

  unParse(env) {
    const args = [];
    for (const a of this.args) {
      args.push(a.unParse());
    }
    return this.identifier + '(' + args.join(',') + ')'
  }

  findCellsReferenced(env) {
    let cells = []
    for (let a of this.args) {
      cells = cells.concat(a.findCellsReferenced(env));
    }
    return cells;
  }
}
