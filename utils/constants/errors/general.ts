import uuid from 'uuid';

class BadRequestError extends Error {
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
    this.uid = uuid;
  }
}

class InvalidLinkError extends Error {
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
    this.uid = uuid;
  }
}

export { BadRequestError, InvalidLinkError };
