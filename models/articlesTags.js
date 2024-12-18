const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const articlesTags = sequelize.define("articlesTags", {
id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull:false
}
});

module.exports = articlesTags;