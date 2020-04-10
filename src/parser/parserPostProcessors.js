import {nodeTypes} from './nodeTypes.js';

const debug = false;
export const log = debug ? (function () {
  console.log(...arguments)
}) : () => {
};

export function addition([a, _, b]) {
  log("sum");
  log("a:", a);
  log("b:", b);
  return {
    op1: a,
    op2: b,
    type: nodeTypes.addition
  };
}

export function subtraction([a, _, b]) {
  log("sum");
  log("a:", a);
  log("b:", b);
  return {
    op1: a,
    op2: b,
    type: nodeTypes.subtraction
  };
}

export function multiplication([a, _, b]) {
  log("product");
  log("a:", a);
  log("b:", b);
  return {
    op1: a,
    op2: b,
    type: nodeTypes.multiplication
  };
}

export function division([a, _, b]) {
  log("product");
  log("a:", a);
  log("b:", b);
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
  log(t.type, ':', t.value);
  return t.value;
}

export function negative([_, number]) {
  log("number:", number.value);
  return -number.value;
}

export function functionCall([identifier, _, args]) {
  log("func_name:", identifier.value);
  log("args:", args);
  return {
    identifier: identifier.value,
    args: args,
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

export function range([cell1, _, cell2]) {
  log("cell1:", cell1);
  log("cell2:", cell2);
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

export function ifCondition(data) {
  return {
    condition: data[2],
    exprTrue: data[4],
    exprFalse: data[6],
    type: nodeTypes.ifCondition
  };
}

export function comparison([a, operator, b]) {
  let func;
  switch (operator.value) {
    case '==':
      func = (a, b) => a === b;
      break;
    case '>=':
      func = (a, b) => a >= b;
      break;
    case '<=':
      func = (a, b) => a <= b;
      break;
    case '<':
      func = (a, b) => a < b;
      break;
    case '>':
      func = (a, b) => a > b;
      break;
    case '!=':
      func = (a, b) => a !== b;
      break;
    default:
      throw Error("Unknown comparison operator");
  }
  return {
    op1: a,
    op2: b,
    func: func,
    type: nodeTypes.comparision
  }
}
