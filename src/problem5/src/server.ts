import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import { pino } from 'pino';
import errorHandler from './common/middleware/errorHandler';
import { env } from './common/utils/envConfig';
import { UserRouter } from './router/user.router';

export class Application {
    private _app: Express;
    private _logger = pino({ name: 'server' });

    constructor(routers) {
        this._app = express();
        this.initSecurity();
        this.initParser();
        this.initAllRoutes(routers);
        this.initErrorHandler();
    }

    initSecurity() {
        this._app.use(cors({ origin: env.CORS_ORIGIN }));
        this._app.use(helmet());
    }

    initParser() {
        this._app.use(express.json());
    }

    initAllRoutes(routers: any[]) {
        routers.forEach(RouterClass => {
            const { router } = new RouterClass();
            this._app.use('/', router);

        })
    }

    initErrorHandler() {
        this._app.use(errorHandler())
    }

    public get app() {
        return this._app;
    }

    public get logger() {
        return this._logger;
    }
}

export const { app, logger } = new Application([
    UserRouter,
]);
