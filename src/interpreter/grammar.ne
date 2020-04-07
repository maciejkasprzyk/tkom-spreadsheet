@preprocessor esmodule
@lexer lexer

@{%
  /* eslint-disable */
  import * as p from './parserPostProcessors.js'
  import {lexer} from './lexer.js'
%}

# note: % references a token from lexer

input ->
    sum

sum ->
    product                                  {% id %}
  | sum %plus product                        {% p.addition %}
  | sum %minus product                       {% p.subtraction %}

product ->
    primary                                  {% id %}
  | product %asterisk primary                {% p.multiplication %}
  | product %slash primary                   {% p.division %}

primary ->
    %lparen sum %rparen                      {% p.return1 %}
  | %number                                  {% p.token %}
  | %minus %number                           {% p.negative %}
  | cell_ref                                 {% id %}
  | function_call                            {% id %}

cell_ref ->
  %variable                                  {% p.variable %}

function_call ->
  %function_identifier args %rparen          {% p.functionCall %}

args ->
    range                                    {% id %}
  | list                                     {% p.list %}

range ->
  %variable %colon %variable                 {% p.range %}

list ->
  %variable (%semicolon %variable):*         {% p.listAdd %}


