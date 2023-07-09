import { hash, compare } from "bcrypt";
import crypto from "crypto";
import moment from "moment";
import _ from "lodash";

const saltRounds = 10;
import nodeenv from "../config/config";

exports.generateHash = async(text)=>{
    try{
        const _hash = await hash(text, saltRounds);
        return _hash;
    }catch(e){
        return text;
    }
}

exports.compareHash = async(text,hash)=>{
    try{
        const _compare = await compare(text, hash);        
        return _compare;
    }catch(e){
        return false;
    }
}

exports.getTokenKey = ()=>{
    try{
        return nodeenv['ENV'][nodeenv.NODE_ENV].KEY_TOKEN;
    }catch(e){
        return null;
    }
}

exports.getPort = ()=>{
    try{
        return nodeenv['ENV'][nodeenv.NODE_ENV].PORT;
    }catch(e){
        return 6000;
    }    
}

exports.getDb = ()=>{
    try{
        return nodeenv['ENV'][nodeenv.NODE_ENV].DB;
    }catch(e){
        return {};
    }
}

exports.getEnv =()=>{
    try{
        return nodeenv['ENV'];
    }catch(e){
        return 'dev';
    }
}

exports.createdUpdateAt = ()=>{
    return {
        createdAt:moment().format('MM/DD/YYYY HH:mm:ss'),
        updatedAt:moment().format('MM/DD/YYYY HH:mm:ss')
    }
}

exports.updatedAt = ()=>{
    return {
        updatedAt:moment().format('MM/DD/YYYY HH:mm:ss')
    }
}

exports.cleanExtraData = (country)=>{    
    delete country['deleteAt'];
    delete country['createdAt'];
    delete country['updatedAt'];
    return country;
}

exports.getOffset = (page, limit) => {
    const _page = (!_.isUndefined(page) ? page : 1);
    const _limit = (!_.isUndefined(limit) ? limit : 10);
    return (_page * _limit) - _limit;
}

exports.accessControlKey = () => {
    try{
        return nodeenv['ENV'][nodeenv.NODE_ENV].KEY;
    }catch(e){
        return null;
    }
}

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
        const KEY_TOKEN = nodeenv['ENV'][nodeenv.NODE_ENV].KEY_TOKEN;
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
        const KEY_TOKEN = nodeenv['ENV'][nodeenv.NODE_ENV].KEY_TOKEN;
        let encryptedText = Buffer.from(text, "hex");
        let decipher = crypto.createDecipheriv("aes-256-ctr", getDBKey(KEY_TOKEN), getDBIV(KEY_TOKEN));
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString("utf8");
    }catch(e){
        return null;
    }
};

module.exports.formatDates = function (data) {
    const { dateStart, dateEnd } = data;
    if(dateStart && dateEnd){
        let _dateStart = moment(dateStart).format('YYYY-MM-DD HH:mm');
        let _dateEnd =  moment(dateEnd).format('YYYY-MM-DD HH:mm');
        data = {...data, ... { dateStart:_dateStart, dateEnd:_dateEnd }};
    }
    return data;
}

// Formato de fecha para todos los accesos
const formatDatesShifts = function (shift) {
    const { startHour, endHour } = shift;
    let _startHour = moment(startHour).format('YYYY-MM-DD HH:mm');
    let _endHour =  moment(endHour).format('YYYY-MM-DD HH:mm');
    shift = {...shift, ... { startHour:_startHour, endHour:_endHour }};
    return shift;
}

module.exports.formatShiftList = function (newSpace) {
    let newListShiftsFormat = [];
    let listShiftsFormat = newSpace.shifts;
    for(let j=0; j<_.size(listShiftsFormat); j++){
        const newFormats = formatDatesShifts(listShiftsFormat[j].dataValues);
        newListShiftsFormat.push(newFormats);
    }
    return newListShiftsFormat;
}

module.exports.formatDatesShifts = formatDatesShifts;