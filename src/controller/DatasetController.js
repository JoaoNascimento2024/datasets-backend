/**
 * @module ControllerDataset
 * @Description Funções do controller dataset
 */

import Datasets from "../models/Dataset.js";
import { StatusCodes } from "http-status-codes";
import { datasetSchemaValidate } from "../utils/validateControllers.js";
import connectAMQP from "../config/connectAMQP.js";
import mongoose from "mongoose";
import minioClient from "../config/configMinio.js";
import { v4 as uuidv4 } from "uuid";
import { uploadMinio } from "../middleware/uploadFileMiddleware.js";

/**
 * Cria um novo dataset com base nos dados recebidos no corpo da requisição e o caminho de um arquivo enviado.
 *
 * @param {Object} req - O objeto de requisição do Express, contendo os dados e o arquivo enviados pelo usuário.
 * @param {Object} res - O objeto de resposta do Express, usado para enviar uma resposta ao cliente.
 * @returns {void} - Não retorna um valor, mas envia uma resposta HTTP.
 */
export async function createDataset(req, res) {
    
    // Using Mongoose's default connection
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {

        const validatedData = await datasetSchemaValidate.validate(req.body, {abortEarly : false});
        
        //const filePath = req.file ? req.file.path : null;
        //const fileName = req.file ? req.file.fileName : null;

        const file = req.file ? req.file.path : null;
        const bucketName = "datasets";
        const fileName = `${uuidv4}.xlsx`;        

        if (file === null) {
            await session.abortTransaction();
            session.endSession(); 
            return res.status(StatusCodes.BAD_REQUEST).send({ message: "File not send" });
        }       

        await uploadMinio(bucketName,fileName,file.buffer);
  
        //Database
        const {name, description} = validatedData;
        //const dataset = new Datasets({ name, description, filePath });
        //dataset.save();    
        await Datasets.create([{ name, description, fileName }], {session})

        //AMQP
        const channel = await connectAMQP();
        if (channel){
            const message = JSON.stringify({name, fileName});
            channel.sendToQueue("datasets", Buffer.from(message)); //Transform in bytes
            console.log(`Send message to amqp: ${message}`);
        }else{
            throw new Error("Failed to connect AMQP");
        }    

        //Commit session
        await session.commitTransaction();          

        res.status(StatusCodes.CREATED).send();
    } catch (error) {
        await session.abortTransaction();
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }
    session.endSession();  
}

/**
 * Recupera todos os datasets armazenados no banco de dados.
 *
 * @param {Object} req - O objeto de requisição do Express.
 * @param {Object} res - O objeto de resposta do Express, usado para enviar os dados dos datasets ao cliente.
 * @returns {void} - Não retorna um valor, mas envia uma resposta HTTP contendo os datasets ou um erro.
 */
export async function getDatasets(req, res) {
    try {
        const datasets = await Datasets.find({});
        res.send(datasets);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
}
