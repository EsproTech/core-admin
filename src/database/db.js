import Sequelize from "sequelize";

import { getDb } from "../utils/utils";
const {database, username, password, opts} = getDb();

/**
 * @description Documentación
 * Paso 1: Iniciar con el usuario postgres
 * sudo -i -u postgres
 * Paso 2: psql
 * Paso 3: Crear un rol con permisos
 * CREATE ROLE user WITH LOGIN SUPERUSER CREATEDB CREATEROLE PASSWORD 'pass';
 * Paso 4: Iniciar sessión con el nuevo usuario
 * psql postgres user
 * Paso 5: Problema de acceso por error en el pg_hba
 * nano/etc/postgresql/10/main/pg_hba.conf . Cambiar el método a md5 en local  all all peer (md5)
 * Paso 6: Restartear el proceso de postgres
 * systemctl restart postgresql
 * Paso 7 Iniciar sessión con el usuario y contraseña creada
*/
// Pasos para crear una base de datos nueva y darle permisos a un usuario
// Paso 1. psql postgres
// Paso 2. CREATE DATABASE nombre_base_datos;
// Paso 3. GRANT ALL PRIVILEGES ON DATABASE nombre_base_datos TO nombre_usuario;

exports.sequelize = new Sequelize(
    database,
    username,
    password,
    opts
);