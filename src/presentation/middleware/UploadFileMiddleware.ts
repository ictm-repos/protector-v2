import { Request, Response, NextFunction } from "express";
import * as multer from 'multer'
import BaseMiddleware from "../../domain/BaseMiddleware";
import * as path from 'path'
import { callbackify } from "util";
import { AuthenticatedRequest } from "../../domain/AuthenticatiedRequest";
import { BadRequest } from "../../domain/Exceptions/BadRequest";
class UploadFileMiddleware extends BaseMiddleware {

    public execute(req: AuthenticatedRequest, res: Response, next: NextFunction): void | Promise<void> {
        const uploadPath = path.join(process.cwd(), "upload")
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, uploadPath)
            },
            filename: function (req: AuthenticatedRequest, file, cb) {
                console.log(file)
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                const fileInfo = path.parse(file.originalname)
                const destination = `${file.fieldname}-${uniqueSuffix}${fileInfo.ext}`;
                req.body.destination = path.join(uploadPath, destination)
                console.log(req.user)
                req.body.ownerId = req.user.id;
                cb(null, destination)
            }
        })
        const upload = multer({
            storage: storage,
            fileFilter: this.fileFilter
        })
        return upload.single("video")(req, res, next)
    }
    fileFilter(req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) {
        const allowedFiles = [
            "video/mp4"
        ]
        if (allowedFiles.includes(file.mimetype))
            callback(null, true);
        else
            callback(new BadRequest("This file is not supported"));
    }
    static with() {
        return new UploadFileMiddleware().execute;
    }
}

export default UploadFileMiddleware;

