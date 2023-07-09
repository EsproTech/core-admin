import { Router } from "express";

import { retrieve, list, update, create, destroy } from "../controllers/CustomerController";
import isAuthorization from "../../utils/authorization";
const router = Router();

//Rutas de localidades
router.post('/', isAuthorization, create);
router.get('/:id', isAuthorization, retrieve);
router.get('/', isAuthorization, list);
router.put('/:id', isAuthorization, update);
router.delete('/:id', isAuthorization, destroy);

module.exports = router;