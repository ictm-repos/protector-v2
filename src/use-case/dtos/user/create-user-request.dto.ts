import { User } from "@prisma/client";

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
            throw new Error("Email is not provided")
        }

        if (!body.firstname) {
            throw new Error("Firstname is not provided")
        }

        if (!body.password) {
            throw new Error("Password is not provided")
        }

        if (!body.phone) {
            throw new Error("Password is not provided")
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