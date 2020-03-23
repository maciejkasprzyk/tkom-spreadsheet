@{%
  const moo = require("moo");
  const tokens = require('./tokens.js')

  const lexer = moo.states(tokens);

  const debug = true;
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
  {%
    ([label]) => {
      // todo get value for label
      log("label:", label.value)
      return 1;
    }
  %}

number ->
  %float {% id %}
  |%int
    {%
      (data) => {
        log("int:",data[0].value);
        return data[0].value;
      }
    %}
  |func
    {%
      ([func]) => {
        log("func:", func)
        return func;
      }
    %}

func ->
  %func_call args %func_call_end
    {%
      ([func_name, args]) => {
        // todo call function smth like: global[func_name.value](...args)
        log("func_name:", func_name.value)
        log("args:", args)
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
        log("range:", range)
        return range;
      }
    %}
  |list
    {%
      ([list]) => {
        log("list(args):", list)
        return list;
      }
    %}

range -> %label %colon %label
    {%
      ([label1, _, label2]) => {
        // todo get values for range label1:label2
        log("label1:", label1.value)
        log("label2:", label2.value)
        return [label1.value,":",label2.value];
      }
    %}

list ->
    %label
    {%
      ([label]) => {
        // todo get value for label
        log("label(list):", label.value)
        return [label.value];
      }
    %}
    |%label %semicolon list
    {%
      ([label, _, list]) => {
        // todo get values for label
        log("label(label ; list):", label.value)
        log("list(label ; list):", list)
        list.push(label.value);
        return list;
      }
    %}

