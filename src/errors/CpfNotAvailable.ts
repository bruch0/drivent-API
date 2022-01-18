import ConflictError from "@/errors/ConflictError";

export default class CpfNotAvailableError extends ConflictError {
  constructor(cpf: string) {
    super(`CPF "${cpf}" is being used by another user!`);

    this.name = "CpfNotAvailable";
  }
}
