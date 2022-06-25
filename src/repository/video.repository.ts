import { PrismaClient, User, Video } from "@prisma/client";
import { injectable } from "inversify";
import DBContext from "../infrastructure/database/DBContext";
import LoginUserDto from "../use-case/dtos/auth/login-user.dto";

@injectable()
class VideoRepository {
    constructor(private readonly _dbContext: DBContext) { }

    async all(): Promise<Video[]> {
        return await this._dbContext.video.findMany()
    }

    async getById(id: number): Promise<Video> {
        const user = await this._dbContext.video.findFirst({
            where: {
                id
            }
        })
        return user
    }

    async create(entity: Partial<Video>): Promise<Video> {
        const created = await this._dbContext.video.create({
            data: <Video>entity
        })

        return created
    }

    async delete(id: number): Promise<Video> {
        const deleted = await this._dbContext.video.delete({
            where: {
                id
            }
        })
        return deleted
    }
    async update(id: number, data: Video): Promise<Video> {
        const updated = await this._dbContext.video.update({
            data,
            where: {
                id
            }
        })

        return updated
    }
}

export default VideoRepository