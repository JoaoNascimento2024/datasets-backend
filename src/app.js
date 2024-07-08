import express from "express";
import config from "./config/config.js";

const app = express();
app.use(express.json());

app.get("/",(req,res) => {
    res.status(200).send(`API versão ${config.versaoAPI}.`)
});

export default app;