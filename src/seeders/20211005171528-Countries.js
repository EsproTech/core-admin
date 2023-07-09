'use strict';
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");

const countriesList = require('./data/Countries');
const statesList = require('./data/States');

module.exports = {
  up: async (queryInterface, transaction) => {
    try{
      // Poblando la tabla de NmCountry
      const resultCountries = await queryInterface.bulkInsert('NmCountry', countriesList.countries, {
        returning: true
      });

      // Refinando el objeto de un estado o provincia
      const states = statesList.states.map(item => {
        return {
          id: uuidv4(),
          name: item.nombre,
          code: item.id,
          countryId: resultCountries[1].id,
          createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          deleteAt: false
        }
      });

      // Poblando la tabla NmState
      await queryInterface.bulkInsert('NmState', states, {});
    }catch(err){
      console.log("Ocurrio un error cargando las tablas NmCountry / NmState",err);
    }
  }
};
