import { stringify } from 'querystring'
import 'reflect-metadata'

import DBContext from "./DBContext"
const database = new DBContext()

describe("Database test", () => {
    beforeAll(async () => {
        await database.connect()
        await database.user.deleteMany({})
        await database.video.deleteMany({})
    })

    afterAll(async () => {
        await database.db.$disconnect()
    })

    describe("Test User Table", () => {
        const data = {
            email: "example@gmail.com",
            firstname: "John Doe",
            phone: "+998999000000",
            lastname: "Doe",
            password: "password",
            // roles: "NOAUTH",
        }
        let user
        beforeAll(async () => {
            user = await database.user.create({
                data
            })
        })
        it("Created User to be truthy", () => {
            expect(user).toBeTruthy()
        })

        it("Created User id type  should be string", () => {
            expect(typeof user.id).toBe("number")
        })
        it("Created User  should be intial user", () => {
            expect(user).toMatchObject(data)
        })
    })
})