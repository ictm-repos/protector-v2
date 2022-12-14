import { User } from "@prisma/client";
import { Request, Response } from "express";
import { BaseHttpController, controller, httpDelete, httpGet, httpPost, httpPut, requestBody, requestParam } from "inversify-express-utils";
import CreateUserDto from "../../use-case/dtos/user/create-user-request.dto";
import UserService from "../../use-case/user.service";
import { ValidateRequestMiddleware } from "../middleware/ValidateRequestMiddleware";

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

    @httpPost("/", ValidateRequestMiddleware.with(CreateUserDto))
    private async store(req: Request) {
        const result = await this._userService.create(req.body)
        return this.json(result)
    }

    @httpDelete("/:id")
    private async destroy(req: Request) {
        const id = Number(req.params.id);
        const result = await this._userService.delete(id);
        return this.json(result);
    }
    @httpPut("/:id")
    private async update(@requestParam("id") id: number, @requestBody() body) {
        const result = await this._userService.update(Number(id), body)
        return result
    }
}

export default UserController