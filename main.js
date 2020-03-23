const moo = require('moo');
const nearley = require('nearley');
const grammar = require('./src/grammar.js'); // compiled from grammar.ne
const tokens = require('./src/tokens.js');
const nm = require('nearley-moo').parser(nearley, grammar);

let parser = nm(moo.compile(tokens));


// ignored tokens will not be passed to nearley
parser.ignore('whitespace');

parser.feed("2*3");

console.log(parser.results);
