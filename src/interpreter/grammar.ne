@preprocessor esmodule
@lexer lexer

@{%
  /* eslint-disable */
  import * as p from './parserPostProcessors.js'
  import {lexer} from './lexer.js'
%}

# note: % references a token from lexer

entry ->
    expr

expr -> comparison                           {% id %}

comparison ->
    sum                                      {% id %}
  | sum %compOperator sum                    {% p.comparison %}

sum ->
    product                                  {% id %}
  | sum %plus product                        {% p.addition %}
  | sum %minus product                       {% p.subtraction %}

product ->
    primary                                  {% id %}
  | product %asterisk primary                {% p.multiplication %}
  | product %slash primary                   {% p.division %}

primary ->
    %lparen expr %rparen                     {% p.return1 %}
  | %number                                  {% p.token %}
  | %minus %number                           {% p.negative %}
  | cell_ref                                 {% id %}
  | function_call                            {% id %}
  | condition                                {% id %}

cell_ref ->
  %identifier                                {% p.variable %}

function_call ->
  %identifier %lparen args %rparen           {% p.functionCall %}

args ->
    range                                    {% id %}
  | list                                     {% p.list %}

range ->
  cell_ref %colon cell_ref                   {% p.range %}

list ->
  cell_ref (%semicolon cell_ref):*           {% p.listAdd %}

condition ->
  %kwIf %lparen expr %semicolon expr %semicolon expr %rparen
                                             {% p.ifCondition %}
