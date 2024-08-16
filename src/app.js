import express from "express";
import config from "./config/config.js";
import {StatusCodes} from 'http-status-codes';
import swaggerSpec from "./config/config-swagger.js";
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";

import datasetRouter from "./routers/DatasetRouter.js";
import userRouter from "./routers/UserRouter.js";
import authRouter from "./routers/AuthRouter.js";
import profileRouter from "./routers/ProfileRouter.js";
import permissionRouter from "./routers/PermissionRouter.js";

const app = express();
app.use(express.json());

app.use(helmet());

app.get("/",(req,res) => {
    res.status(StatusCodes.OK).send(`API versão ${config.versaoAPI}.`)
});

app.use(`/api/${config.versaoAPI}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(`/api/${config.versaoAPI}/login`,authRouter);
app.use(`/api/${config.versaoAPI}/datasets`,datasetRouter);
app.use(`/api/${config.versaoAPI}/users`,userRouter);
app.use(`/api/${config.versaoAPI}/profiles`,profileRouter);
app.use(`/api/${config.versaoAPI}/permissions`,permissionRouter);

export default app;