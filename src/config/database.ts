import * as dotenv from 'dotenv';
import {Sequelize} from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'postgres',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || '2002', 
    {

    dialect: "postgres",
    host: process.env.DB_HOST || 'localhost',
    port: Number (process.env.DB_PORT) || 5432,
    
    }
);

export default sequelize;