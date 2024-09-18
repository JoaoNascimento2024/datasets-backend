/**
 * @module ModelsDetailsDataset
 * @Description Funções do model details dataset
 */

import mongoose from "mongoose";

/**
 * Schema para a coleção de Datasets no MongoDB. Define as propriedades e as regras para cada
 * campo no documento de Datasets, incluindo validações de tipo, comprimento e obrigatoriedade.
 */
const datasetSchema = new mongoose.Schema({
    // Identificador único gerado automaticamente para cada Dataset
    id: {
        type: mongoose.Schema.Types.ObjectId
    },
    // Nome do Dataset, deve ser único e é obrigatório
    details: {      
        type: Object
    },
    // Referência ao usuário que criou o Dataset
    dataset_id: {
        type : String,
        //type: mongoose.Schema.Types.ObjectId,
        //ref: "Dataset"
    }
}, 
/**
 * Opções do schema:
 * - timestamps: Adiciona automaticamente as propriedades `createdAt` e `updatedAt` ao schema,
 *   representando a data de criação e a última atualização do documento, respectivamente.
 */
{ timestamps: true });

// Cria o modelo Mongoose com base no schema definido acima
const DetailsDatasets = mongoose.model("DetailsDatasets", datasetSchema);

export default DetailsDatasets;
