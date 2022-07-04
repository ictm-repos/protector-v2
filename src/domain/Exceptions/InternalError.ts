import { HttpException } from "./HttpException";

export class InternalError extends HttpException {
    constructor(error = 'Resource not found') {
        super(error, 500)
    }
}