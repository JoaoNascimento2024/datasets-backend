import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

/**
 * Middleware para verificar se o usuário tem uma permissão específica para acessar uma rota.
 * 
 * @param {string} requiredKeyPermission - A chave da permissão necessária para acessar a rota.
 * @returns {Function} Um middleware express que pode ser usado em rotas específicas para validar permissões.
 */
const checkPermission = (requiredKeyPermission) => async (req, res, next) => {
    try {
        // Índice do token no cabeçalho da autorização (supondo que o esquema seja 'Bearer [token]')
        const INDICE_TOKEN = 1;

        // Extração do token JWT do cabeçalho da autorização
        const token = req.headers.authorization.split(" ")[INDICE_TOKEN];

        // Decodificação do token para obter o ID do usuário
        const decoded = jwt.verify(token, process.env.SECRET);

        // Busca do usuário e população de seu perfil e permissões
        const user = await User.findById(decoded.userID).populate({
            path: "profile",
            populate: { path: "permissions" }
        });

        // Verifica se o usuário foi encontrado
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: ReasonPhrases.UNAUTHORIZED });
        }

        // Verificação se o usuário possui a permissão necessária
        const hasPermission = user.profile.permissions.some(permission =>
            permission.key === requiredKeyPermission);

        // Se não possui permissão, retorna erro de não autorizado
        if (!hasPermission) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: ReasonPhrases.UNAUTHORIZED });
        }

        // Se possui permissão, continua para a próxima função no pipeline de middleware
        next();

    } catch (error) {
        // Em caso de erro na verificação de permissões, retorna erro interno do servidor
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Erro na permissão" });
    }
}

export default checkPermission;
