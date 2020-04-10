function sum(...list) {
  return list.flat().reduce((a, b) => a + b, 0);
}

function avg(...list) {
  list = list.flat();
  return sum(list) / list.length;
}

export const functions = {
  "sum": sum,
  "avg": avg,
};
