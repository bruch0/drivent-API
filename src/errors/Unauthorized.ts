export default class UnauthorizedError extends Error {
  constructor() {
    super("You must be signed in to continue");

    this.name = "UnauthorizedError";
  }
}
