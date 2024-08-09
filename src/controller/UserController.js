import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

/**
 * CreateUser
 * @param {*} req 
 * @param {*} res 
 */
export async function createUser(req, res){
    try{
        const {username, email, password, profile } = req.body;
        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = new User({username, email, password : hashPassword, profile});
        await newUser.save();
        res.status(StatusCodes.CREATED).json({username, email});
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : error.message});
    }
}