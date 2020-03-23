@{%
  const moo = require("moo");
  const tokens = require('./tokens.js')

  const lexer = moo.compile(tokens);
%}

@lexer lexer

# note: :+ is like + in ebnf
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
  |multi_expr (%plus multi_expr {% (data)=>{console.log("data:",data[1]) ;return data[1];} %}):+
    {%
      ([a,rest]) => {
        console.log("expression")
        console.log("a:", a)
        console.log("rest:", rest)
        for(const x of rest){
          a+=x;
        }
        return a;
       }
    %}

  |multi_expr (%minus multi_expr {% (data)=>{console.log("data:",data[1]) ;return data[1];} %}):+
    {%
      ([a,rest]) => {
        console.log("expression")
        console.log("a:", a)
        console.log("rest:", rest)
        for(const x of rest){
          a-=x;
        }
        return a;
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
  |primary (%asterisk primary {% (data)=>{console.log("data:",data[1]) ;return data[1];} %}):+
    {%
      ([a,rest]) => {
        console.log("multi_expr")
        console.log("a:", a)
        console.log("rest:", rest)
        for(const x of rest){
          a*=x;
        }
        return a;
       }
    %}
  |primary (%slash primary {% (data)=>{console.log("data:",data[1]) ;return data[1];} %}):+
    {%
      ([a,rest]) => {
        console.log("multi_expr")
        console.log("a:", a)
        console.log("rest:", rest)
        for(const x of rest){
          a/=x;
        }
        return a;
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
