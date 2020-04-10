@preprocessor esmodule
@lexer lexer

@{%
  /* eslint-disable */
  import * as p from './parserPostProcessors.js'
  import {lexer} from './lexer.js'
%}

# note: % references a token from lexer

formulaEntry ->
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
  | variable                                 {% id %}
  | function_call                            {% id %}
  | range                                    {% id %}


variable ->
  %identifier                                {% p.variable %}

function_call ->
  %identifier %lparen args %rparen           {% p.functionCall %}
  | %kwIf %lparen args %rparen               {% p.functionCall %}

args ->
  expr (%semicolon expr):*                   {% p.argsAdd %}

range ->
  variable %colon variable                   {% p.range %}
