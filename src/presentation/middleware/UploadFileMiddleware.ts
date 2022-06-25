import { Request, Response, NextFunction } from "express";
import * as multer from 'multer'
import BaseMiddleware from "../../domain/BaseMiddleware";
import * as path from 'path'
class UploadFileMiddleware extends BaseMiddleware {

    public execute(req: Request, res: Response, next: NextFunction): void | Promise<void> {
        console.log(req.body)
        console.log(process.cwd())
        const uploadPath = path.join(process.cwd(), "upload")
        console.log(uploadPath)
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, uploadPath)
            },
            filename: function (req, file, cb) {
                console.log(file)
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                const fileInfo = path.parse(file.originalname)
                const destination = `${file.fieldname}-${uniqueSuffix}${fileInfo.ext}`;
                req.body.destination = path.join(uploadPath, destination)

                cb(null, destination)
            }
        })
        const upload = multer({ storage: storage })
        return upload.single("video")(req, res, next)
    }

    static with() {
        return new UploadFileMiddleware().execute
    }
}

export default UploadFileMiddleware

