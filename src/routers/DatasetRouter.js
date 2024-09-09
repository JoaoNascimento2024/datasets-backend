import express from "express";
import {upload} from "../middleware/uploadFileMiddleware.js";
import verifyToken from "../middleware/jwtMiddleware.js";
import { createDataset, getDatasets, getDatasetsByUser } from "../controller/DatasetController.js";
import checkPermission from "../middleware/permissionMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, checkPermission("CREATE_DATASET"),  upload.single("file"), createDataset);
router.get("/", verifyToken, checkPermission("GET_DATASET"), getDatasets);
router.get("/:userID", verifyToken, checkPermission("GET_DATASET"), getDatasetsByUser);

export default router;