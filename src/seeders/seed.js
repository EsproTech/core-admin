import fs from "fs";
import path from "path";
const { Sequelize } = require('sequelize');

const runSeeds = async (queryInterface) => {  
  try {
    let basename = path.basename(module.filename);
    let seeds = [];
    fs.readdirSync(__dirname).filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    }).forEach(function (file) {
        const seed = require(path.join(__dirname, file));
        seeds.push(seed);
    });
    // Ejecución de las semillas    
    for (const seed of seeds) {
      await seed.up(queryInterface, Sequelize);
    }
  } catch (err) {
    console.error('Ocurrió un error cargando las semillas', err);
  }
}

module.exports = runSeeds;