import { HttpException } from "./HttpException";

export class NotFound extends HttpException {
    constructor(error = 'Resource not found') {
        super(error, 404)
    }
}