'use strict';

import uuid from 'uuid';

class InvalidCredentialsError extends Error {
  constructor(message = 'Invalid Credentials', status = 401) {
    super(message);
    this.status = status;
    this.uid = uuid;
  }
}

class EmailNotVerifiedError extends Error {
  constructor(message = 'Email Not Verified', status = 401) {
    super(message);
    this.status = status;
    this.uid = uuid;
  }
}

class PermissionDeniedError extends Error {
  constructor(
    message = "You Don't Have Permission for This Operation",
    status = 403
  ) {
    super(message);
    this.status = status;
    this.uid = uuid;
  }
}

export {
  InvalidCredentialsError,
  EmailNotVerifiedError,
  PermissionDeniedError
};
