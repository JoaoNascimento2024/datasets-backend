import express from "express";
import config from "./config/config.js";

import datasetRouter from "./routers/DatasetRouter.js";
import userRouter from "./routers/UserRouter.js";

const app = express();
app.use(express.json());

app.get("/",(req,res) => {
    res.status(200).send(`API versão ${config.versaoAPI}.`)
});

app.use(`/api/${config.versaoAPI}/datasets`,datasetRouter);
app.use(`/api/${config.versaoAPI}/users`,userRouter);

export default app;