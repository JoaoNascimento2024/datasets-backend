import express from "express";
import {upload} from "../middleware/uploadFileMiddleware.js";
import verifyToken from "../middleware/jwtMiddleware.js";
import { createDataset, deleteDatasets, getDatasets, getDatasetsById, getDatasetsByUser, getDetailsDatasetsById, getDownloadFileByDatasetId } from "../controller/DatasetController.js";
import checkPermission from "../middleware/permissionMiddleware.js";

const router = express.Router();

router.post("/", verifyToken,  upload.single("file"), createDataset);
router.get("/", verifyToken,  getDatasets);
router.get("/user/:userID", verifyToken, getDatasetsByUser);
router.get("/:datasetID", verifyToken, getDatasetsById);
router.delete("/:datasetID", verifyToken, deleteDatasets);
router.get("/details/:datasetID", verifyToken, getDetailsDatasetsById);
router.get("/download/:datasetID", verifyToken, getDownloadFileByDatasetId);

export default router;