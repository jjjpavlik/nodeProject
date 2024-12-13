require('dotenv').config();

const { types } = require("pg");
const express = require('express');
const sequelize = require('./config/database');
const categoriesRoutes = require('./routes/categories');
const articlesRoutes = require('./routes/articles');
const authorsRoutes = require("./routes/authors");
const commentsRoutes = require("./routes/comments");
const tagsRoutes = require("./routes/tags");
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

