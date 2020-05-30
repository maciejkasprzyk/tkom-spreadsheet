import {SpreadsheetStore} from "./SpreadsheetStore";


test('while', () => {

  const store = new SpreadsheetStore(10, 10)
  const code = `
i = 0
while i < 5
  [0;i] = i
  i = i + 1


i = 0
while i < 5
  [1;i] = [0;i]
  i = i + 1
`
  store.run(code);


  const x = store.env.getCell(1, 1).value;
  expect(x).toEqual(1);

});

test('variable', () => {

  const store = new SpreadsheetStore(10, 10)
  const code = "a = 5\n"
  store.run(code);

  const x = store.env.getVarByName("a").value;
  expect(x).toEqual(5);

});
