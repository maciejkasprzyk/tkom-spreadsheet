import {UserError} from "../parser/errors";

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

