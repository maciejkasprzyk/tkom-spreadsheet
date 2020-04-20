@include "./formulaGrammar.ne"

entry ->
    code

code ->
    statement (%end statement):*               {% p.list %}

statement ->
    expr                                       {% id %}
  | assigment                                  {% id %}
  | blockStart                                 {% id %}
  | null                                       {% null %}

blockStart ->
    %kwWhile expr %end block                   {% p.whileLoop %}
  | %kwIf expr %end block (else):?             {% p.ifElse %}

else ->
    %kwElse %end block                         {% p.elseBlock %}

assigment ->
    expr %assign expr                          {% p.assigment %}

block ->
    %indent code %dedent (%end):?              {% p.block %}

