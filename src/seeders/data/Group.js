const moment = require("moment");
const { v4: uuidv4 } = require('uuid');

module.exports = {
    groups: [
      {
        id: uuidv4(),
        name: 'Punto de venta: Administrador',
        code: 'P_V_ADMIN',
        createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        deleteAt: false
      },
      {
        id: uuidv4(),
        name: 'Punto de venta: Supervisor',
        code: 'P_V_SUPERVISOR',
        createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        deleteAt: false
      },
      {
        id: uuidv4(),
        name: 'Punto de venta: Operador',
        code: 'P_V_OPERADOR',
        createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        deleteAt: false
      },
      {
        id: uuidv4(),
        name: 'Venta: Administrador',
        code: 'VENTA_ADMIN',
        createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        deleteAt: false
      },
      {
        id: uuidv4(),
        name: 'Venta: Supervisor',
        code: 'VENTA_SUPERVISOR',
        createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        deleteAt: false
      },
      {
        id: uuidv4(),
        name: 'Venta: Operador',
        code: 'VENTA_OPERADOR',
        createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        deleteAt: false
      },
      {
        id: uuidv4(),
        name: 'Compra: Administrador',
        code: 'COMPRA_ADMIN',
        createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        deleteAt: false
      },
      {
        id: uuidv4(),
        name: 'Compra: Supervisor',
        code: 'COMPRA_SUPERVISOR',
        createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        deleteAt: false
      },
      {
        id: uuidv4(),
        name: 'Compra: Operador',
        code: 'COMPRA_OPERADOR',
        createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        deleteAt: false
      },
      {
        id: uuidv4(),
        name: 'Inventario: Administrador',
        code: 'INVENTARIO_ADMIN',
        createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        deleteAt: false
      },
      {
        id: uuidv4(),
        name: 'Inventario: Supervisor',
        code: 'INVENTARIO_SUPERVISOR',
        createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        deleteAt: false
      },
      {
        id: uuidv4(),
        name: 'Inventario: Operador',
        code: 'INVENTARIO_OPERADOR',
        createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        deleteAt: false
      },
      {
        id: uuidv4(),
        name: 'Capital humano: Administrador',
        code: 'C_H_ADMIN',
        createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        deleteAt: false
      },
      {
        id: uuidv4(),
        name: 'Capital humano: Supervisor',
        code: 'C_H_SUPERVISOR',
        createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        deleteAt: false
      },
      {
        id: uuidv4(),
        name: 'Capital humano: Operador',
        code: 'C_H_OPERADOR',
        createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        deleteAt: false
      },
      {
        id: uuidv4(),
        name: 'Configuraciones: Administrador',
        code: 'CONF_ADMIN',
        createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        deleteAt: false
      },
      {
        id: uuidv4(),
        name: 'Configuraciones: Supervisor',
        code: 'CONF_SUPERVISOR',
        createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        deleteAt: false
      },
      {
        id: uuidv4(),
        name: 'Configuraciones: Operador',
        code: 'CONF_OPERADOR',
        createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
        deleteAt: false
      }
    ]
}