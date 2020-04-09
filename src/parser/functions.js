function sum(list) {
  return list.reduce((a, b) => a + b, 0);
}

function avg(list) {
  return sum(list) / sum.length;
}


export const functions = {
  "sum": sum,
  "avg": avg,
};
