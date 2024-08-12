/**
 * @module ControllerAuth
 * @Description Funções do controller auth
 */

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

/**
 * Autentica um usuário verificando se o email e senha fornecidos são válidos.
 * Em caso de sucesso, gera e retorna um token JWT. Caso contrário, retorna erro.
 *
 * @param {Object} req - O objeto de requisição do Express, contendo email e senha no corpo.
 * @param {Object} res - O objeto de resposta do Express.
 * @returns {void} Retorna uma resposta ao cliente, podendo ser um token JWT ou uma mensagem de erro.
 */
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "User not exist" });
        return;
    }

    if (!await bcrypt.compare(password, user.password)) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "Password error" });
        return;
    }

    const token = jwt.sign({userID : user._id}, process.env.SECRET, { expiresIn : "1h"});
    res.status(StatusCodes.OK).json({token});
};

/**
 * Renova um token JWT existente usando um refresh token fornecido.
 * Valida o refresh token e emite um novo JWT se o token for válido.
 *
 * @param {Object} req - O objeto de requisição do Express, contendo o refresh token no corpo.
 * @param {Object} res - O objeto de resposta do Express.
 * @returns {void} Retorna uma resposta ao cliente, podendo ser um novo token JWT ou uma mensagem de erro.
 */
export const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    try {
        const decoded = jwt.verify(refreshToken, process.env.SECRET);
        const userId = decoded.userID;
        const token = jwt.sign({ userID: userId }, process.env.SECRET, { expiresIn: "1h" });
        res.status(StatusCodes.OK).json({token});
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid refresh token' });
    }
};
