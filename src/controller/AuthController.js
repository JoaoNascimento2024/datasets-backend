import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

/**
 * Autentica um usuário baseado no email e senha fornecidos.
 *
 * @param {Object} req - O objeto de requisição do Express, contendo os dados enviados pelo usuário.
 * @param {Object} res - O objeto de resposta do Express, usado para enviar uma resposta ao cliente.
 * @returns {void} Retorna diretamente uma resposta ao cliente, podendo ser um token JWT ou uma mensagem de erro.
 */
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Procura por um usuário no banco de dados usando o email fornecido
    const user = await User.findOne({ email });
    
    // Verifica se o usuário existe
    if (!user) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "User not exist" });
        return;
    }

    // Compara a senha fornecida com a senha hash armazenada
    if (!await bcrypt.compare(password, user.password)) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "Password error" });
        return;
    }

    const token = jwt.sign({userID : user._id}, process.env.SECRET,{ expiresIn : "1h"});
    res.status(StatusCodes.OK).json({token})

};

