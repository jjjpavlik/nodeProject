const express = require("express");
const router = express.Router();
const Tags = require("../models/tags");
const Articles = require("../models/articles");
const ArticleTags = require("../models/ArticleTags");

// Обробка/Створення коментарів
router.post('/', async (req, res) => {
    try {
        const {name, articlesId} = req.body;
        console.log(name, articlesId)
        const articlCheck = await Articles.findOne({ where: { id: articlesId } });
        
        if (!name || !articlesId ) {
            return res.status(400).json("Всі поля мають бути  заповнені");
        }
        if (!articlCheck) {
            return res.status(404).json('Статтю не знайдено');
        }
        const tags = await Tags.create({ name });
        await tags.addArticles(articlCheck);
        res.status(200).json('Категорію додано до статті');

    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;