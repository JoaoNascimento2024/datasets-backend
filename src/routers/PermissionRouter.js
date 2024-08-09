import express from "express";
import { createPermission, getPermission } from "../controller/PermissionController.js"; 

const router = express.Router();

router.post("/", createPermission);
router.get("/", getPermission);

export default router;