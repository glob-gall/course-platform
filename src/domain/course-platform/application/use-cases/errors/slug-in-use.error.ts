import { UseCaseError } from "@/core/errors/use-case.error";

export class SlugAlreadyInUseError extends Error implements UseCaseError {
  constructor() {
    super('Slug already in use');
  }
}
