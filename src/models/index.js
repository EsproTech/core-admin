import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import _ from "lodash";

import { sequelize } from "../database/db";
import runSeeds from '../seeders/seed';
import BASE_MODULES_URL from './module.config';

// Leyendo los modelos del proyecto.
let basename = path.basename(module.filename);
let db = {};
for (let i = 0; i < BASE_MODULES_URL.length; i++) {
    let BASE_URL = BASE_MODULES_URL[i];
    fs.readdirSync(BASE_URL).filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    }).forEach(function (file) {
        const model = require(path.join(BASE_URL, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });
}
_.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

const runAsyncModels = async () => {
    // Métodos para sincronizar los modelos a la base de datos
    await sequelize.sync({ force: true });
    // await sequelize.sync();
    // sequelize.sync({ alter: true});
    const queryInterface = await sequelize.getQueryInterface();
    const transaction = await sequelize.transaction();
    await runSeeds(queryInterface, transaction);
}
runAsyncModels();

module.exports = db;