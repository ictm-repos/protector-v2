import { BaseHttpController, controller, httpPost, requestBody } from "inversify-express-utils";
import { RegisterDto } from "../../use-case/dtos/AuthDto";
import AuthService from "../../use-case/auth.service";
import { ValidateRequestMiddleware } from "../middleware/ValidateRequestMiddleware";
import LoginUserDto from "../../use-case/dtos/auth/login-user.dto";
import { Request } from "express";
import CreateUserDto from "../../use-case/dtos/user/create-user-request.dto";

@controller("/api/auth")
class AuthController extends BaseHttpController {

    constructor(private readonly _authService: AuthService) {
        super()
    }

    @httpPost("/login", ValidateRequestMiddleware.with(LoginUserDto))
    async login(req: Request) {
        const token = await this._authService.login(req.body)
        return token
    }

    @httpPost("/register", ValidateRequestMiddleware.with(CreateUserDto))
    async register(@requestBody() body: RegisterDto) {
        const result = await this._authService.register(body)
        return this.json(result)
    }
}

export default AuthController