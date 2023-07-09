import multer from "multer";
import { existsSync } from 'fs';
import mkdirp from "mkdirp";
import _ from "lodash";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import { encript, getPathUpload, decrypt } from "../utils/utils";
import Response from "../utils/response";

export async function uploadFiles(req, res){
    console.log('uploadFiles');
    try{
        let pathFile = '';
        let pathFileInternal = '';
        const { id } = req.query;
        let PUpload = new Promise(async(resolve, reject)=>{
            const defaultPath = await getPathUpload();
            pathFileInternal = id;
            pathFile = path.join(defaultPath, pathFileInternal);
            let storage = multer.diskStorage({
                destination: async (req, file, callback)=>{
                    if (!existsSync(pathFile)){
                        await mkdirp(pathFile);
                        callback(null, pathFile);
                    }else{
                        callback(null, pathFile);
                    }
                },
                filename: async (req, file, callback)=>{
                    const ext = _.get(file,["mimetype"],"").split('/')[1];
                    let name = await `${uuidv4()}`;
                    pathFile = await encript(path.join(pathFileInternal,`${name}.${ext}`));
                    callback(null, `${name}.${ext}`);
                }
            });
            
            let uploadFiles = multer({ storage: storage }).array("file");
            uploadFiles(req, res, (err)=>{
                if(!err){
                    resolve("");
                }else{
                    reject(err);
                }
            });
        });
        PUpload.then((data) => {
            const resp = Response(200, {path:pathFile}, false);
            return res.status(200).json(resp);
        }).catch((error) => {
            const resp = Response(500, {}, true);
            return res.status(500).json(resp);
        });
    }catch(e){        
        const resp = Response(500, {}, true);
        return res.status(500).json(resp);
    }
}

export async function getFileByPath(req, res){
    try{
        const { path } = req.query;
        if(path){
            const pathFileInternal = await decrypt(path);
            if(pathFileInternal){
                const defaultPath = await getPathUpload();
                return res.status(200).sendFile(pathFileInternal, { root: defaultPath })
            }else{
                const resp = Response(404, {},true);
                return res.status(404).json(resp);
            }
        }else{
            const resp = Response(404, {}, true);
            return res.status(404).json(resp);
        }        
    }catch(e){
        console.log(e);
        const resp = Response(500, {}, true);
        return res.status(500).json(resp);
    }
}