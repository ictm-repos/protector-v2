import { NextFunction, Request, Response } from "express";

abstract class BaseMiddleware {
    constructor() {
        this.execute = this.execute.bind(this)
    }
    public abstract execute(req: Request, res: Response, next: NextFunction): void | Promise<void>
}

export default BaseMiddleware