@include "./formulaGrammar.ne"

entry ->
    code

code ->
    statement (%end statement):*                        {% p.list %}

statement ->
    expr                                                {% id %}
  | assigment                                           {% id %}
  | blockStart                                          {% id %}
  | null                                                {% null %}

blockStart ->
    %kwWhile expr %end block                            {% p.whileLoop %}
  | %kwIf expr %end block (else):?                      {% p.ifElse %}
  | %kwDef %identifier %lparen args %rparen %end block  {% p.functionDef %}


else ->
    %kwElse %end block                                  {% p.elseBlock %}

# todo
assigment ->
    expr %assign expr                                   {% p.assigment %}

block ->
    %indent code %dedent (%end):?                       {% p.block %}

