import { User } from "@prisma/client";
import { inject, injectable } from "inversify";
import UserRepository from "../repository/user.repository";
import { hashString } from "../utils/hash-string";
import LoginUserDto from "./dtos/auth/login-user.dto";
import CreateUserDto from "./dtos/user/create-user-request.dto";

@injectable()
class UserService {
    constructor(private readonly _userRepo: UserRepository) {
    }

    async all(): Promise<User[]> {
        const result = await this._userRepo.all()
        return result
    }


    // async getById(id: number): Promise<User> {
    //     const user = await this._userRepo.getById(id)
    //     return user
    // }

    async getByEmail(email: string): Promise<User> {
        const user = await this._userRepo.getByEmail(email)
        return user
    }


    async create(createUserDto: CreateUserDto): Promise<User> {
        createUserDto.password = await hashString(createUserDto.password);
        const result = await this._userRepo.create(createUserDto);
        return result;
    }

    async delete(id: number): Promise<User> {
        const result = await this._userRepo.delete(id);
        return result;
    }

    async update(id: number, data: User): Promise<User> {
        const result = await this._userRepo.update(id, data);
        return result;
    }
}



export default UserService