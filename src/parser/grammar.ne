@{%
  /* eslint-disable */

  const moo = require("moo");
  const tokens = require('./tokens.js')

  const post = require("./parserPostProcessors.js")

  const lexer = moo.states(tokens);
  // ignore whitespaces tokens
  lexer.next = (next => () => {
      let tok;
      while ((tok = next.call(lexer)) && tok.type === "whitespace") {}
      return tok;
  })(lexer.next);

%}

@lexer lexer

# note: % references a token
# note: moo returns tokens as objects, .value to get to value

expression ->
  multi_expr
  {%
    ([a]) => {
      post.log("expression")
      post.log("a:", a);
      return a;
     }
  %}
  |expression %plus multi_expr
    {%
      ([a,_,b]) => {
        post.log("expression")
        post.log("a:", a)
        post.log("b:", b)
        return a+b;
       }
    %}
  |expression %minus multi_expr
    {%
      ([a,_,b]) => {
        post.log("expression")
        post.log("a:", a)
        post.log("b:", b)
        return a-b;
       }
    %}

multi_expr ->
  primary
    {%
      ([a]) => {
        post.log("multi_expr")
        post.log("a:", a);
        return a;
       }
    %}
  |multi_expr %asterisk primary
    {%
      ([a,_,b]) => {
        post.log("multi_expr")
        post.log("a:", a)
        post.log("b:", b)
        return a*b;
       }
    %}
  |multi_expr %slash primary
    {%
      ([a,_,b]) => {
        post.log("multi_expr")
        post.log("a:", a)
        post.log("b:", b)
        return a/b;
       }
    %}

primary ->
  %lparen expression %rparen
    {%
      (data) => { return data[1]; }
    %}
  |%number
  {%
    ([number]) => {
      post.log("number:", number.value);
      return number.value;
    }
  %}
  |cell_ref {% id %}
  |func
    {%
      ([func]) => {
        post.log("func:", func)
        return func;
      }
    %}

cell_ref ->
  %label
  {%
    ([label]) => {
      post.log("label:", label.value)
      return  post.getByLabel(label.value);
    }
  %}

func ->
  %func_call args %func_call_end
    {%
      ([func_name, args]) => {
        // todo call function smth like: global[func_name.value](...args)
        post.log("func_name:", func_name.value)
        post.log("args:", args)
        let sum = 0;
        for (const x of args){
          sum += x;
        }
        return sum;
      }
    %}

args ->
  range
    {%
      ([range]) => {
        post.log("range:", range)
        return range;
      }
    %}
  |list
    {%
      ([list]) => {
        post.log("list(args):", list)
        return list;
      }
    %}

range -> %label %colon %label
    {%
      ([label1, _, label2]) => {
        // todo get values for range label1:label2
        post.log("label1:", label1.value)
        post.log("label2:", label2.value)
        return [label1.value,":",label2.value];
      }
    %}

list ->
    %label
    {%
      ([label]) => {
        post.getByLabel(label.value)
        post.log("label(list):", label.value)
        return  [post.getByLabel(label.value)];
      }
    %}
    |%label %semicolon list
    {%
      ([label, _, list]) => {
        post.getByLabel(label.value)
        post.log("label(label ; list):", label.value)
        post.log("list(label ; list):", list)
        list.push(post.getByLabel(label.value));
        return list;
      }
    %}

