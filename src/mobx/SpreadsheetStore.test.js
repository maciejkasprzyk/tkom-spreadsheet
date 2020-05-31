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
  store.env.setCell(0, 0, '=iif(B1==5,0,1)')
  store.env.setCell(1, 0, '=5')

  let x;
  x = store.env.getCell(0, 0).value;
  expect(x).toEqual(0);
  store.env.setCell(1, 0, '=123')

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

test('function call', () => {

  const store = new SpreadsheetStore(10, 10)
  const code = `
def suma(a,b)
    return a+b

A1 = suma(1,2)
`
  store.run(code);
  const x = store.env.getCell(0, 0).value;
  expect(x).toEqual(3);

});


test('functions', () => {

  const store = new SpreadsheetStore(10, 10)
  const code = `
def avg(a,b)
    return (a+b)/2

def sum(a,b)
    return a+b
    
def max(a,b)
    if a>b
        return a
    return b

def min(a,b)
    if a<b
        return a
    return b


A1 = avg(5,10)
A2 = sum(5,10)
A3 = max(5,10)
A4 = min(5,10)
`
  store.run(code);
  let x = store.env.getCell(0, 0).value;
  expect(x).toEqual(7.5);
  x = store.env.getCell(0, 1).value;
  expect(x).toEqual(15);
  x = store.env.getCell(0, 2).value;
  expect(x).toEqual(10);
  x = store.env.getCell(0, 3).value;
  expect(x).toEqual(5);

});


test('references', () => {

  const store = new SpreadsheetStore(10, 10)
  const code = `
cell =& A1
secondCell =& B1

cell = 5
A2 = cell
secondCell = 10
B2 = secondCell

`
  store.run(code);
  let x = store.env.getCell(0, 0).value;
  expect(x).toEqual(5);
  x = store.env.getCell(0, 1).value;
  expect(x).toEqual(5);

  x = store.env.getCell(1, 0).value;
  expect(x).toEqual(10);
  x = store.env.getCell(1, 1).value;
  expect(x).toEqual(10);

});


test('ranges', () => {

  const store = new SpreadsheetStore(10, 10)
  const code = `
i = 0
while i < 10
    [0;i] = i + 1
    i = i + 1

def suma(r)
    suma = 0
    for cell in r
        suma = suma + cell
    return suma
    
A =& A1:A10
B1 = suma(A)
`
  store.run(code);
  let x = store.env.getCell(1, 0).value;
  expect(x).toEqual(55);

});


