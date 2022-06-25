import { PrismaClient, User } from "@prisma/client";
import { injectable } from "inversify";
import DBContext from "../infrastructure/database/DBContext";
import LoginUserDto from "../use-case/dtos/auth/login-user.dto";

@injectable()
class UserRepository {
    constructor(private readonly _dbContext: DBContext) { }

    async all(): Promise<User[]> {
        return await this._dbContext.user.findMany()
    }

    async getById(id: number): Promise<User> {
        const user = await this._dbContext.user.findFirst({
            where: {
                id
            }
        })
        return user
    }

    async getByEmail(email: string): Promise<User> {
        const user = await this._dbContext.user.findFirst({
            where: {
                email
            }
        })
        return user
    }

    async create(entity: Partial<User>): Promise<User> {
        const created = await this._dbContext.user.create({
            data: <User>entity
        })

        return created
    }

    async delete(id: number): Promise<User> {
        const deleted = await this._dbContext.user.delete({
            where: {
                id
            }
        })
        return deleted
    }
    async update(id: number, data: User): Promise<User> {
        const updated = await this._dbContext.user.update({
            data,
            where: {
                id
            }
        })

        return updated
    }
}

export default UserRepository