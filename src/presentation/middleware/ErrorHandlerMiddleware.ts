import { Request, Response, NextFunction } from "express";
import BaseMiddleware from "../../domain/BaseMiddleware";
import { BadRequest } from "../../domain/Exceptions/BadRequest";
import { ForbiddenAccess } from "../../domain/Exceptions/ForbiddenAccess";
import { HttpException } from "../../domain/Exceptions/HttpException";
import { UnAuthorized } from "../../domain/Exceptions/UnAuthorized";

function execute(
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
): void | Promise<void> {
    res.status(error.status || 500).json(error)
}

export default execute