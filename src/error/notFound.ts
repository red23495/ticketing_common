import { BaseError, SerializedErrorDetail } from "./base";

export class NotFoundError extends BaseError {

    constructor() {
        super("Resource not found", 404);
    }

    get errorDetails(): SerializedErrorDetail[] {
        return [];
    }

}