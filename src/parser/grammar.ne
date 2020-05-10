@include "./formulaGrammar.ne"

entry ->
    (%end):* code (%end):*                              {% (data) => [data[1]] %}

code ->
    statement (statement):*                             {% p.list %}

statement ->
    expr ends                                           {% id %}
  | assigment ends                                      {% id %}
  | blockStatement                                      {% id %}

blockStatement ->
    %kwWhile expr ends block                            {% p.whileLoop %}
  | %kwIf expr ends block (else):?                      {% p.ifElse %}
  | %kwDef %identifier %lparen args %rparen ends block  {% p.functionDef %}


else ->
    %kwElse ends block                                  {% p.elseBlock %}

# todo
assigment ->
    expr %assign expr                                   {% p.assigment %}

block ->
    %indent code %dedent                                {% p.block %}


ends ->
    (%end):+                                             {% null %}
