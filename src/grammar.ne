@{%
  const moo = require("moo");
  const tokens = require('./tokens.js')

  const lexer = moo.compile(tokens);

  const debug = false;
  function log() {
    if (debug) {
      console.log(...arguments);
    }
  }

%}

@lexer lexer

# note: % references a token
# note: moo returns tokens as objects, .value to get to value

expression ->
  multi_expr
  {%
    ([a]) => {
      log("expression")
      log("a:", a);
      return a;
     }
  %}
  |expression %plus multi_expr
    {%
      ([a,_,b]) => {
        log("expression")
        log("a:", a)
        log("b:", b)
        return a+b;
       }
    %}
  |expression %minus multi_expr
    {%
      ([a,_,b]) => {
        log("expression")
        log("a:", a)
        log("b:", b)
        return a-b;
       }
    %}

multi_expr ->
  primary
    {%
      ([a]) => {
        log("multi_expr")
        log("a:", a);
        return a;
       }
    %}
  |multi_expr %asterisk primary
    {%
      ([a,_,b]) => {
        log("multi_expr")
        log("a:", a)
        log("b:", b)
        return a*b;
       }
    %}
  |multi_expr %slash primary
    {%
      ([a,_,b]) => {
        log("multi_expr")
        log("a:", a)
        log("b:", b)
        return a/b;
       }
    %}

primary ->
  %lparen expression %rparen
    {%
      (data) => { return data[1]; }
    %}
  |number
  {%
      (data) => {
        log("number:", data[0]);
        return data[0];
      }
  %}
  |cell_ref {% id %}

cell_ref ->
  %label
    {% (data) => {
      return 0;
    } %}

number ->
  %float {% id %}
  |%int {% (data) => {log("int:",data[0].value); return data[0].value; } %}
