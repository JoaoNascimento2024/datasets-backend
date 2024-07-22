import express from "express";
import config from "./config/config.js";

import datasetRouter from "./routers/DatasetRouter.js";

const app = express();
app.use(express.json());

app.get("/",(req,res) => {
    res.status(200).send(`API versão ${config.versaoAPI}.`)
});

app.use(`/api/${config.versaoAPI}/datasets`,datasetRouter);

export default app;