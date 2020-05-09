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
import {ListNode} from "../nodes/ListNode";
import {EqualNode} from "../nodes/EqualNode";
import {GreaterEqualNode} from "../nodes/GreaterEqualNode";
import {LessEqualNode} from "../nodes/LessEqualNode";
import {LessNode} from "../nodes/LessNode";
import {GreaterNode} from "../nodes/GreaterNode";
import {NotEqualNode} from "../nodes/NotEqualNode";
import {FunctionDefNode} from "../nodes/FunctionDefNode";

export function addition([a, _, b]) {
  return new AdditionNode(a, b);
}

export function subtraction([a, _, b]) {
  return new SubtractionNode(a, b);
}

export function multiplication([a, _, b]) {
  return new MultiplicationNode(a, b);

}

export function division([a, _, b]) {
  return new DivisionNode(a, b);

}

export function return1(data) {
  return data[1];
}

export function number([token]) {
  return new NumberNode(token)
}

export function negative([_, operand]) {
  return new NegativeNode(operand);
}

export function functionCall([identifierToken, _, args]) {
  return new FunctionCallNode(identifierToken, args);
}

export function equal([a, _, b]) {
  return new EqualNode(a, b);
}

export function greaterEqual([a, _, b]) {
  return new GreaterEqualNode(a, b);
}

export function lessEqual([a, _, b]) {
  return new LessEqualNode(a, b);
}

export function less([a, _, b]) {
  return new LessNode(a, b);
}

export function greater([a, _, b]) {
  return new GreaterNode(a, b);
}

export function notEqual([a, _, b]) {
  return new NotEqualNode(a, b);
}


export function variable([identifierToken]) {
  return new VariableNode(identifierToken);
}

export function range([cell1, _, cell2]) {
  return new RangeNode(cell1, cell2);
}

export function list([first, list]) {
  const result = [first];
  for (const el of list) {
    //el[0] is semicolon
    //el[1] is cell_ref
    result.push(el[1]);
  }
  return new ListNode(result);
}

export function assigment([left, _, right]) {
  return new AssignmentNode(left, right);
}

export function block([, code]) {
  return code;
}

export function whileLoop([, expr, , block]) {
  return new WhileNode(expr, block);
}

export function ifElse([, expr, , block, elseBlock]) {
  return new ifElseNode(expr, block, elseBlock);
}

export function elseBlock([, , block]) {
  return block;
}

export function emptyList() {
  return []
}

export function cell([cell]) {
  return new CellNode(cell);
}

export function functionDef([_def, identifierToken, _lparen, args, _rparen, _end, block]) {
  return new FunctionDefNode(identifierToken, args, block)
}
