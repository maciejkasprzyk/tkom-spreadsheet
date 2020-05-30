import {getCellIndexes, letterLabelGenerator} from "./utils";

test('parsing labels', () => {

  const rowLabelsGen = letterLabelGenerator();
  for (let i = 0; i < 1000; i++) {
    const label = rowLabelsGen.next().value;
    const x = getCellIndexes(label + '1').x;
    expect(x).toEqual(i);
  }
});
