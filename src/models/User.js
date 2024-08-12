/**
 * @module ModelsUser
 * @Description Funções do model user
 */

import mongoose from "mongoose";

/**
 * Schema para a coleção de Users no MongoDB. Define as propriedades e as regras de validação para cada
 * campo no documento User, incluindo validações de tipo, obrigatoriedade, unicidade e formato.
 */
const userSchema = new mongoose.Schema({
    // Nome de usuário, um campo obrigatório com validação para garantir que seja fornecido
    username: { type: String, required: [true, "Obrigatory field username"] },
    // Email do usuário, deve ser único e válido conforme o padrão RFC 2822
    email: {
        type: String,
        required: [true, "Obrigatory field email"],
        unique: [true, "Email already exists"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    // Senha do usuário, um campo obrigatório com validação para garantir que seja fornecido
    password: { type: String, required: [true, "Obrigatory field password"] },
    // Referência ao perfil do usuário associado a este documento
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" }
}, 
/**
 * Opções do schema:
 * - versionKey: Desabilita a propriedade __v no documento, que é usada pelo Mongoose para controlar as versões dos documentos.
 * - timestamps: Adiciona automaticamente as propriedades `createdAt` e `updatedAt` ao schema,
 *   representando a data de criação e a última atualização do documento, respectivamente.
 */
{ versionKey: false, timestamps: true });

// Cria o modelo Mongoose com base no schema definido acima
const User = mongoose.model("User", userSchema);

export default User;
