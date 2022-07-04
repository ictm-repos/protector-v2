import { Application, json, NextFunction, Request, Response, urlencoded } from "express";
import { InversifyExpressServer, next } from "inversify-express-utils";
import * as swaggerUi from "swagger-ui-express"
import BaseApplication from "../domain/Application";
import DBContext from "../infrastructure/database/DBContext";
import MailContext from "../infrastructure/nodemailer/MailContext";
import UserRepository from "../repository/user.repository";
import UserService from "../use-case/user.service";
import * as cors from 'cors'

import "./controllers/user.controller";
import "./controllers/video.controller";
import "./controllers/auth.controller";
import VideoRepository from "../repository/video.repository";
import VideoService from "../use-case/video.service";
import AuthService from "../use-case/auth.service";

import docsRouter from './controllers/docs.controller'
import errorHandler from "./middleware/ErrorHandlerMiddleware";
class App extends BaseApplication {
    protected app: Application;

    async configureServices() {
        // Dependency injection container
        this.container.bind(DBContext).toSelf()
        this.container.bind(MailContext).toSelf()
        this.container.bind(AuthService).toSelf()


        this.container.bind(UserRepository).toSelf()
        this.container.bind(UserService).toSelf()

        this.container.bind(VideoRepository).toSelf()
        this.container.bind(VideoService).toSelf()
    }

    async setup() {
        const _db = this.container.get(DBContext)
        await _db.connect()

        const server = new InversifyExpressServer(this.container);

        server.setConfig((app) => {
            app.use(json())
                .use(urlencoded({ extended: true }))
                .use(cors())
                .use(docsRouter)
        })
        server.setErrorConfig((app) => {
            app.use(errorHandler)
        })

        this.app = server.build()
        const port = process.env.PORT || 3031
        this.app.listen(port, () => {
            console.log(`Server started in ${port}`)
        })
    }
}


export default App;