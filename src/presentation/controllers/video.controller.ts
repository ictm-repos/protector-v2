import { User } from "@prisma/client";
import { Request, Response } from "express";
import * as fs from 'fs'
import { BaseHttpController, controller, httpDelete, httpGet, httpPost, httpPut, requestBody, requestParam } from "inversify-express-utils";
import { AuthenticatedRequest } from "../../domain/AuthenticatiedRequest";
import { BadRequest } from "../../domain/Exceptions/BadRequest";
import CreateUserDto from "../../use-case/dtos/user/create-user-request.dto";
import UserService from "../../use-case/user.service";
import VideoService from "../../use-case/video.service";
import { CheckAuthMiddleware } from "../middleware/CheckAuthMiddleware";
import UploadFileMiddleware from "../middleware/UploadFileMiddleware";
import { ValidateRequestMiddleware } from "../middleware/ValidateRequestMiddleware";

@controller("/api/video")
class VideoController extends BaseHttpController {

    constructor(private readonly _videoService: VideoService) {
        super()
    }

    @httpGet("/", CheckAuthMiddleware.with())
    public async getAll() {
        const result = await this._videoService.all()
        return this.json(result)
    }

    // This is Available for Admins
    @httpGet("/my-videos", CheckAuthMiddleware.with())
    private async getByUserId(req: AuthenticatedRequest) {
        const videos = await this._videoService.getVideosByUserId(req.user.id);
        return this.json({
            data: videos
        })
    }

    @httpGet("/:id/stream")
    private async streaming(req: Request, res: Response) {
        const { id } = req.params
        const range = req.headers.range;
        if (!range) {
            throw new BadRequest("This request is not supported")
        }
        const result = await this._videoService.getById(Number(id))
        const videoPath = result.destination;
        const videoSize = fs.statSync(videoPath).size;
        const CHUNK_SIZE = 10 ** 6;
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };
        res.writeHead(206, headers);
        const videoStream = fs.createReadStream(videoPath, { start, end });
        return videoStream.pipe(res);
    }
    @httpPost("/", CheckAuthMiddleware.with(), UploadFileMiddleware.with())
    private async store(req: AuthenticatedRequest) {
        const result = await this._videoService.create(req.body)
        return this.json(result)
    }

    @httpDelete("/:id", CheckAuthMiddleware.with())
    private async destroy(req: AuthenticatedRequest) {
        const id = Number(req.params.id);
        const result = await this._videoService.delete(id);
        return this.json(result);
    }
}

export default VideoController