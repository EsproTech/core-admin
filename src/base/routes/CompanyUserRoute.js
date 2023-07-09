import { Router } from "express";

import { list } from "../controllers/CompanyUserController";
// import isAuthorization from "../../utils/authorization";
const router = Router();

//Listado de rutas del modelo de usuarios por compañía
router.get('/', list);

module.exports = router;