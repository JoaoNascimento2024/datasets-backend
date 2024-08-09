import express from "express";
import { createProfile, getProfile } from "../controller/ProfileController.js"; 

const router = express.Router();

router.post("/", createProfile);
router.get("/", getProfile);

export default router;