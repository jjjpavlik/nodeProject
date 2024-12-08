const express = require("express");
const router = express.Router();
const Articles = require("../models/articles");
const Categories = require("../models/categories"); // Додаємо імпорт Categories
const Authors = require("../models/authors");

// Обробка/Створення посту
router.post('/', async (req, res) => {
    const { title, content, authorId, categoryId } = req.body;

    if (!title || !content || !authorId || !categoryId) {
        return res.status(400).json('Поля не можуть бути порожні');
    }

    try {
        const categoryCheck = await Categories.findOne({ where: { id: categoryId } });
        const authorCheck = await Authors.findOne({ where: { id: authorId } });

        if (!categoryCheck) {
            return res.status(404).json("Такої категорії не існує");
        }
        if (!authorCheck) {
            return res.status(404).json("Такого автора не існує");
        }  
        await Articles.create({ title, content, authorId, categoryId });
        res.status(200).json("Стаття успішно створена");
    } catch (err) {
        return res.status(500).json(`Сталася помилка ${err}`);
    }
});

// Отримання всіх статей категорії
router.get("/categories/:categoryId", async (req, res) => {
    const { categoryId } = req.params;
    const checkId = Number(categoryId);

    if (isNaN(checkId)) {
        return res.status(400).json("Id має складатися тільки з цифр");
    }

    const categoryCheck = await Categories.findOne({ where: { id: categoryId } });

    if (!categoryCheck) {
        return res.status(404).json("Неіснуючий id");
    }

    try {
        const articles = await Articles.findAll({ where: { categoryId } });
        if (articles.length === 0){
           return res.status(404).json('Статей по цій категорії не знайдено')
        }
        res.status(200).json(articles);
    } catch (err) {
        return res.status(500).json(`Сталася помилка ${err}`);
    }
});

// Отримання всіх статей автора
router.get("/authors/:authorId", async (req, res) => {
    const { authorId } = req.params;
    const checkId = Number(authorId);

    if (isNaN(checkId)) {
        return res.status(400).json("Id має складатися тільки з цифр");
    }

    const authorCheck = await Authors.findOne({ where: { id: authorId } });

    if (!authorCheck) {
        return res.status(404).json("Неіснуючий id");
    }

    try {
        const articles = await Articles.findAll({ where: { authorId } });
        return articles.length === 0
            ? res.status(404).json('Статей у цього автора не знайдено')
            : res.status(200).json(articles);
    } catch (err) {
        return res.status(422).json(`Сталася помилка ${err}`);
    }
});

// Реалізація видалення статті
router.delete("/:articleId", async (req, res) => {
    const { articleId } = req.params;
    const id = Number(articleId);

    if (isNaN(id)) {
        return res.status(400).json("id може бути тільки цифрою");
    }

    try {
        const article = await Articles.findByPk(id);
        if (!article) {
            return res.status(404).json('Id не знайдено');
        }

        await article.destroy();
        return res.status(200).json("Успішно видалено");
    } catch (err) {
        return res.status(422).json(`Сталася помилка: ${err}`);
    }
});

module.exports = router;
