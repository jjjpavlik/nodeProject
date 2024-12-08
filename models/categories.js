const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Categories = sequelize.define("categories", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = Categories;
