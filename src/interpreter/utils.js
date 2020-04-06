import {UserError} from "./userError";

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

export function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

export function divideIntoLettersAndNumber(name) {
  let index = 0;
  while (index < name.length && isLetter(name[index])) {
    index++;
  }
  const letters = name.substring(0, index);
  const digits = name.substring(index);

  if (letters.length === 0 || digits.length === 0) {
    throw new UserError(`Incorrect name: ${name}`)
  }

  return [letters, digits];
}

export function getCellIndexes(name) {

  const [letters, digits] = divideIntoLettersAndNumber(name);

  const y_index = parseInt(digits) - 1;

  let x_index = 0;
  for (let i = 0; i < letters.length; i++) {
    x_index *= ("Z".charCodeAt(0) - 'A'.charCodeAt(0) + 1);
    x_index += letters[i].charCodeAt(0) - "A".charCodeAt(0);
  }
  return [x_index, y_index];
}
