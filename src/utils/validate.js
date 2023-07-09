import { checkSchema, validationResult } from "express-validator";
import _ from "lodash";

import Response from "./response";

module.exports = async(req, res, next)=>{
    // reglas de validación
    const registrationSchema = {
        password: {
            isStrongPassword: {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1
            },
            errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number",
        }
    }
    checkSchema(registrationSchema);

    const { errors } = validationResult(req);
    if (_.size(errors)>0) {
        const resp = Response(400, [], ["El usuario y/o contraseña son incorrectas."]);
        return res.status(400).json(resp);        
    }else{
        next();
    }
}