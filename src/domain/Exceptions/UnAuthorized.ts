import { HttpException } from "./HttpException";

export class UnAuthorized extends HttpException {
    constructor(error = 'UnAuthorized') {
        super(error, 401)
    }
}