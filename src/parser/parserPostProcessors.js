import {AdditionNode} from "../nodes/AdditionNode";
import {SubtractionNode} from "../nodes/SubtractionNode";
import {MultiplicationNode} from "../nodes/MultiplicationNode";
import {DivisionNode} from "../nodes/DivisionNode";
import {NumberNode} from "../nodes/NumberNode";
import {NegativeNode} from "../nodes/NegativeNode";
import {FunctionCallNode} from "../nodes/FunctionCallNode";
import {VariableNode} from "../nodes/VariableNode";
import {RangeNode} from "../nodes/RangeNode";
import {AssignmentNode} from "../nodes/AssignmentNode";
import {WhileNode} from "../nodes/WhileNode";
import {ifElseNode} from "../nodes/IfElseNode";
import {CellNode} from "../nodes/CellNode";
import {EqualNode} from "../nodes/EqualNode";
import {GreaterEqualNode} from "../nodes/GreaterEqualNode";
import {LessEqualNode} from "../nodes/LessEqualNode";
import {LessNode} from "../nodes/LessNode";
import {GreaterNode} from "../nodes/GreaterNode";
import {NotEqualNode} from "../nodes/NotEqualNode";
import {FunctionDefNode} from "../nodes/FunctionDefNode";
import {DynamicCellNode} from "../nodes/DynamicCellNode";
import {ReferenceNode} from "../nodes/ReferenceNode";
import {ReturnNode} from "../nodes/ReturnNode";

export function addition([a, token, b]) {
  return new AdditionNode(a, b, token);
}

export function subtraction([a, token, b]) {
  return new SubtractionNode(a, b, token);
}

export function multiplication([a, token, b]) {
  return new MultiplicationNode(a, b, token);

}

export function division([a, token, b]) {
  return new DivisionNode(a, b, token);

}

export function number([token]) {
  return new NumberNode(token)
}

export function negative([token, operand]) {
  return new NegativeNode(operand, token);
}

export function functionCall([token, _, args]) {
  return new FunctionCallNode(token.value, args, token);
}

export function equal([a, token, b]) {
  return new EqualNode(a, b, token);
}

export function greaterEqual([a, token, b]) {
  return new GreaterEqualNode(a, b, token);
}

export function lessEqual([a, token, b]) {
  return new LessEqualNode(a, b, token);
}

export function less([a, token, b]) {
  return new LessNode(a, b, token);
}

export function greater([a, token, b]) {
  return new GreaterNode(a, b, token);
}

export function notEqual([a, token, b]) {
  return new NotEqualNode(a, b, token);
}


export function variable([token]) {
  return new VariableNode(token.value, token);
}

export function range([cell1, token, cell2]) {
  return new RangeNode(cell1, cell2, token);
}

export function list([first, list]) {
  const result = [first];
  for (const el of list) {
    result.push(el[0]);
  }
  return result;
}

export function assigment([left, token, right]) {
  return new AssignmentNode(left, right, token);
}

export function block([, code]) {
  return code;
}

export function whileLoop([token, expr, , block]) {
  return new WhileNode(expr, block, token);
}

export function ifElse([token, expr, , block, elseBlock]) {
  if (elseBlock !== null) {
    elseBlock = elseBlock[0];
  }
  return new ifElseNode(expr, block, elseBlock, token);
}

export function elseBlock([, , block]) {
  return block;
}

export function emptyList() {
  return []
}

export function cell([token]) {
  return new CellNode(token.value.x, token.value.y, token);
}

export function functionDef([_def, token, _lparen, args, _rparen, _end, block]) {
  return new FunctionDefNode(token.value, args, block, token)
}

export function dynamicCell([_lsquare, x, _semicolon, y, token]) {
  return new DynamicCellNode(x, y, token);
}

export function reference([identifier, _assign, token, referenced]) {
  return new ReferenceNode(identifier, referenced, token);
}

export function returnNode([token, expr]) {
  return new ReturnNode(expr,token)
}

export function argsList([first, list]) {
  const result = [first];
  for (const el of list) {
    result.push(el[1]);
  }
  return result;
}
