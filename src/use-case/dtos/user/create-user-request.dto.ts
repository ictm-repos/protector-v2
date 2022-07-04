import { User } from "@prisma/client";
import { BadRequest } from "../../../domain/Exceptions/BadRequest";

class CreateUserDto {
    // const user: User
    constructor(
        public readonly email: string,
        public readonly firstname: string,
        public readonly lastname: string,
        public password: string,
        public readonly phone: string

    ) {
    }
    static from(body: Partial<CreateUserDto>) {
        if (!body.email) {
            throw new BadRequest("Email is not provided")
        }

        if (!body.firstname) {
            throw new BadRequest("Firstname is not provided")
        }

        if (!body.password) {
            throw new BadRequest("Password is not provided")
        }

        if (!body.phone) {
            throw new BadRequest("Password is not provided")
        }

        return new CreateUserDto(
            body.email,
            body.firstname,
            body.lastname,
            body.password,
            body.phone
        )
    }
}

export default CreateUserDto