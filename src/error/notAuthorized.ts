import { BaseError, SerializedErrorDetail } from "./base";

export class NotAuthorizedError extends BaseError {

  constructor() {
    super('User not authorized', 403);
  }

  get errorDetails(): SerializedErrorDetail[] {
    return [];
  }
}
