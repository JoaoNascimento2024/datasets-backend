/**
 * @module ModelsDataset
 * @Description Funções do model dataset
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
    name: {
        type: String,
        minlength: 1,
        maxlength: 50,
        required: true,
        unique: true
    },
    // Descrição opcional do Dataset
    description: {
        type: String
    },
    // Caminho do arquivo associado ao Dataset, obrigatório
    filePath: {
        type: String,
        required: [true, "Not file sended"]
    },
    // Referência ao usuário que criou o Dataset
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, 
/**
 * Opções do schema:
 * - timestamps: Adiciona automaticamente as propriedades `createdAt` e `updatedAt` ao schema,
 *   representando a data de criação e a última atualização do documento, respectivamente.
 */
{ timestamps: true });

// Cria o modelo Mongoose com base no schema definido acima
const Datasets = mongoose.model("Datasets", datasetSchema);

export default Datasets;
