'use strict';
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
    const unit = [
        {
          id: uuidv4(),
          name: 'Metro',
          createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          deleteAt: false
        },
        {
          id: uuidv4(),
          name: 'Litro',
          createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          deleteAt: false
        },
        {
          id: uuidv4(),
          name: 'Gramo',
          createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          deleteAt: false
        },
        {
          id: uuidv4(),
          name: 'Kilogramo',
          createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          deleteAt: false
        },{
          id: uuidv4(),
          name: 'Piezas',
          createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          deleteAt: false
        }];
      await queryInterface.bulkInsert('NmUnitMeasurement', unit, {});
    }catch(err){
      console.log("Ocurrio un error cargando la tablas NmUnitMeasurement",err);
    }
  }
};
