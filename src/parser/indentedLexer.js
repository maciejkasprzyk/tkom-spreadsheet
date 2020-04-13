(function () {

  function IndentedLexer(lexer, ws, nl) {
    this.lexer = lexer;
    this.indents = [];
    this.tokens = [""];
    this.afterNewLine = true;
    this.ws = ws; // white space token
    this.nl = nl; // new line token

    // used to ignore ends tokens
    this.previous = null;
    this.start = true;
  }

  IndentedLexer.prototype.next = function () {
    return this.ignoreExcessiveEndsNext();
  }

  IndentedLexer.prototype.ignoreExcessiveEndsNext = function () {
    let tok;

    // skip end tokens at the start
    if (this.start) {
      while ((tok = this.ignoreWhiteSpaceNext()) && tok.type === this.end) {
      }
    } else {
      this.start = false;
      tok = this.ignoreWhiteSpaceNext();
    }

    if (tok === undefined) {
      return tok;
    }

    while (this.previous !== null && this.previous.type === this.end && tok.type === this.end) {

    }

    this.previous = tok;
    return tok;

  }

  IndentedLexer.prototype.ignoreWhiteSpaceNext = function () {
    let tok;
    while ((tok = this.indentedNext()) && tok.type === this.ws) {
    }
    return tok;
  }

  IndentedLexer.prototype.indentedNext = function () {
    while (this.tokens.length === 0) {
      this.generateMoreTokens();
    }
    return this.tokens.shift()
  }

  IndentedLexer.prototype.generateMoreTokens = function () {
    let token = this.lexer.next(this);
    if (!token) {
      this.changeIndent("");
      this.tokens.push(token);
      return;
    }

    if (this.afterNewLine) {
      this.afterNewLine = false;
      if (token.type === this.ws) {
        this.changeIndent(token.value, token.col, token.line, token.offset);
      } else {
        this.changeIndent("");
        this.tokens.push(token);
      }
    } else {
      this.tokens.push(token);
    }
    this.afterNewLine = (token.type === this.nl);
  };

  IndentedLexer.prototype.changeIndent = function (indent, col, line, offset) {
    while (indent !== this.indents[this.indents.length - 1]) {
      let prev = this.indents[this.indents.length - 1];
      if (startsWith(indent, prev)) {  // more indentation than we had.
        this.tokens.push({
          type: 'indent',
          text: indent,
          value: indent,
          lineBreaks: 0,
          col: col,
          line: line,
          offset: offset,
        });
        this.indents.push(indent);
        return;
      } else if (startsWith(prev, indent)) { // less indentation than we had.
        this.tokens.push({
          type: 'dedent',
          text: indent,
          value: indent,
          lineBreaks: 0,
          col: col,
          line: line,
          offset: offset,
        });
        this.indents.pop();  // check the previous one.
      } else {
        prev = unicodeDebugString(prev);
        indent = unicodeDebugString(indent);
        throw Error('Indentations cannot be compared: ' + prev + ' and ' + indent + '.');
      }
    }
  }

  IndentedLexer.prototype.save = function () {
    return this.lexer.save();
  }

  IndentedLexer.prototype.reset = function (data, info) {
    this.lexer.reset(data, info);
    this.indents = [''];
    this.tokens = [];
    this.afterNewLine = true;
  }

  IndentedLexer.prototype.formatError = function (token) {
    return this.lexer.formatError(token);
  }

  IndentedLexer.prototype.has = function (name) {
    return this.lexer.has(name);
  }

  // ---------------------------------------------------------

  function startsWith(str, prefix) {
    return str.lastIndexOf(prefix, 0) === 0;
  }

  function unicodeDebugString(s) {
    let u = '';
    for (let i = 0; i < s.length; ++i) {
      let n = s.charCodeAt(i), hex16 = '';
      for (let j = 0; j < 4; ++j) {
        let d = n % 16;
        n /= 16;
        let offset = (d < 10) ? 0x30 : 0x61 - 10
        let ch = String.fromCharCode(d + offset);
        hex16 = ch + hex16;
      }
      u += ('\\u' + hex16);
    }
    return '"' + u + '"';
  }

  // ---------------------------------------------------------

  if (typeof module === 'object' && module.exports) {
    module.exports = IndentedLexer;
  } else {
    window.IndentedLexer = IndentedLexer;
  }
})();
