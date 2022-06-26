import { User } from "@prisma/client";
import { Request, Response } from "express";
import { BaseHttpController, controller, httpDelete, httpGet, httpPost, httpPut, requestBody, requestParam } from "inversify-express-utils";
import CreateUserDto from "../../use-case/dtos/user/create-user-request.dto";
import UserService from "../../use-case/user.service";
import VideoService from "../../use-case/video.service";
import UploadFileMiddleware from "../middleware/UploadFileMiddleware";
import { ValidateRequestMiddleware } from "../middleware/ValidateRequestMiddleware";

@controller("/api/video")
class VideoController extends BaseHttpController {

    constructor(private readonly _videoService: VideoService) {
        super()
    }


    @httpGet("/")
    public async getAll() {
        const result = await this._videoService.all()
        return this.json(result)
    }
    @httpGet("/:id/stream")
    private async streaming(req: Request) {
        const { id } = req.params
        console.log(id)
        return this.json({
            data: id
        })
    }
    @httpPost("/", UploadFileMiddleware.with())
    private async store(req: Request) {
        const result = await this._videoService.create(req.body)
        return this.json(result)
    }

    @httpDelete("/:id")
    private async destroy(req: Request) {
        const id = Number(req.params.id);
        const result = await this._videoService.delete(id);
        return this.json(result);
    }
}

export default VideoController