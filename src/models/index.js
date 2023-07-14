import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import _ from "lodash";

import { sequelize } from "../database/db";
import runSeeds from '../seeders/seed';

const conectionDB = (async () => {
    let basename = path.basename(module.filename);
    let db = {};
    // Leyendo los modelos del proyecto base.
    let BASE_URL = path.join(__dirname,'../base/models');
    fs.readdirSync(BASE_URL).filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    }).forEach(function (file) {
        const model = require(path.join(BASE_URL, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

    // Leyendo los modelos del proyecto human_capital.
    BASE_URL = path.join(__dirname,'../human_capital/models');
    fs.readdirSync(BASE_URL).filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    }).forEach(function (file) {
        const model = require(path.join(BASE_URL, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

    // Leyendo los modelos del proyecto sale.
    BASE_URL = path.join(__dirname,'../sale/models');
    fs.readdirSync(BASE_URL).filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    }).forEach(function (file) {
        const model = require(path.join(BASE_URL, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

    // Leyendo los modelos del proyecto stock.
    BASE_URL = path.join(__dirname,'../stock/models');
    fs.readdirSync(BASE_URL).filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    }).forEach(function (file) {
        const model = require(path.join(BASE_URL, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

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

    await runAsyncModels();

    return db;
})();

module.exports = conectionDB;
// module.exports = db;