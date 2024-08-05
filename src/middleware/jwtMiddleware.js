import jwt from "jsonwebtoken";
import {StatusCodes} from 'http-status-codes';

const verifyToken = (req, res, next) => {
    try{
        const INDICE_TOKEN = 1;
        const token = req.headers.authorization.split(" ")[INDICE_TOKEN];
        const decoded = jwt.verify(token, process.env.SECRET);
        req.userID = decoded;
        next();
    }catch(error){
        res.status(StatusCodes.UNAUTHORIZED).json({message: "User not autorized"});
        return; 
    }
};

export default verifyToken;