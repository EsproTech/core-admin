'use strict';
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');

module.exports = {
    applications: [
        {
          id: uuidv4(),
          name: 'Punto de venta',
          code: 'PUNTO_VENTA',
          active: true,
          createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          deleteAt: false
        },{
          id: uuidv4(),
          name: 'Ventas',
          code: 'VENTAS',
          active: true,
          createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          deleteAt: false
        }, {
          id: uuidv4(),
          name: 'Compras',
          code: 'COMPRAS',
          active: true,
          createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          deleteAt: false
        },{
          id: uuidv4(),
          name: 'Inventario',
          code: 'INVENTARIO',
          active: true,
          createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          deleteAt: false
        },{
          id: uuidv4(),
          name: 'Capital humano',
          code: 'CAPITAL_HUMANO',
          active: true,
          createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          deleteAt: false
        },{
          id: uuidv4(),
          name: 'Configuraciones',
          code: 'CONFIG',
          active: true,
          createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          deleteAt: false
        }
    ]
}