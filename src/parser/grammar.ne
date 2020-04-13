@include "./formulaGrammar.ne"

entry ->
    program

program ->
    statement ((%end):+ statement):*               {% p.list %}

statement ->
    expr                                       {% p.expr %}
  | assigment                                  {% id %}
  | block %end %indent program %dedent         {% id %}

assigment ->
    expr %assign expr                          {% p.assigment %}

block ->
    %kwWhile expr
