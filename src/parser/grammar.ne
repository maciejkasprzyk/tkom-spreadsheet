@include "./formulaGrammar.ne"

entry ->
    code

code ->
    statement (%end statement):*               {% p.list %}

statement ->
    expr                                       {% p.expr %}
  | assigment                                  {% id %}
  | blockStart                                 {% id %}

blockStart ->
    %kwWhile expr %end block                   {% p.whileLoop %}
  | %kwIf expr %end block (else):?             {% p.ifElse %}

else ->
    %kwElse %end block                         {% p.elseBlock %}

assigment ->
    expr %assign expr                          {% p.assigment %}

block ->
    %indent code %dedent                       {% p.block %}
