@{%
  const moo = require("moo");
  const tokens = require('./tokens.js')

  const lexer = moo.compile(tokens);
%}

@lexer lexer

# note:  is like + in ebnf
# note: % references a token
# note: moo returns tokens as objects, .value to get to value

expression ->
  multi_expr
  {%
    ([a]) => {
      console.log("expression")
      console.log("a:", a);
      return a;
     }
  %}
  |expression %plus multi_expr
    {%
      ([a,_,b]) => {
        console.log("expression")
        console.log("a:", a)
        console.log("b:", b)
        return a+b;
       }
    %}

  |expression %minus multi_expr
    {%
      ([a,_,b]) => {
        console.log("expression")
        console.log("a:", a)
        console.log("b:", b)
        return a-b;
       }
    %}

multi_expr ->
  primary
    {%
      ([a]) => {
        console.log("multi_expr")
        console.log("a:", a);
        return a;
       }
    %}
  |multi_expr %asterisk primary
    {%
      ([a,_,b]) => {
        console.log("multi_expr")
        console.log("a:", a)
        console.log("b:", b)
        return a*b;
       }
    %}
  |multi_expr %slash primary
    {%
      ([a,_,b]) => {
        console.log("multi_expr")
        console.log("a:", a)
        console.log("b:", b)
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
        console.log("number:", data[0]);
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
  |%int {% (data) => {console.log("int:",data[0].value); return data[0].value; } %}
