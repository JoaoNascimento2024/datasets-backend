import Datasets from "../models/Datasets.js";

export async function createDataset(req, res){
    try{    
        const {name, description} = req.body;
        const filePath = req.file ? req.file.path : null;

        if (filePath === null){
            return res.status(400).send({mensagem : "File not send"});
        }

        const dataset = new Datasets({name, description, filepath});
        await dataset.save();
        res.status(201).send();
    }catch(error){
        res.status(400).send(error);
    }
}

export async function getDatasets(req, res){
    try{
        const datasets = await Datasets.find({});
        res.send(datasets);
    }catch(error){
        res.status(500).send(error);
    }
}