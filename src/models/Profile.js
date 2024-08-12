/**
 * @module ModelsProfile
 * @Description Funções do model profile
 */

import mongoose from "mongoose";

/**
 * Schema para a coleção de Profiles no MongoDB. Define as propriedades para cada
 * campo no documento de Profile, incluindo validações e relações com outros modelos.
 */
const profileSchema = new mongoose.Schema({
    // Nome do perfil, um campo obrigatório com validação para garantir que seja fornecido
    name: { type: String, required: [true, "Obrigatory field name"] },
    // Array de ObjectId que referencia o modelo Permission, representando as permissões associadas ao perfil
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }]
}, 
/**
 * Opções do schema:
 * - versionKey: Desabilita a propriedade __v no documento, que é usada pelo Mongoose para controlar as versões dos documentos.
 * - timestamps: Adiciona automaticamente as propriedades `createdAt` e `updatedAt` ao schema,
 *   representando a data de criação e a última atualização do documento, respectivamente.
 */
{ versionKey: false, timestamps: true });

// Cria o modelo Mongoose com base no schema definido acima
const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
