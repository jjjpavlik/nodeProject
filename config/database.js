const { types } = require("pg");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("postgres", "postgres", "2002", {
    dialect: "postgres",
    host: "localhost",
    port: 5432
});

module.exports = sequelize;