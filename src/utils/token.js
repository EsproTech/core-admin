import { sign, verify, decode } from "jsonwebtoken";
import _ from "lodash";

import { getTokenKey } from "./utils";
const KEY_TOKEN = getTokenKey();

exports.generateToken = async(user)=>{
    try{
        const token = await sign(user, KEY_TOKEN, {expiresIn: "7d"});
        return token;
    }catch(e){
        return null;
    }
}

exports.verifyToken = async(token)=>{
    try{
        const _decode = await verify(token, KEY_TOKEN);
        return _decode;
    }catch(e){
        return null;
    }
}

exports.updateToken = async(token)=>{
    try{
        let user = await decode(token);
        delete user['iat'];
        delete user['exp'];
        const newToken = await sign(user, KEY_TOKEN, {expiresIn: "7d"});
        return newToken;
    }catch(e){
        return null;
    }
}