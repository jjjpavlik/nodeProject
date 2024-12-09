const express = require("express");
const router = express.Router();
const Categories = require("../models/categories");

// Processing/Creating a category
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        
        // Check for category uniqueness
        const uniqueCheck = await Categories.findOne({ where: { name } });
        
        if (name === '') {
            return res.status(400).json("Missing name");
        }
        if (uniqueCheck) {
            return res.status(422).json('Category already exists');
        }
        const category = await Categories.create({ name });
        return res.status(200).json('Category created');
    } catch (err) {
        return res.status(500).json(`An error occurred: ${err}`);
    }
});

// Get all categories
router.get("/", async (req, res) => {
    try {
        const categories = await Categories.findAll();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});

// Implementing category deletion
router.delete("/:categoryId", async (req, res) => {
    const { categoryId } = req.params;
    const id = Number(categoryId);
    
    if (isNaN(id)) {
        return res.status(400).json("id can only be a number");
    }
    
    try {
        const category = await Categories.findByPk(id);
        
        if (!category) {
            return res.status(404).json('Id not found');
        }
        
        await category.destroy();
        res.status(200).json("Successfully deleted");
        
    } catch (err) {
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});

module.exports = router;
