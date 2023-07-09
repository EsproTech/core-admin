import NodeCache from "node-cache";
const myCache = new NodeCache();

exports.setData = async(data)=>{
    try{
        const success = await myCache.mset(data);
        return success;
    }catch(e){
        return false;
    }
}

exports.getData = async(key)=>{
    try{
        const result = await myCache.get(key);
        return result;
    }catch(e){
        return null;
    }
}