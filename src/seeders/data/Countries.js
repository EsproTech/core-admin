const moment = require("moment");
const { v4: uuidv4 } = require('uuid');

module.exports = {
    countries: [
        {   
            id: uuidv4(),
            name:"Cuba",
            code:"cu",
            createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
            updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
            deleteAt: false
        },{
            id: uuidv4(),
            name:"Argentina",
            code:"ar",
            createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
            updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
            deleteAt: false
        },{
            id: uuidv4(),
            name:"Estados Unidos",
            code:"eeuu",
            createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
            updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
            deleteAt: false
        }
    ]
}