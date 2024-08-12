/**
 * @module ControllerPermission
 * @Description Funções do controller permission
 */

import Permission from "../models/Permission.js";
import { StatusCodes } from "http-status-codes";

/**
 * Cria uma nova permissão no sistema e armazena no banco de dados.
 *
 * @param {Object} req - O objeto de requisição do Express, contendo dados da nova permissão no corpo.
 * @param {Object} res - O objeto de resposta do Express.
 * @returns {void} Envia uma resposta ao cliente com a permissão criada ou uma mensagem de erro.
 */
export async function createPermission(req, res) {
    try {
        // Extrai dados de permissão do corpo da requisição
        const { name, description, key } = req.body;

        // Cria um novo documento Permission
        const newPermission = new Permission({ name, description, key });

        // Salva a permissão no banco de dados
        await newPermission.save();

        // Retorna a permissão criada com status 201 (Created)
        res.status(StatusCodes.CREATED).json(newPermission);
    } catch (error) {
        // Em caso de erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

/**
 * Recupera todas as permissões do banco de dados.
 *
 * @param {Object} req - O objeto de requisição do Express.
 * @param {Object} res - O objeto de resposta do Express.
 * @returns {void} Envia uma resposta ao cliente com todas as permissões ou uma mensagem de erro.
 */
export async function getPermission(req, res) {
    try {
        // Busca todas as permissões no banco de dados
        const permissions = await Permission.find();

        // Retorna as permissões encontradas com status 200 (OK)
        res.status(StatusCodes.OK).json(permissions);
    } catch (error) {
        // Em caso de erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}
