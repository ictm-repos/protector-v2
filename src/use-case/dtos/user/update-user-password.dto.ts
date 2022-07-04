import { User } from "@prisma/client";

class UpdateUserPassword {
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
    static from(body: Partial<UpdateUserPassword>) {
        return new UpdateUserPassword(
            body.email,
            body.firstname,
            body.lastname,
            body.password,
            body.phone
        )
    }
}

export default UpdateUserPassword