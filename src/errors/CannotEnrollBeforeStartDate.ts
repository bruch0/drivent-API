export default class CannotEnrollBeforeStartDateError extends Error {
  constructor() {
    super("Cannot enroll before event start date!");

    this.name = "CannotEnrollBeforeStartDateError";
  }
}
