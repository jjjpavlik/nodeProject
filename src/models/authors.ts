import {Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

const Authors = sequelize.define("authors", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Authors;
 