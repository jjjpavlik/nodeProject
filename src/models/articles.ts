import {Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

const Articles = sequelize.define("articles", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

export default Articles;
