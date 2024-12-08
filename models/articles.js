const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Articles = sequelize.define("articles", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

module.exports = Articles;
