import {nodeTypes} from './nodeTypes.js';

const debug = false;
export const log = debug ? (function () {
  console.log(...arguments)
}) : () => {};

export function addition([a,_,b]) {
  log("sum");
  log("a:", a);
  log("b:", b);
  return {
    op1 : a,
    op2 : b,
    type: nodeTypes.addition
  };
}

export function subtraction([a,_,b]) {
  log("sum");
  log("a:", a);
  log("b:", b);
  return {
    op1 : a,
    op2 : b,
    type: nodeTypes.subtraction
  };
}

export function multiplication([a,_,b]) {
  log("product");
  log("a:", a);
  log("b:", b);
  return {
    op1 : a,
    op2 : b,
    type: nodeTypes.multiplication
  };
}

export function division([a,_,b]) {
  log("product");
  log("a:", a);
  log("b:", b);
  return {
    op1 : a,
    op2 : b,
    type: nodeTypes.division
  };
}

export function return1(data) {
  return data[1];
}

export function token([t]) {
  log(t.type, ':', t.value);
  return t.value;
}

export function negative([_,number]) {
  log("number:", number.value);
  return -number.value;
}

export function functionCall([identifier, args]) {
  log("func_name:", identifier.value);
  log("args:", args);
  return {
    identifier : identifier.value,
    args : args,
    type: nodeTypes.functionCall
  };
}

export function variable([identifier]) {
  log("variable:", identifier.value);
  return {
    type: nodeTypes.variable,
    identifier: identifier.value,
  };
}

export function range([identifier1, _, identifier2]) {
  log("identifier1:", identifier1.value);
  log("identifier2:", identifier2.value);
  return {
    identifier1: identifier1.value,
    identifier2: identifier2.value,
    type: nodeTypes.range,
  };
}

export function list([list]) {
  return {
    list: list,
    type: nodeTypes.list,
  };
}


export function listAdd([variable, list]) {
  const result = [variable];

  for (const el of list) {
    result.push(el[1]);
  }
  console.log(result);
  return result
}

