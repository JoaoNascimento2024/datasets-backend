import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

const checkPermission = (requiredKeyPermission) => async (req, res, next) => {
    try {
        const INDICE_TOKEN = 1;
        const token = req.headers.authorization.split(" ")[INDICE_TOKEN];
        const decoded = jwt.verify(token, process.env.SECRET);

        const user = await User.findById(decoded.userID).populate({
            path: "profile",
            populate: { path: "permissions" }
        });

        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: ReasonPhrases.UNAUTHORIZED });
        }

        const hasPermission = user.profile.permissions.some(permission =>
            permission.key === requiredKeyPermission);

        if (!hasPermission) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: ReasonPhrases.UNAUTHORIZED });
        }

        next();

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : "Erro na permissão"});
    }
}

export default checkPermission;