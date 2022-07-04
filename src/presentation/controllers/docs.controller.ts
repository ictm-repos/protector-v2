import { User } from "@prisma/client";
import { Request, Response, Router } from "express";
import { BaseHttpController, controller, httpDelete, httpGet, httpPost, httpPut, requestBody, requestParam } from "inversify-express-utils";
import CreateUserDto from "../../use-case/dtos/user/create-user-request.dto";
import UserService from "../../use-case/user.service";
import { ValidateRequestMiddleware } from "../middleware/ValidateRequestMiddleware";
import * as swaggerUi from 'swagger-ui-express'
import * as YAML from 'yamljs'
import * as path from 'path'
const router = Router()
const swaggerDocuemnt = YAML.load(path.resolve(__dirname, "../swagger.yaml"))
console.log(swaggerDocuemnt)
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocuemnt))
export default router