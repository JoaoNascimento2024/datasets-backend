/**
 * @module ControllerProfile
 * @Description Funções do controller profile
 */

import Profile from "../models/Profile.js";
import { StatusCodes } from "http-status-codes";

/**
 * Cria um novo perfil com as permissões fornecidas e salva no banco de dados.
 * 
 * @param {Object} req - O objeto de requisição do Express, que contém os dados do perfil no corpo da requisição.
 * @param {Object} res - O objeto de resposta do Express, usado para enviar uma resposta ao cliente.
 * @returns {void} Retorna diretamente uma resposta ao cliente, incluindo o perfil criado ou uma mensagem de erro.
 */
export async function createProfile(req, res) {
    try {
        // Extrai o nome e as permissões do corpo da requisição
        const { name, permissions } = req.body;

        // Cria um novo documento de perfil com os dados fornecidos
        const newProfile = new Profile({ name, permissions });

        // Salva o novo perfil no banco de dados
        await newProfile.save();

        // Responde com o perfil criado e status 201 (Created)
        res.status(StatusCodes.CREATED).json(newProfile);
    } catch (error) {
        // Em caso de falha na criação, responde com status 500 (Internal Server Error) e a mensagem de erro
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

/**
 * Recupera todos os perfis do banco de dados e suas permissões associadas.
 * 
 * @param {Object} req - O objeto de requisição do Express.
 * @param {Object} res - O objeto de resposta do Express, usado para enviar os dados recuperados ao cliente.
 * @returns {void} Retorna uma resposta ao cliente com todos os perfis ou uma mensagem de erro.
 */
export async function getProfile(req, res) {
    try {
        // Busca todos os perfis e popula as permissões associadas
        const profiles = await Profile.find().populate("permissions");

        // Responde com os perfis recuperados e status 200 (OK)
        res.status(StatusCodes.OK).json(profiles);
    } catch (error) {
        // Em caso de falha na recuperação, responde com status 500 (Internal Server Error) e a mensagem de erro
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}
