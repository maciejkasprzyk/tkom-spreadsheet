const nearley = require("nearley");
const grammar = require("./grammar.js");

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));


try {
  // parser.feed("(1+2+3+4+5)/3");
  parser.feed("suma(A1 :B1)");

} catch (e) {
  console.log(e.message);
  throw(e);
}




console.log(parser.results);
