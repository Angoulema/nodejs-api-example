// use this class to extend specific errors from it
class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.getErrorName();
  }

  private getErrorName() {
    return this.constructor.name;
  }
}
