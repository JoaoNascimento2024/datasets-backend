import express from "express";
import config from "./config/config.js";
import {StatusCodes} from 'http-status-codes';


import datasetRouter from "./routers/DatasetRouter.js";
import userRouter from "./routers/UserRouter.js";
import authRouter from "./routers/AuthRouter.js";

const app = express();
app.use(express.json());

app.get("/",(req,res) => {
    res.status(StatusCodes.OK).send(`API versão ${config.versaoAPI}.`)
});

app.use(`/api/${config.versaoAPI}/login`,authRouter);
app.use(`/api/${config.versaoAPI}/datasets`,datasetRouter);
app.use(`/api/${config.versaoAPI}/users`,userRouter);

export default app;