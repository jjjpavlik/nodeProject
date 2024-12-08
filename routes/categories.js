const express = require("express");
const router = express.Router();
const Categories = require("../models/categories");

// Обробка/Створення категорії
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        
        // Перевірка на унікальність категорії
        const uniqueCheck = await Categories.findOne({ where: { name } });
        
        if (name === '') {
            return res.status(400).json("Відсутнє ім'я");
        }
        if (uniqueCheck) {
            return res.status(422).json('Категорія вже існує');
        }
        const category = await Categories.create({ name });
        return res.status(200).json('Категорію створено');
    } catch (err) {
        return res.status(500).json('Сталася помилка', err);
    }
});

// Отримання всіх категорій
router.get("/", async (req, res) => {
    try {
        const categories = await Categories.findAll();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json(`Сталася помилка: ${err}`);
    }
});

// Реалізація видалення категорії
router.delete("/:categoryId", async (req, res) => {
    const { categoryId } = req.params;
    const id = Number(categoryId);
    
    if (isNaN(id)) {
        return res.status(400).json("id може бути тільки цифрою");
    }
    
    try {
        const category = await Categories.findByPk(id);
        
        if (!category) {
            return res.status(404).json('Id не знайдено');
        }
        
        await category.destroy();
        res.status(200).json("Успішно видалено");
        
    } catch (err) {
        res.status(500).json(`Сталася помилка: ${err}`);
    }
});

module.exports = router;
