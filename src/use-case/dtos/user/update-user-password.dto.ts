import { User } from "@prisma/client";

class CreateUserDto {
    // const user: User
    constructor(
        public readonly email: string,
        public readonly firstname: string,
        public readonly lastname: string,
        public password: string,
        public readonly phone: string
        // public readonly
    ) {
    }
    static from(body: Partial<CreateUserDto>) {
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