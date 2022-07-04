import { HttpException } from "./HttpException";

export class BadRequest extends HttpException {
    constructor(error = 'Bad Request') {
        super(error, 400)
    }
}