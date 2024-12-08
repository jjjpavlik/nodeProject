const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Tags = sequelize.define("tags",{
id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
},
name: {
    type: Sequelize.STRING,
    allowNull: false
}
});

module.exports = Tags;