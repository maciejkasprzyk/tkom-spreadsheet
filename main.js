const nearley = require("nearley");
const grammar = require("./src/grammar.js");

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

try {
  parser.feed("(1+2+3+4+5)/3");

} catch (e) {
  console.log(e.message);
  throw e;
}


console.log(parser.results);
