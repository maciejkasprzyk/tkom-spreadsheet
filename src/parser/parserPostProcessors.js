import {nodeTypes} from './nodeTypes.js';


export function addition([a, _, b]) {
  return {
    op1: a,
    op2: b,
    type: nodeTypes.addition
  };
}

export function subtraction([a, _, b]) {
  return {
    op1: a,
    op2: b,
    type: nodeTypes.subtraction
  };
}

export function multiplication([a, _, b]) {
  return {
    op1: a,
    op2: b,
    type: nodeTypes.multiplication
  };
}

export function division([a, _, b]) {
  return {
    op1: a,
    op2: b,
    type: nodeTypes.division
  };
}

export function return1(data) {
  return data[1];
}

export function token([t]) {
  return t.value;
}

export function negative([_, number]) {
  return -number.value;
}

export function functionCall([identifier, _, args]) {
  return {
    identifier: identifier.value,
    args: args,
    type: nodeTypes.functionCall
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
    cell1: cell1,
    cell2: cell2,
    type: nodeTypes.range,
  };
}

export function argsAdd([primary, list]) {
  const result = [primary];

  for (const el of list) {
    //el[0] is semicolon
    //el[1] is cell_ref
    result.push(el[1]);
  }
  return result;
}

export function comparison([a, operator, b]) {
  return {
    op1: a,
    op2: b,
    operator: operator.value,
    type: nodeTypes.comparision
  }
}

