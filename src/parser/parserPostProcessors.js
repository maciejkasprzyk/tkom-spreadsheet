import {nodeTypes} from './nodeTypes.js';

export function addition([a, _, b]) {
  return {
    type: nodeTypes.addition,
    op1: a,
    op2: b,
  };
}

export function subtraction([a, _, b]) {
  return {
    type: nodeTypes.subtraction,
    op1: a,
    op2: b,
  };
}

export function multiplication([a, _, b]) {
  return {
    type: nodeTypes.multiplication,
    op1: a,
    op2: b,
  };
}

export function division([a, _, b]) {
  return {
    type: nodeTypes.division,
    op1: a,
    op2: b,
  };
}

export function return1(data) {
  return data[1];
}

export function number([number]) {
  return {
    type: nodeTypes.primary,
    value: number.value,
  }
}

export function negative([_, number]) {
  return {
    type: nodeTypes.primary,
    value: -number.value,
  }
}

export function functionCall([identifier, _, args]) {
  return {
    type: nodeTypes.functionCall,
    identifier: identifier.value,
    args: args,
  };
}

export function variable([identifier]) {
  return {
    type: nodeTypes.variable,
    identifier: identifier.value,
  };
}

export function range([cell1, _, cell2]) {
  return {
    type: nodeTypes.range,
    cell1: cell1,
    cell2: cell2,
  };
}

export function list([first, list]) {
  const result = [first];
  for (const el of list) {
    //el[0] is semicolon
    //el[1] is cell_ref
    result.push(el[1]);
  }
  return result;
}

export function comparison([a, operator, b]) {
  return {
    type: nodeTypes.comparision,
    op1: a,
    op2: b,
    operator: operator.value,
  }
}

export function expr([expr]) {
  return {
    expr: expr,
    type: nodeTypes.expr,
  }
}

export function assigment([left, _, right]) {
  return {
    type: nodeTypes.assigment,
    left: left,
    right: right,
  }
}

export function block([,code]) {
  return code;
}

export function whileLoop([,expr,, block]) {
  return {
    type: nodeTypes.whileLoop,
    condition: expr,
    block: block,
  }
}

export function ifElse([,expr,, block, elseBlock]) {
  return {
    type: nodeTypes.ifElse,
    condition: expr,
    block: block,
    elseBlock: elseBlock,
  }
}

export function elseBlock([,,block]) {
  return block;
}

export function emptyList() {
  return []
}

export function cell([cell]) {
  return {
    type: nodeTypes.cell,
    value: cell.value,
  }
}
