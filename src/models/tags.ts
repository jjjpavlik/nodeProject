import {DataTypes} from "sequelize";
import sequelize from '../config/database';

const Tags = sequelize.define("tags",{
id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
},
name: {
    type: DataTypes.STRING,
    allowNull: false
}
});

export default Tags;