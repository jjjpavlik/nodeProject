const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Comments = sequelize.define("comments", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    content:{
      type: Sequelize.TEXT,
      allowNull: false
    } 
});

module.exports = Comments;