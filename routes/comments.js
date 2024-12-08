const express = require("express");
const router = express.Router();
const Comments = require("../models/comments");
const Articles = require("../models/articles");

// Обробка/Створення коментарів
router.post("/", async (req, res) => {
    const { articleId, content } = req.body;

    // Перевірка наявності статті
    const articleCheck = await Articles.findOne({ where: { id: articleId } });

    if (!articleId || !content) {
        return res.status(400).json('Потрібно заповнити всі поля');
    } else if (!articleCheck) {
        return res.status(404).json('Такої статті не існує');
    }

    try {
        const comment = await Comments.create({ articleId, content });
        return res.status(200).json('Комент успішно додано');
    } catch (err) {
        res.status(500).json(`Сталася помилка при додаванні коментаря: ${err}`);
    }
});

// Отримання всіх коментарів до певної статті
router.get("/comments/:articleId", async (req, res) => {
    const { articleId } = req.params;

    const checkId = Number(articleId);
    if (isNaN(checkId)) {
        return res.status(400).json("Id має складатися з цифр");
    }

    const commentsCheck = await Comments.findOne({ where: { articleId: checkId } });
    if (!commentsCheck) {
        return res.status(404).json('Коментарі до статті відсутні!');
    }

    try {
        const foundComments = await Comments.findAll({ where: { articleId: checkId } });
        res.json(foundComments);
    } catch (err) {
        res.status(500).json(`Сталася помилка: ${err}`);
    }
});

// Реалізація видалення коментаря
router.delete("/:commentId", async (req, res) => {
    const { commentId } = req.params;
    const id = Number(commentId);

    if (isNaN(id)) {
        return res.status(400).json("id може бути тільки цифрою");
    }

    try {
        const comment = await Comments.findByPk(id);
        if (!comment) {
            return res.status(404).json('Id не знайдено');
        }

        await comment.destroy();
        res.status(200).json("Успішно видалено");
    } catch (err) {
        res.status(500).json(`Сталася помилка: ${err}`);
    }
});

module.exports = router;
