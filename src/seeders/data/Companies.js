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
        }
    ]
}