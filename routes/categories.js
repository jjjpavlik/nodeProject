const express = require("express");
const router = express.Router();
const Categories = require("../models/categories");

// Create Categories
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
        res.status(200).json('Category created');
    } catch (err) {
        return res.status(500).json(`An error occurred: ${err.message}`);
    }
});

// Read Categories
router.get("/", async (req, res) => {
    try {
        const categories = await Categories.findAll();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});
// Update Categories
router.put('/', async (req, res) =>{
    try{
        const{ categoryId, name }  = req.body;
        const categoryCheck = await Categories.findOne({where: {id: categoryId}});
        if (!categoryCheck || !categoryId || !name){
            return res.status(422).json("There is no such category.");
        }
        await Categories.update({name}, {where: {id: categoryId}});
        res.status(200).json("Category updated")
    }catch(err){
        return res.status(500).json(`An error occurred: ${err.message}`);
    }
});

// Delete Categories
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
