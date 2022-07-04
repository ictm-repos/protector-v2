import { User } from "@prisma/client";
import { BadRequest } from "../../../domain/Exceptions/BadRequest";

class RegisterUserDto {
    // const user: User
    constructor(
        public readonly email: string,
        public readonly firstname: string,
        public readonly lastname: string,
        public password: string,
        public readonly phone: string

    ) {
        // this.user.
    }
    static from(body: Partial<RegisterUserDto>) {
        console.log(body)
        if (!body.email) {
            throw new BadRequest("Email is doesn't exist")
        }

        return new RegisterUserDto(
            body.email,
            body.firstname,
            body.lastname,
            body.password,
            body.phone
        )
    }
}

export default RegisterUserDto