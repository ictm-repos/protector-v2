import { User } from "@prisma/client";

class LoginUserDto {
    constructor(
        public readonly email: string,
        public readonly password: string
    ) {
    }
    static from(body: Partial<LoginUserDto>) {
        if (!body.email) {
            throw new Error("Email is not provided")
        }
        if (!body.password) {
            throw new Error("Password is not provided")
        }
        return new LoginUserDto(
            body.email,
            body.password
        )
    }
}

export default LoginUserDto