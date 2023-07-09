import { Router } from "express";

import {
    signIn,
    logIn,
    validateToken,
    changePassword,
    profile,
    changeEmail
} from "../controllers/AuthController";
import validate from "../../utils/validate";
import isAuthorization from "../../utils/authorization";
// import accessControl from "../utils/accessControl";

const router = Router();

/**
 * @api {post} /auth/register Responde un objeto con el usuario logueado, el token y 
 * la lista de comunidades a las que está unidp el usuario
 * @apiName login
 * @apiGroup Auth
 *
 * @apiParam {firstName} Nombres
 * @apiParam {lastName} Apellidos
 * @apiParam {email} Correo
 * @apiParam {password} Contraseña
 *
 * @apiSuccess {string} status  código de respuesta al cliente eje: 200, 400, 404
 * @apiSuccess {json} data  Usuario creado y token de autenticación
 * @apiSuccess {array}  errors Incluye un listado con todos los posibles errores detectados.
 * 
*/
router.post('/signIn', signIn);
/**
 * @api {post} /auth/login Responde un objeto con el usuario logueado, el token y 
 * la lista de comunidades a las que está unidp el usuario
 * @apiName login
 * @apiGroup Auth
 *
 * @apiParam {email} Correo electrónico del usuario
 * @apiParam {password} Contraseña del usuario
 *
 * @apiSuccess {string} status código de respuesta al cliente eje: 200, 400, 404
 * @apiSuccess {json} data Este campo incluye user, los datos del usuario en la base de datos,
 * listCommunities, listado de las comunidades a las que está unido el usuario.
 * Cada comunidad incluye además el rol y los puntos sports del usuario. 
 * he incluye a token, token del usuario logueado.
 * @apiSuccess {array} errors Incluye un listado con todos los posibles errores detectados.
 * 
*/
router.post('/logIn', validate, logIn);

/**
 * @api {post} /auth/login Responde un objeto con el usuario logueado, el token y 
 * la lista de comunidades a las que está unidp el usuario
 * @apiName login
 * @apiGroup Auth
 * @apiHeader authorization  Cabecera con el token de autorización
 *
 *
 * @apiSuccess {string} status código de respuesta al cliente eje: 200, 400, 404
 * @apiSuccess {json} data  Se envía el token actualizado
 * @apiSuccess {array} errors Incluye un listado con todos los posibles errores detectados.
 * 
*/
router.get('/validateToken', isAuthorization, validateToken);

router.post('/change/password', isAuthorization, changePassword);

router.put('/change/email/:id', isAuthorization, changeEmail);

router.put('/profile/:id', isAuthorization, profile);

module.exports = router;