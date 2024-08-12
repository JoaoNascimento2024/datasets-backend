/**
 * @module ModelsPermission
 * @Description Funções do model permission
 */

import mongoose from "mongoose";

/**
 * Schema para a coleção de Permissions no MongoDB. Define as propriedades para cada
 * campo no documento de Permission, incluindo validações de tipo e obrigatoriedade.
 */
const permissionSchema = new mongoose.Schema({
    // Nome da permissão, um campo obrigatório com validação para garantir que seja fornecido
    name: { type: String, required: [true, "Obrigatory field name"] },
    // Descrição opcional da permissão
    description: { type: String },
    // Chave única que pode ser usada para referenciar a permissão em verificações de autorização
    key: { type: String }
}, 
/**
 * Opções do schema:
 * - versionKey: Desabilita a propriedade __v no documento que é usada para controlar as versões dos documentos.
 * - timestamps: Adiciona automaticamente as propriedades `createdAt` e `updatedAt` ao schema,
 *   representando a data de criação e a última atualização do documento, respectivamente.
 */
{ versionKey: false, timestamps: true });

// Cria o modelo Mongoose com base no schema definido acima
const Permission = mongoose.model("Permission", permissionSchema);

export default Permission;
