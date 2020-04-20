import {BinaryOperationNode} from "./BinaryOperationNode";
import {UserError} from "../parser/errors";
import {VariableNode} from "./VariableNode";
import {CellNode} from "./CellNode";

export class AssignmentNode extends BinaryOperationNode {

  exec(env) {

    if (this.left instanceof VariableNode) {
      // todo create var
      env.setVariable(this.left.value, this.right.exec(env));
    }
    else if (this.left instanceof CellNode) {
      env.setCellAst(this.right);
    } else {
      throw new UserError("Assign not to variable");
    }
  }
}
