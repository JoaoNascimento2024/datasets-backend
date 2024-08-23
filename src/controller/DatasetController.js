/**
 * @module ControllerDataset
 * @Description Funções do controller dataset
 */

import Datasets from "../models/Dataset.js";
import { StatusCodes } from "http-status-codes";
import { datasetSchemaValidate } from "../utils/validateControllers.js";
import connectAMQP from "../config/connectAMQP.js";


/**
 * Cria um novo dataset com base nos dados recebidos no corpo da requisição e o caminho de um arquivo enviado.
 *
 * @param {Object} req - O objeto de requisição do Express, contendo os dados e o arquivo enviados pelo usuário.
 * @param {Object} res - O objeto de resposta do Express, usado para enviar uma resposta ao cliente.
 * @returns {void} - Não retorna um valor, mas envia uma resposta HTTP.
 */
export async function createDataset(req, res) {
    try {
        
        const validatedData = await datasetSchemaValidate.validate(req.body, {abortEarly : false});
        
        const filePath = req.file ? req.file.path : null;

        if (filePath === null) {
            return res.status(StatusCodes.BAD_REQUEST).send({ message: "File not send" });
        }
  
        //Database
        const {name, description} = validatedData;
        const dataset = new Datasets({ name, description, filePath });
        await dataset.save();

        //AMQP
        const channel = await connectAMQP();
        if (channel){
            const message = JSON.stringify({name, filePath});
            channel.sendToQueue("datasets", Buffer.from(message)); //Transform in bytes
            console.log(`Send message to amqp: ${message}`);
        }else{
            throw new Error("Failed to connect AMQP");
        }    



        res.status(StatusCodes.CREATED).send();
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }
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
