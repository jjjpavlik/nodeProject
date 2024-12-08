const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const ArticleTags = sequelize.define("articleTags", {
id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull:false
}
});

module.exports = ArticleTags;