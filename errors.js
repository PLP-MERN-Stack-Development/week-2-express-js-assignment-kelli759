// errors.js

class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // call the parent Error constructor
    this.statusCode = statusCode;
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}

class ValidationError extends AppError {
  constructor(message = 'Invalid data') {
    super(message, 400);
  }
}

module.exports = {
  AppError,
  NotFoundError,
  ValidationError,
};


S