import {BaseNode} from "./BaseNode";
import {VariableNode} from "./VariableNode";
import {UserError} from "../parser/errors";
import {RangeNode} from "./RangeNode";
import {CellNode} from "./CellNode";
import {errorInfoExecDecorator} from "../utils";

export class ForNode extends BaseNode {
  constructor(variableName, range, block, token) {
    super(token);
    this.variableName = variableName;
    this.range = range;
    this.block = block;
  }

  @errorInfoExecDecorator
  exec(env) {

    let range;
    if (this.range instanceof VariableNode) {
      range = env.getReference(this.range.identifier);
    } else {
      range = this.range;
    }
    if (!(range instanceof RangeNode)) {
      throw new UserError("Iterating over non iterable");
    }

    const cells = range.getCells(env);
    for (const cell of cells) {
      env.setReference(this.variableName, new CellNode(cell.x, cell.y, {}));
      for (const line of this.block) {
        line.exec(env);
      }
    }

  }
}
