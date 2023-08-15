import { Router } from "express";

import { retrieve, list, update, create, destroy } from "../controllers/ProductController";
import isAuthorization from "../../utils/authorization";
const router = Router();

//Listado de rutas del modelo de categoria
router.post('/', isAuthorization, create);
router.get('/:id', isAuthorization, retrieve);
router.get('/', isAuthorization, list);
router.put('/:id', isAuthorization, update);
router.delete('/:id', destroy);

module.exports = router;