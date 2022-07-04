import { User } from "@prisma/client";
import { BadRequest } from "../../../domain/Exceptions/BadRequest";

class LoginUserDto {
    constructor(
        public readonly email: string,
        public readonly password: string
    ) {
    }
    static from(body: Partial<LoginUserDto>) {
        if (!body.email) {
            throw new BadRequest("Email is not provided")
        }
        if (!body.password) {
            throw new BadRequest("Password is not provided")
        }
        return new LoginUserDto(
            body.email,
            body.password
        )
    }
}

export default LoginUserDto