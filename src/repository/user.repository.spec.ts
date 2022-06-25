
import 'reflect-metadata'
import { User } from "@prisma/client";
import DBContext from "../infrastructure/database/DBContext";
import UserRepository from "./user.repository";

describe("User Repository test", () => {
    // beforeAll("")
    let userRepo: UserRepository
    let _db: DBContext
    beforeAll(async () => {
        _db = new DBContext()
        await _db.connect()
        userRepo = new UserRepository(_db);
    })

    afterAll(async () => {
        await _db.db.$disconnect()
    })
    describe("create", () => {
        let createdUser: User
        const data = {
            email: "examplas12e@gmail.com",
            firstname: "John Doe",
            phone: "+998999000000",
            lastname: "Doe",
            password: "password"
        }

        beforeAll(async () => {
            createdUser = await userRepo.create(<User>data);
        })




        afterAll(async () => {
            await userRepo.delete(createdUser.id)
        })
        it("created user equal to intial value", () => {
            expect(createdUser).toMatchObject(data)
        })

    })
    describe("all - method test", () => {
        expect(0).toBe(0)
    })
})