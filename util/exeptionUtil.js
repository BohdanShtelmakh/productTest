class CustomError extends Error {

  status = 500;
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
  }
}

module.exports = CustomError;