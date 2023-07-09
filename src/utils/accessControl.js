import _ from "lodash";
import { accessControlKey } from "../utils/utils";
import Response from "../utils/response";
import permissons from "../config/permissions";
import { getRolesByUserId } from "../controllers/UserController";

const includePartOfPath = (ENDPOINTS, ORIGINAL_URL, METHOD, ROL_USER) =>{
    let include = false;
    for(let i=0; i<_.size(ENDPOINTS); i++){
        if(ENDPOINTS[i].indexOf('/ID')>-1 && ENDPOINTS[i].indexOf(ORIGINAL_URL)<0){
            const keyEndPoint = ENDPOINTS[i].replace(/\/ID/g,'');
            const splitOriginalUrl = ORIGINAL_URL.split(keyEndPoint);
            if(ORIGINAL_URL.indexOf(keyEndPoint)>-1 && _.size(splitOriginalUrl)===2){
                include = true;
            }
        }else if(METHOD==='DELETE' && ROL_USER==='ROLE_ADMIN' 
            && ORIGINAL_URL.indexOf('/v1/companion')){
            include = true;
        }else if(METHOD==='GET' && ROL_USER!==null 
                && ORIGINAL_URL.indexOf('/v1/auth/access')){
            if(_.size(ORIGINAL_URL.split("/"))===6) include = true;
        }
    }
    return include;
}

module.exports = async(req, res, next)=>{
    const key = req.headers['x-api-key'];
    if(key!==undefined){
        const local = await accessControlKey();
        if(local===key){
            let ORIGINAL_URL = req.originalUrl;
            ORIGINAL_URL = (ORIGINAL_URL.indexOf('?')>-1 ? ORIGINAL_URL.split('?')[0] : ORIGINAL_URL);
            const METHOD = req.method;
            let ENDPOINTS = [];
            /**
             * P1: Si la URL está incluida en el listado de endpoints público se permite continuar.
             * P2: Si la URL no está contenida literalmente pero una parte de ella si y lo demás es 
             * un ID se evalúa si tiene permisos.
             * P3: 
            */
            if(ENDPOINTS.includes(ORIGINAL_URL)){
                next();
            }else if(METHOD !== 'POST' && includePartOfPath(ENDPOINTS, ORIGINAL_URL, METHOD, null)){
                next();
            }else{
                const userId = req.user.id;
                const communityId = req.headers.communityid;
                if(communityId!==undefined){
                    const ROL_USER = await getRolesByUserId(userId, communityId);
                    switch(ROL_USER) {
                        case "OPENBOT":
                            next();
                            break;
                        case "ROLE_SA":
                            next();
                            break;
                        case "ROLE_ADMIN":
                            const { ADMINISTRADOR } = permissons;
                            ENDPOINTS = ADMINISTRADOR[METHOD];
                            if(ENDPOINTS.includes(ORIGINAL_URL)){
                                next();
                            }else if(METHOD !== 'POST' && includePartOfPath(ENDPOINTS, ORIGINAL_URL, METHOD, 'ROLE_ADMIN')){
                                next();
                            }else{
                                const resp = Response(403, {}, "Ups, no tiene permisos para acceder al recurso solicitado.");
                                return res.status(403).json(resp);
                            }
                            break;
                        case "ROLE_SEG":
                            const { SEGURIDAD } = permissons;
                            ENDPOINTS = SEGURIDAD[METHOD];
                            if(ENDPOINTS.includes(ORIGINAL_URL)){
                                next();
                            }else if(METHOD !== 'POST' && includePartOfPath(ENDPOINTS, ORIGINAL_URL, METHOD, 'ROLE_SEG')){
                                next();
                            }else{
                                const resp = Response(403, {}, "Ups, no tiene permisos para acceder al recurso solicitado.");
                                return res.status(403).json(resp);
                            }
                            break;
                        case "ROLE_CLIENT":
                            const { CLIENTE } = permissons;
                            ENDPOINTS = CLIENTE[METHOD];
                            if(ENDPOINTS.includes(ORIGINAL_URL)){
                                next();
                            }else if(METHOD !== 'POST' && includePartOfPath(ENDPOINTS, ORIGINAL_URL, METHOD, 'ROLE_CLIENT')){
                                next();
                            }else{
                                const resp = Response(403, {}, "Ups, no tiene permisos para acceder al recurso solicitado.");
                                return res.status(403).json(resp);
                            }
                            break;
                        default:
                            const resp = Response(403, {}, "Ups, no tiene permisos para acceder al recurso solicitado.");
                            return res.status(403).json(resp);
                            break;
                    }
                }else{
                    const resp = Response(403, {}, "Debe enviar el id de la comunidad.");
                    return res.status(403).json(resp);
                }
            }            
        }else{
            const resp = Response(403, {}, "Ups, el usuario no tiene permisos para acceder al recurso solicitado.");
            return res.status(403).json(resp);
        }
    }else{
        const resp = Response(403, {}, "Ups,el usuario no tiene permisos para acceder al recurso solicitado.");
        return res.status(403).json(resp);
    }
}