"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const articles_1 = __importDefault(require("../models/articles"));
const categories_1 = __importDefault(require("../models/categories"));
const authors_1 = __importDefault(require("../models/authors"));
const articles_2 = require("../validationSchems/articles");
// Create
router.post("/", async (req, res) => {
    try {
        const validationData = articles_2.createArticlesSchem.parse(req.body);
        const [categoryCheck, authorCheck] = await Promise.all([
            categories_1.default.findOne({ where: { id: validationData.categoryId } }),
            authors_1.default.findOne({ where: { id: validationData.authorId } }),
        ]);
        if (!categoryCheck) {
            res.status(404).json("There is no such category.");
        }
        if (!authorCheck) {
            res.status(404).json("Such an author does not exist.");
        }
        await articles_1.default.create({
            title: validationData.title,
            content: validationData.content,
            authorId: validationData.authorId,
            categoryId: validationData.categoryId,
        });
        res.status(201).json("Article successfully created");
    }
    catch (err) {
        if (err.name === "ZodError") {
            res.status(400).json(err.errors);
        }
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});
// Read by categoryId
router.get("/categoryId/:categoryId", async (req, res) => {
    const { categoryId } = req.params;
    const categoryCheck = await categories_1.default.findOne({ where: { id: categoryId } });
    if (!categoryCheck) {
        res.status(404).json("Non-existent category id");
    }
    try {
        const articles = await articles_1.default.findAll({ where: { categoryId } });
        if (articles.length === 0) {
            res.status(404).json("No articles found in this category");
        }
        res.status(200).json(articles);
    }
    catch (err) {
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});
// Get all articles by the author
router.get("/", async (req, res) => {
    const { authorId } = req.body;
    const authorCheck = await authors_1.default.findOne({ where: { id: authorId } });
    if (!authorCheck) {
        res.status(404).json("Non-existent author id");
    }
    try {
        const articles = await articles_1.default.findAll({ where: { authorId } });
        articles.length === 0 ? res.status(404).json("No articles found by this author") : res.status(200).json(articles);
    }
    catch (err) {
        if (err.name === "ZodError") {
            res.status(400).json(err.errors);
        }
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});
// Update
router.put("/", async (req, res) => {
    try {
        const validationData = articles_2.updateArticlesSchem.parse(req.body);
        const checkArticle = await articles_1.default.findOne({ where: { id: validationData.articleId } });
        if (!checkArticle) {
            res.status(404).json("Article not found");
        }
        await articles_1.default.update({
            title: validationData.title,
            content: validationData.content,
            authorId: validationData.authorId,
            categoryId: validationData.categoryId,
        }, { where: { id: validationData.articleId } });
        res.status(200).json("Article successfully updated");
    }
    catch (err) {
        if (err.name === "ZodError") {
            res.status(400).json(err.errors);
        }
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});
// Delete
router.delete("/", async (req, res) => {
    const validationData = articles_2.deleteArticlesSchem.parse(req.body);
    try {
        const article = await articles_1.default.findOne({ where: { id: validationData.articleId } });
        if (!article) {
            res.status(404).json("Article not found");
        }
        await articles_1.default.destroy({ where: { id: validationData.articleId } });
        res.status(200).json("Article successfully deleted");
    }
    catch (err) {
        if (err.name === "ZodError") {
            res.status(400).json(err.errors);
        }
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});
exports.default = router;
