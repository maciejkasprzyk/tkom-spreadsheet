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

test('iif', () => {

  const store = new SpreadsheetStore(10, 10)
  const code = `
def iif(a,b,c)
    if a
        return b
    else 
        return c
`
  store.run(code);
  store.env.setCell(0,0,'=iif(B1==5,0,1)')
  store.env.setCell(1,0,'=5')

  let x;
  x = store.env.getCell(0, 0).value;
  expect(x).toEqual(0);
  store.env.setCell(1,0,'=123')

  x = store.env.getCell(0, 0).value;
  expect(x).toEqual(1);


});

test('variable', () => {

  const store = new SpreadsheetStore(10, 10)
  const code = "a = 5\n"
  store.run(code);

  const x = store.env.getVarByName("a").value;
  expect(x).toEqual(5);

});
