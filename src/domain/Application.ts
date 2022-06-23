import { Container, interfaces } from "inversify";

abstract class BaseApplication {
    protected container: Container
    constructor(options: interfaces.ContainerOptions) {
        this.container = new Container(options)

        this.configureServices(this.container)
        this.setup()
    }
    abstract configureServices(container: Container): void
    abstract setup(): Promise<void> | void
}

export default BaseApplication