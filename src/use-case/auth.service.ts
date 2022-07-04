import { User } from "@prisma/client";
import { injectable } from "inversify";
import { compareHash, hashString } from "../utils/hash-string";
import UserService from "./user.service";
import { RegisterDto } from "./dtos/AuthDto";
import LoginUserDto from "./dtos/auth/login-user.dto";
import CreateUserDto from "./dtos/user/create-user-request.dto";
import * as jwt from "jsonwebtoken"



@injectable()
class AuthService {
    constructor(private _userService: UserService) {
    }
    async login(loginUserDto: LoginUserDto) {
        const user = await this._userService.getByEmail(loginUserDto.email)
        if (!user) {
            throw new Error("This email not found")
        }

        const isValid = await compareHash(loginUserDto.password, user.password);
        if (!isValid) {
            throw new Error("Login or user incorrect");
        }
        const { email, firstname, lastname, phone, id } = user
        const payload = { email, firstname, lastname, phone, id }
        const token = jwt.sign(payload, process.env.JWT_SECRET)
        return token;
    }

    async register(createUserDto: CreateUserDto) {
        const user = await this._userService.create(createUserDto)
        return user
    }

}



export default AuthService