import Sequelize from "sequelize";
import sequelize from "../config/database";

const articlesTags = sequelize.define("articlesTags", {
id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull:false
}
});

export default articlesTags;