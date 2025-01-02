import {DataTypes} from 'sequelize';
import sequelize from '../config/database';

const Comments = sequelize.define("comments", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    content:{
      type: DataTypes.TEXT,
      allowNull: false
    } 
});

export default Comments;