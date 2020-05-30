@include "./formulaGrammar.ne"

entry ->
    (%end):* code (%end):*                              {% (data) => [data[1]] %}

code ->
    statement (statement):*                             {% p.list %}

statement ->
    expr ends                                           {% id %}
  | reference ends                                      {% id %}
  | return ends                                         {% id %}
  | assigment ends                                      {% id %}
  | blockStatement (%end):*                             {% id %}

blockStatement ->
    %kwWhile expr ends block                            {% p.whileLoop %}
  | %kwIf expr ends block (else):?                      {% p.ifElse %}
  | %kwDef %identifier %lparen params %rparen ends block {% p.functionDef %}
  | %kwFor %identifier


else ->
    %kwElse ends block                                  {% p.elseBlock %}

assigment ->
    variable %assign expr                               {% p.assigment %}
  | cell %assign expr                                   {% p.assigment %}
  | dynamicCell %assign expr                            {% p.assigment %}

block ->
    %indent code %dedent                                {% p.block %}

ends ->
    (%end):+                                            {% null %}

reference ->
    %identifier %assign %ampersand range                {% p.reference %}
  | %identifier %assign %ampersand cell                 {% p.reference %}
  | %identifier %assign %ampersand variable             {% p.reference %}

return ->
    %kwReturn expr                                      {% p.returnNode %}

params ->
    variable (%comma variable):*                       {% p.argsList %}
  | null                                               {% p.emptyList %}
