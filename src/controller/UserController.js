import User from "../models/User.js";
import bcrypt from "bcryptjs";

/**
 * CreateUser
 * @param {*} req 
 * @param {*} res 
 */
export async function createUser(req, res){
    try{
        const {username, email, password} = req.body;
        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = new User({username, email, password : hashPassword});
        await newUser.save();
        res.status(201).json({username, email});
    }catch(error){
        res.status(500).json({messageXXX : error.message});
    }
}