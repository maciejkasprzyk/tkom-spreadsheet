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

