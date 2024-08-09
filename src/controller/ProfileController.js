import Profile from "../models/Profile.js";
import { StatusCodes } from "http-status-codes";

export async function createProfile(req, res) {
    try {
        const { name, permissions } = req.body;
        const newProfile = new Profile({ name, permissions });
        await newProfile.save();
        res.status(StatusCodes.CREATED).json(newProfile);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export async function getProfile(req, res) {
    try {
        const profiles = await Profile.find().populate("permissions");
        res.status(StatusCodes.OK).json(profiles);
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}