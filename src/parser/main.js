// this file is for testing from nodejs only

const Parser = require('./parser').Parser;
const moo = require("moo");
const tokens = require('./tokens.js');

const s = "3*3/3";

const lexer = moo.states(tokens);
lexer.reset(s);

for (let token of lexer) {
  console.log(token)
}

const parser = new Parser();

parser.feed(s);

console.log(parser.results);
