import Datasets from "../models/Datasets.js";

export async function createDataset(req, res){
    const {name, description} = req.body;
    const filePath = req.file ? req.file.path : null;

    if (filePath === null){
        return res.status(400).send({mensagem : "File not send"});
    }
}