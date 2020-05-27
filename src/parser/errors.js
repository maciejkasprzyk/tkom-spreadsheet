export const returnMessage = "Return in unexpected place"

export class UserError extends Error {
  constructor(...params) {
    super(...params);
    this.name = "UserError";
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UserError);
    }
  }
}

export class returnHandler extends Error {
  constructor(result,...params) {
    super(...params);
    this.result = result;
    this.name = "returnHandler";
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UserError);
    }
  }
}
