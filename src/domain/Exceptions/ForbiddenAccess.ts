import { HttpException } from "./HttpException";

export class ForbiddenAccess extends HttpException {
    constructor(error = 'Forbidden Access') {
        super(error, 403)
    }
}