@preprocessor esmodule
@lexer lexer

@{%
  /* eslint-disable */
  import * as p from './parserPostProcessors.js'
  import {lexer} from './lexer.js'
%}

# note: % references a token from lexer

formulaEntry ->
    sum

expr -> comparison                           {% id %}

comparison ->
    sum                                      {% id %}
  | sum %equal sum                           {% p.equal %}
  | sum %greaterEqual sum                    {% p.greaterEqual %}
  | sum %lessEqual sum                       {% p.lessEqual %}
  | sum %less sum                            {% p.less %}
  | sum %greater sum                         {% p.greater %}
  | sum %notEqual sum                        {% p.notEqual %}

sum ->
    product                                  {% id %}
  | sum %plus product                        {% p.addition %}
  | sum %minus product                       {% p.subtraction %}

product ->
    primary                                  {% id %}
  | product %asterisk primary                {% p.multiplication %}
  | product %slash primary                   {% p.division %}

primary ->
    %lparen expr %rparen                     {% (data) => data[1] %}
  | %number                                  {% p.number %}
  | variable                                 {% id %}
  | function_call                            {% id %}
  | range                                    {% id %}
  | cell                                     {% id %}
  | %minus primary                           {% p.negative %}
  | dynamicCell                              {% id %}

dynamicCell ->
  %lsquare sum %semicolon sum %rsquare       {% p.dynamicCell %}

cell -> %cell                                {% p.cell %}

variable -> %identifier                      {% p.variable %}

function_call ->
    %identifier %lparen args %rparen         {% p.functionCall %}
  | %kwIf %lparen args %rparen               {% p.functionCall %}

args ->
    expr (%semicolon expr):*                 {% p.argsList %}
  | null                                     {% p.emptyList %}

range ->
    cell %colon cell                         {% p.range %}

