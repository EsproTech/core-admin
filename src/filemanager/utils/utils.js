import crypto from "crypto";
import nodeenv from "../config/config";

const getDBKey = key => {
    if(key.length != 32) {
        if(key.length < 32) {
            let quo = Math.floor(32/key.length);
            let rem = 32 % key.length;
            return key.repeat(quo)+key.slice(0,rem);
        } else return key.slice(0,32);
    } else return key;
}

const getDBIV = key => (
    getDBKey(key).toString('hex').slice(0,16)
);

module.exports.encript = function (text) {
    try{
        const KEY_TOKEN = nodeenv.KEY_TOKEN;
        let cipher = crypto.createCipheriv("aes-256-ctr", getDBKey(KEY_TOKEN), getDBIV(KEY_TOKEN));
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted.toString("hex");
    }catch(e){
        console.log(e);
        return null;
    }
  };
  
  module.exports.decrypt = function (text) {
    try{
        const KEY_TOKEN = nodeenv.KEY_TOKEN;
        let encryptedText = Buffer.from(text, "hex");
        let decipher = crypto.createDecipheriv("aes-256-ctr", getDBKey(KEY_TOKEN), getDBIV(KEY_TOKEN));
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString("utf8");
    }catch(e){
        return null;
    }
};

exports.getTokenKey = () => {
    try{
        return nodeenv.KEY_TOKEN;
    }catch(e){
        return null;
    }
}

exports.getPathUpload = ()=>{
    try{
        return nodeenv.PATH_UPLOAD;
    }catch(e){
        return null;
    }
}
