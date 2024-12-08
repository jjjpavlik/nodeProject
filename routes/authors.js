const express = require("express");
const router = express.Router();
const Authors = require("../models/authors");

// Обробка/Створення автора
router.post('/', async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json('Поля не можуть бути порожні');
    }

    try {
        const author = await Authors.create({ name, email });
        res.status(200).json("Автора додано");
    } catch (err) {
        res.status(500).json(`Сталася помилка: ${err.message}`);
    }
});

// Реалізація видалення автора
router.delete("/:authorId", async (req, res) => {
    const { authorId } = req.params;
    const id = Number(authorId);

    if (isNaN(id)) {
        return res.status(400).json("id може бути тільки цифрою");
    }

    try {
        const author = await Authors.findByPk(id);

        if (!author) {
            return res.status(404).json('Id не знайдено');
        }

        await author.destroy();
        res.status(200).json("Успішно видалено");

    } catch (err) {
        res.status(500).json(`Сталася помилка: ${err}`);
    }
});

module.exports = router;
