import Datasets from "../models/Dataset.js";
import {StatusCodes} from "http-status-codes";

export async function createDataset(req, res){
    try{    
        const {name, description} = req.body;
        const filePath = req.file ? req.file.path : null;

        if (filePath === null){
            return res.status(StatusCodes.BAD_REQUEST).send({message : "File not send"});
        }
  
        const dataset = new Datasets({name, description, filePath});
        await dataset.save();
        res.status(StatusCodes.CREATED).send();
    }catch(error){
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }
}

export async function getDatasets(req, res){
    try{
        const datasets = await Datasets.find({});
        res.send(datasets);
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
}