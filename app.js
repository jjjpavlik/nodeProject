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

// Middleware для обробки даних з форм
app.use(express.json()); // Middleware для роботи з JSON

// Маршрути
app.use('/categories', categoriesRoutes);
app.use("/tags", tagsRoutes);
app.use('/articles', articlesRoutes);
app.use('/authors', authorsRoutes);
app.use('/comments', commentsRoutes);

// Синхронізація бази даних
sequelize.sync({ alter: true })
    .then(() => console.log('База даних синхронізована'))
    .catch(err => console.error(`Помилка: ${err.message}`));

// Запуск сервера на порту 8080
app.listen(8080, () => console.log('Сервер розвернуто на порту 8080'));

