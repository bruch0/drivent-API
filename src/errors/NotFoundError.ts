export default class NotFoundError extends Error {
  constructor() {
    super("No result for this search!");

    this.name = "NotFoundError";
  }
}
