import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

/**
 * Cria um novo usuário com informações fornecidas através de uma requisição HTTP.
 * A senha do usuário é criptografada antes de salvar no banco de dados.
 *
 * @param {Object} req - O objeto de requisição do Express, que deve conter um corpo com
 *                       'username', 'email' e 'password' no formato JSON.
 * @param {Object} res - O objeto de resposta do Express usado para enviar a resposta ao cliente.
 *                       Retorna o usuário criado com o status 201 em caso de sucesso, ou uma mensagem
 *                       de erro com o status 500 em caso de falhas na operação.
 * @returns {void} - Não retorna um valor, mas envia uma resposta JSON ao cliente.
 */
export async function createUser(req, res){
    try{
        const {username, email, password, profile } = req.body;
        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = new User({username, email, password : hashPassword, profile});
        await newUser.save();

        // Resposta com o status de 'Criado' e os dados do usuário
        res.status(StatusCodes.CREATED).json({ username, email });
    } catch (error) {
        // Em caso de erro, envia uma resposta de 'Erro Interno do Servidor' com a mensagem de erro
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}
