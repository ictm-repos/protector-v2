import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { AuthenticatedRequest } from "../../domain/AuthenticatiedRequest";
import BaseMiddleware from "../../domain/BaseMiddleware";
import * as jwt from 'jsonwebtoken'
import { BadRequest } from "../../domain/Exceptions/BadRequest";
import { UnAuthorized } from "../../domain/Exceptions/UnAuthorized";
import { ForbiddenAccess } from "../../domain/Exceptions/ForbiddenAccess";
export class CheckAuthMiddleware extends BaseMiddleware {

    constructor() {
        super()
    }

    public execute(req: AuthenticatedRequest, res: Response, next: NextFunction): void | Promise<void> {
        const header = req.headers['authorization']
        if (!header) throw new BadRequest("Token is not provided");

        const token = header.split(" ")[1].trim()
        if (!token) throw new UnAuthorized("Token not found");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) throw new ForbiddenAccess("Tokenda xatolik mavzud")
        req.user = decoded
        next()
    }


    static with() {
        return new CheckAuthMiddleware().execute
    }

}