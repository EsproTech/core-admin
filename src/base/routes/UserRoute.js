import { Router } from "express";

import {
    retrieve,
    list,
    update,
    destroy,
    searchUsers,
    addAddress,
} from "../controllers/UserController";
import isAuthorization from "../../utils/authorization";
const router = Router();

//rutas de usuario
router.get('/search/:filter', isAuthorization, searchUsers);
router.post('/:userId/address', isAuthorization, addAddress);
router.get('/:id', isAuthorization, retrieve);
router.get('/', isAuthorization, list);
router.put('/:id', isAuthorization, update);
router.delete('/:id', isAuthorization, destroy);

module.exports = router;