import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import BaseMiddleware from "../../domain/BaseMiddleware";

export class ValidateRequestMiddleware extends BaseMiddleware {

    constructor(private readonly _DtoClass: { from: any }) {
        super()
    }

    public execute(req: Request, res: Response, next: NextFunction): void | Promise<void> {
        req.body = this._DtoClass.from({ ...req.body, ...req.params, ...req.query })
        next()
    }


    static with(dto: any) {
        return new ValidateRequestMiddleware(dto).execute
    }

}