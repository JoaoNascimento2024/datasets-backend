/**
 * @module ControllerDataset
 * @Description Funções do controller dataset
 */

import Datasets from "../models/Dataset.js";
import { StatusCodes } from "http-status-codes";
import { datasetSchemaValidate } from "../utils/validateControllers.js";
import connectAMQP from "../config/connectAMQP.js";
import mongoose from "mongoose";
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
        const validatedData = await datasetSchemaValidate.validate(req.body, { abortEarly: false });

        const file = req.file ? req.file : null;
        const bucketName = "datasets";
        const filePath = `${uuidv4()}.xlsx`;

        //Referência do usuário logado
        const user = req.userID;

        if (file === null) {
            await session.abortTransaction();
            session.endSession();
            return res.status(StatusCodes.BAD_REQUEST).send({ message: "File not send" });
        }

        //Minio
        await uploadMinio(bucketName, filePath, file.buffer);

        //Database
        const { name, description } = validatedData;
        await Datasets.create([{ name, description, filePath, user }], { session })

        //AMQP
        const channel = await connectAMQP();
        if (channel) {
            const message = JSON.stringify({ name, filePath });
            channel.sendToQueue("datasets", Buffer.from(message)); //Transform in bytes
            console.log(`Send message to amqp: ${message}`);
        } else {
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
        const datasets = await Datasets.find({}).populate({
            path: "user",
        });


        res.json(datasets);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
}

/**
 * Recupera todos os datasets armazenados no banco de dados.
 *
 * @param {Object} req - O objeto de requisição do Express.
 * @param {Object} res - O objeto de resposta do Express, usado para enviar os dados dos datasets ao cliente.
 * @returns {void} - Não retorna um valor, mas envia uma resposta HTTP contendo os datasets ou um erro.
 */
export async function getDatasetsByUser(req, res) {
    let userID = req.params.userID;
    try {
        const datasets = await Datasets.find({ user: userID }).populate({
            path: "user",
        });
        res.json(datasets);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
}

export async function getDatasetsById(req, res) {
    
    const datasetID = req.params.datasetID;
    
    try {
        const datasets = await Datasets.find({ _id: datasetID }).populate({
            path: "user",
        });
        res.json(datasets[0]);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
}

export async function deleteDatasets(req, res) {
    let datasetID = req.params.datasetID;
    try {
        const datasets = await Datasets.deleteOne({ _id: datasetID });
        res.json("Dataset deleted");
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
}
