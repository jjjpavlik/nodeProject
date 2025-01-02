import {DataTypes} from 'sequelize';
import sequelize from '../config/database';


const Categories = sequelize.define("categories", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

export default Categories;
