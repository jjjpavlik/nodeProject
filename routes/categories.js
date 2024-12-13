const express = require("express");
const { z } = require("zod");
const router = express.Router();
const Categories = require("../models/categories");
const {createCategoriesSchema, updateCategoriesSchema, deleteCategoriesSchema} = require("../validationSchems/categories");

// Create Categories
router.post("/", async (req, res) => {
    try {
        const validationData = createCategoriesSchema.parse(req.body);

        // Check for category uniqueness
        const uniqueCheck = await Categories.findOne({ where: { name: validationData.name } });
        if (uniqueCheck) {
            return res.status(409).json("Category already exists");
        }

        await Categories.create({ name: validationData.name });
        res.status(201).json("Category created");
    } catch (err) {
        if (err.name === "ZodError") {
            return res.status(400).json(err.errors);
        }

        res.status(500).json(`An error occurred: ${err.message}`);
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
router.put("/", async (req, res) => {
    try {
        const validationData = updateCategoriesSchema.parse(req.body);

        const categoryCheck = await Categories.findOne({ where: { id: validationData.categoryId } });
        if (!categoryCheck) {
            return res.status(404).json("There is no such category");
        }

        await Categories.update({ name: validationData.name }, { where: { id: validationData.categoryId } });
        res.status(200).json("Category updated");
    } catch (err) {
        if (err.name === "ZodError") {
            return res.status(400).json(err.errors);
        }

        res.status(500).json(`An error occurred: ${err.message}`);
    }
});

// Delete Categories
router.delete("/", async (req, res) => {
    try {
        const validationData = deleteCategoriesSchema.parse(req.body);

        const category = await Categories.findOne({ where: { id: validationData.categoryId } });
        if (!category) {
            return res.status(404).json("Id not found");
        }

        await Categories.destroy({ where: { id: validationData.categoryId } });
        res.status(200).json("Successfully deleted");
    } catch (err) {
        if (err.name === "ZodError") {
            return res.status(400).json(err.errors);
        }

        res.status(500).json(`An error occurred: ${err.message}`);
    }
});

module.exports = router;
