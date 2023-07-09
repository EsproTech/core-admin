import { Router } from "express";

import { retrieve, list, update, create, destroy, addUser } from "../controllers/NotificationController";
import isAuthorization from "../../utils/authorization";
const router = Router();

//routes plan
router.post('/', isAuthorization, create);
router.post('/user', isAuthorization, addUser);
router.get('/:id', isAuthorization, retrieve);
router.get('/', isAuthorization, list);
router.put('/:id', isAuthorization, update);
router.delete('/:id', isAuthorization, destroy);

module.exports = router;