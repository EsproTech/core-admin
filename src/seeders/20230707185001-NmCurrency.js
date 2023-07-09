'use strict';
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");

module.exports = {
  async up (queryInterface, Sequelize) {   
    try{
      const currencies = [
        {
          id: uuidv4(),
          name: 'Pesos argentinos',
          code:'ARS',
          simbol: '$',
          active: true,
          createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          deleteAt: false
        },
        {
          id: uuidv4(),
          name: 'Pesos cubanos',
          code:'CUP',
          simbol: '$',
          active: true,
          createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          deleteAt: false
        }];
      await queryInterface.bulkInsert('NmCurrency', currencies, {});
    }catch(err){
      console.log("Ocurrio un error cargando la tablas NmCurrency",err);
    }
  }
};
