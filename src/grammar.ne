@{%
  const nm = require('nearley-moo')
  const tokens = require('./tokens.js')

  nm(tokens)
%}

# note: :* is like * in ebnf
# note: % references a token
# note: moo returns tokens as objects, .value to get to value

expression ->
  multi_expr (%plus multi_expr {% data=>data[1] %}):*
    {%
      ([a,b]) => {
        if (b.length === 0) { return a; }
        return a+b;
       }
    %}

  |multi_expr (%minus multi_expr {% data=>data[1] %}):*
    {%
      ([a,b]) => {
        if (b.length === 0) { return a; }
        return a-b;
       }
    %}

multi_expr ->
  primary (%asterisk primary {% data=>data[1] %}):*
    {%
      ([a,b]) => {
        if (b.length === 0) { return a; }
        return a*b;
       }
    %}
  |primary (%slash primary {% data=>data[1] %}):*
    {%
      ([a,b]) => {
        if (b.length === 0) { return a; }
        return a/b;
       }
    %}

primary ->
  %lparen expression %rparen
    {%
      (data) => { return data[1]; }
    %}
  |number {% id %}
  |cell_ref {% id %}


cell_ref ->
  %label
    {% (data) => {
      return 0;
    } %}

number ->
  %float {% id %}
  |%int {% (data) => {console.log(data[0]); return data[0].value; } %}
