/**
 * @module ControllerDataset
 * @Description Funções do controller dataset
 */

import Datasets from "../models/Dataset.js";
import DetailsDatasets from "../models/DetailsDataset.js";
import { StatusCodes } from "http-status-codes";
import { datasetSchemaValidate } from "../utils/validateControllers.js";
import connectAMQP from "../config/connectAMQP.js";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { uploadMinio } from "../middleware/uploadFileMiddleware.js";
import minioClient from "../config/configMinio.js";

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
        const status = "WAITING_PROCESSING";
        const dataset = await Datasets.create([{ name, description, filePath, user, status }], { session })
        const idDataset = dataset[0]._id;

        //AMQP
        const channel = await connectAMQP();
        if (channel) {
            const message = JSON.stringify({ name, filePath, idDataset });
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

export async function getDownloadFileByDatasetId(req, res) {    
    try {
        const datasetId = req.params.datasetID;
        console.log(datasetId);
        const dataset = await Datasets.findById(datasetId);

        if (!dataset) {
            return res.status(StatusCodes.NOT_FOUND).send('Dataset not found.');
        }

        const { filePath } = dataset;
        const bucketName = 'datasets';

        minioClient.getObject(bucketName, filePath, async (err, dataStream) => {
            if (err) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Error accessing file: ' + err.message);
            }
            console.log("Download file: ", filePath);

            await Datasets.findByIdAndUpdate(datasetId, { $inc: { downloads: 1 } });
            
            res.attachment(filePath);
            dataStream.pipe(res);
        });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error.');
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

export async function getDetailsDatasetsById(req, res) {    
    const datasetID = req.params.datasetID;  
    try {
        const detailsDataset = await DetailsDatasets.find({ dataset_id: datasetID });
        console.log("detailsDataset",detailsDataset);
        res.json(detailsDataset[0]);
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
