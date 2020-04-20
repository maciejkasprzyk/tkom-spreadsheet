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
    %lparen expr %rparen                     {% p.return1 %}
  | %number                                  {% p.number %}
  | %identifier                              {% p.variable %}
  | function_call                            {% id %}
  | range                                    {% id %}
  | cell                                     {% id %}
  | %minus primary                           {% p.negative %}


cell -> %cell                                {% p.cell %}

function_call ->
    %identifier %lparen args %rparen           {% p.functionCall %}
  | %kwIf %lparen args %rparen               {% p.functionCall %}

args ->
    expr (%semicolon expr):*                 {% p.list %}
  | null                                     {% p.emptyList %}

range ->
    cell %colon cell                         {% p.range %}

