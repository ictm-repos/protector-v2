import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";

@injectable()
class DBContext {
    protected _db: PrismaClient;
    async connect() {
        this._db = new PrismaClient({
            log: ['query', 'error', 'info', 'warn']
        })
    }
    get db() {
        return this._db
    }
    get user() {
        return this._db.user
    }

    get video() {
        return this._db.video
    }

}

export default DBContext