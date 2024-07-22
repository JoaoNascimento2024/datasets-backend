import express from "express";
import {upload} from "../middleware/uploadFileMiddleware.js";
import { createDataset, getDatasets } from "../controller/DatasetController.js";

const router = express.Router();

router.post("/", upload.single("file"), createDataset);
router.get("/", getDatasets);

export default router;