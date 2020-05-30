import {UserError} from "./parser/errors";

/**
 * It returns strings like this: "A", "B", ... , "Z", "AA", "AB", ...
 */
export function* letterLabelGenerator() {
  function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
  }

  const label = ['A'];
  while (true) {
    yield label.slice().reverse().join("");
    let index = 0;
    label[index] = nextChar(label[index]);
    while (label[index].charCodeAt(0) > 'Z'.charCodeAt(0)) {
      label[index] = 'A';
      index++;
      if (index >= label.length) {
        label.push('A');
        break;
      }
      label[index] = nextChar(label[index]);
    }
  }
}


export function topologicalSort(startVariable) {
  let visited = [];
  let sorted = [];
  dfs(startVariable);

  function dfs(variable) {
    if (sorted.includes(variable)) {
      return;
    }
    if (visited.includes(variable)) {
      throw new UserError("Cycle");
    }
    visited.push(variable);
    for (const neighbour of variable.observers) {
      dfs(neighbour)
    }
    sorted.push(variable);
  }

  return sorted.reverse().slice(1);
}

export function isFormula(x) {
  return x.charAt(0) === '=';
}

function divideIntoLettersAndNumber(cellIdentifier) {
  const regex = /([a-zA-Z]+)([0-9]+)/;
  const match = regex.exec(cellIdentifier);

  return [match[1], match[2]];
}

export function getCellIndexes(cellIdentifier) {
  const [letters, digits] = divideIntoLettersAndNumber(cellIdentifier);

  const y_index = parseInt(digits) - 1;

  let x_index = -1;
  for (let i = 0; i < letters.length; i++) {
    x_index += 1
    x_index *= ("Z".charCodeAt(0) - 'A'.charCodeAt(0) + 1);
    x_index += letters[i].charCodeAt(0) - "A".charCodeAt(0);
  }
  return {x: x_index, y: y_index}
}

export function errorInfoExecDecorator(target, name, descriptor) {
  const original = descriptor.value;
  if (typeof original === 'function') {
    descriptor.value = function (...args) {
      try {
        return original.apply(this, args)
      } catch (e) {
        if (e.name === "UserError") {
          e.message = 'Execution error at line ' + this.line + ' col ' + this.col + ':\n' + e.message;
          throw e;
        } else {
          throw e;
        }
      }
    }
  }
  return descriptor
}
