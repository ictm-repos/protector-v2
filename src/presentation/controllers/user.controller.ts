import { User } from "@prisma/client";
import { Request, Response } from "express";
import { BaseHttpController, controller, httpDelete, httpGet, httpPost, httpPut, requestBody, requestParam } from "inversify-express-utils";
import UserService from "../../use-case/user.service";

@controller("/api/users")
class UserController extends BaseHttpController {

    constructor(private readonly _userService: UserService) {
        super()
    }


    @httpGet("/")
    public async getAll() {
        const result = await this._userService.all()
        return this.json(result)
    }

    @httpPost("/")
    private async store(req: Request) {
        const result = await this._userService.create(req.body)
        return this.json(result)
    }

    @httpDelete("/:id")
    private async destroy(@requestParam("id") id: number) {
        const result = await this._userService.delete(Number(id))
        return this.json(result)
    }
    @httpPut("/:id")
    private async update(@requestParam("id") id: number, @requestBody() body) {
        const result = await this._userService.update(Number(id), body)
        return result
    }
}

export default UserController