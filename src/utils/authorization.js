import { verifyToken } from "../utils/token";
import Response from "../utils/response";

module.exports = async(req, res, next)=>{
    try{
        const authorization = req.headers.authorization;
        if(authorization!==undefined){
            const user = await verifyToken(authorization);
            if(user){
                req.user = user;
                next();
            }else{
                const resp = Response(203, {}, "El token ha expirado.");
                return res.status(203).json(resp);
            }
        }else{
            const resp = Response(403, {}, "Debe enviar el token de autorización.");
            return res.status(403).json(resp);
        }
    }catch(e){
        const resp = Response(403, {}, "Token inválido.");
        return res.status(403).json(resp);
    }
}