import {BinaryOperationNode} from "./BinaryOperationNode";
import {UserError} from "../parser/errors";
import {VariableNode} from "./VariableNode";
import {CellNode} from "./CellNode";
import {NumberNode} from "./NumberNode";
import {BaseNode} from "./BaseNode";
import _ from 'lodash';
import {DynamicCellNode} from "./DynamicCellNode";
import {errorInfoExecDecorator} from "../utils";

export class AssignmentNode extends BinaryOperationNode {

  @errorInfoExecDecorator
  exec(env) {

    let left = this.left
    // check if this left is an reference
    if (left instanceof VariableNode) {
      // if reference get referenced value
      const x = env.getReference(left.identifier);
      if (x !== undefined) {
        left = x
      }
    }
    if (left instanceof VariableNode) {
      env.setVariable(left.value, this.right.exec(env));
    } else if (left instanceof CellNode || left instanceof DynamicCellNode) {
      let x, y;
      if (left instanceof CellNode) {
        x = left.x;
        y = left.y;
      } else {
        x = left.x.exec(env);
        y = left.y.exec(env);
      }

      let ast = _.cloneDeep(this.right);

      // hack wrapper to stay DRY
      const wrapper = {ast: ast};
      replaceVariablesWithConstants(wrapper, env);
      ast = wrapper.ast;
      const formula = "=" + ast.unParse(env);

      env.setCell(x, y, formula);

    } else {
      throw new UserError("Assign not to variable");
    }
  }
}

function replaceVariablesWithConstants(ast, env) {
  for (let property in ast) {
    if (ast[property] instanceof VariableNode) {
        const x = env.getReference(ast[property].identifier);
        if (x !== undefined) {
          ast[property] = x;
        }
      }
      if (ast[property] instanceof VariableNode) {
        const varValue = ast[property].exec(env);
        ast[property] = new NumberNode({value: varValue, text:varValue.toString()});
      } else if (ast[property] instanceof BaseNode) {
        replaceVariablesWithConstants(ast[property], env);
      }

  }
}
