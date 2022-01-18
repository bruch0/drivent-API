import ConflictError from "@/errors/ConflictError";

export default class EmailNotAvailableError extends ConflictError {
  constructor(email: string) {
    super(`Email "${email}" is being used by another user!`);

    this.name = "EmailNotAvailableError";
  }
}
