'use strict';
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');

module.exports = {
    companies: [
        {
            id: uuidv4(),
            code: "ESPROTECH",
            email: "esprotech@gmail.com",
            name: "EsproTech",
            createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
            updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
            deleteAt: false
        },
        {
            id: uuidv4(),
            code: "LC",
            email: "cunnadas@gmail.com",
            name: "Las cuñadas",
            createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
            updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
            deleteAt: false
        },
        {
            id: uuidv4(),
            code: "M-LT",
            email: "muebles_lt@gmail.com",
            name: "Mueblería LT",
            createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
            updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
            deleteAt: false
        }
    ]
}