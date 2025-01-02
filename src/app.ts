import * as dotenv from 'dotenv';
import { types } from 'pg';1
import express, {Application, Request, Response} from 'express';
import sequelize from './config/database';
import categoriesRoutes from './routes/categories';
import articlesRoutes from './routes/articles';
import authorsRoutes from './routes/authors';
import commentsRoutes from './routes/comments';
import tagsRoutes from './routes/tags';

const { Categories, Articles, Authors, Comments, Tags } = require("./models/associations");

const app = express();

// Middleware for processing data from forms
app.use(express.json()); // Middleware for working with JSON

// Routes
app.use('/categories', categoriesRoutes);
app.use("/tags", tagsRoutes);
app.use('/articles', articlesRoutes);
app.use('/authors', authorsRoutes);
app.use('/comments', commentsRoutes);

// Database synchronization
sequelize.sync({ alter: true })
    .then(() => console.log('Database synchronized'))
    .catch(err => console.error(`An error occurred: ${err.message}`));

// API start
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('The server is deployed on port 8080'));

