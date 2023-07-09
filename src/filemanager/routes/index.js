import { Router } from "express";

import FileRoute from "./FileRoute";
const router = Router();

router.use('/files', FileRoute);

module.exports = router;