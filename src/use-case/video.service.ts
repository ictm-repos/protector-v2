import { User, Video } from "@prisma/client";
import { inject, injectable } from "inversify";
import UserRepository from "../repository/user.repository";
import VideoRepository from "../repository/video.repository";
import { hashString } from "../utils/hash-string";
import LoginUserDto from "./dtos/auth/login-user.dto";
import CreateUserDto from "./dtos/user/create-user-request.dto";

@injectable()
class VideoService {
    constructor(private readonly _videoRepo: VideoRepository) {
    }

    async all(): Promise<Video[]> {
        const result = await this._videoRepo.all()
        return result
    }

    async getById(id: number): Promise<Video> {
        const result = await this._videoRepo.getById(id)
        return result
    }
    async create(createUserDto: any): Promise<Video> {
        const result = await this._videoRepo.create(createUserDto)
        return result
    }

    async delete(id: number): Promise<Video> {
        const result = await this._videoRepo.delete(id)
        return result
    }

    async getVideosByUserId(id: number): Promise<Video[]> {
        const result = await this._videoRepo.getVideoByUserId(id)
        return result
    }
}



export default VideoService