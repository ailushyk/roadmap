export class UnauthorizedError extends Error {
  private statusCode: number
  constructor(message) {
    super(message)
    this.statusCode = 401
    this.name = 'UnauthorizedError'
  }
}
