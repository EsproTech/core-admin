import { Router } from "express";

import { uploadFiles, getFileByPath } from "../controllers/FileController";
const router = Router();

router.post('/', uploadFiles);
router.get('/', getFileByPath);

module.exports = router;