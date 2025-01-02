"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categories_1 = __importDefault(require("../models/categories"));
const categories_2 = require("../validationSchems/categories");
const router = express_1.default.Router();
// Create Categories
router.post("/", async (req, res) => {
    try {
        const validationData = categories_2.createCategoriesSchema.parse(req.body);
        // Check for category uniqueness
        const uniqueCheck = await categories_1.default.findOne({ where: { name: validationData.name } });
        if (uniqueCheck) {
            res.status(409).json("Category already exists");
        }
        await categories_1.default.create({ name: validationData.name });
        res.status(201).json("Category created");
    }
    catch (err) {
        if (err.name === "ZodError") {
            res.status(400).json(err.errors);
        }
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});
// Read Categories
router.get("/", async (req, res) => {
    try {
        const categories = await categories_1.default.findAll();
        res.status(200).json(categories);
    }
    catch (err) {
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});
// Update Categories
router.put("/", async (req, res) => {
    try {
        const validationData = categories_2.updateCategoriesSchema.parse(req.body);
        const categoryCheck = await categories_1.default.findOne({ where: { id: validationData.categoryId } });
        if (!categoryCheck) {
            res.status(404).json("There is no such category");
        }
        await categories_1.default.update({ name: validationData.name }, { where: { id: validationData.categoryId } });
        res.status(200).json("Category updated");
    }
    catch (err) {
        if (err.name === "ZodError") {
            res.status(400).json(err.errors);
        }
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});
// Delete Categories
router.delete("/", async (req, res) => {
    try {
        const validationData = categories_2.deleteCategoriesSchema.parse(req.body);
        const category = await categories_1.default.findOne({ where: { id: validationData.categoryId } });
        if (!category) {
            res.status(404).json("Id not found");
        }
        await categories_1.default.destroy({ where: { id: validationData.categoryId } });
        res.status(200).json("Successfully deleted");
    }
    catch (err) {
        if (err.name === "ZodError") {
            res.status(400).json(err.errors);
        }
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});
exports.default = router;
