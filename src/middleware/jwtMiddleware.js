import jwt from "jsonwebtoken";
import { StatusCodes } from 'http-status-codes';

/**
 * Middleware para verificar o token JWT presente nos headers de autorização de uma requisição HTTP.
 * Decodifica o token para verificar se é válido e, em caso positivo, passa o controle para o próximo middleware,
 * caso contrário, retorna um erro de não autorizado.
 *
 * @param {Object} req - O objeto de requisição do Express, usado para acessar os headers de autorização.
 * @param {Object} res - O objeto de resposta do Express, usado para enviar uma resposta de erro caso o token não seja válido.
 * @param {Function} next - A função callback que passa o controle para o próximo middleware na cadeia.
 * @returns {void} - Não retorna um valor. Em caso de sucesso, chama `next()` para continuar a execução do middleware seguinte.
 */
const verifyToken = (req, res, next) => {
    try {
        // O índice do token no header de autorização após 'Bearer '
        const INDICE_TOKEN = 1;

        // Extrai o token do header de autorização
        const token = req.headers.authorization.split(" ")[INDICE_TOKEN];

        // Verifica e decodifica o token usando a chave secreta do ambiente
        const decoded = jwt.verify(token, process.env.SECRET);

        // Armazena o ID do usuário decodificado no objeto de requisição para uso posterior
        req.userID = decoded;

        // Se o token é válido, continua para o próximo middleware
        next();
    } catch (error) {
        // Caso ocorra um erro na verificação do token, envia uma resposta de não autorizado
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "User not authorized" });
        return;
    }
};

export default verifyToken;
