const express = require("express");
const router = express.Router();
const Articles = require("../models/articles");
const Categories = require("../models/categories");
const Authors = require("../models/authors");

// Processing/Creating a post
router.post('/', async (req, res) => {
    const { title, content, authorId, categoryId } = req.body;

    if (!title || !content || !authorId || !categoryId) {
        return res.status(400).json('Fields cannot be empty.');
    }

    try {
        const categoryCheck = await Categories.findOne({ where: { id: categoryId } });
        const authorCheck = await Authors.findOne({ where: { id: authorId } });

        if (!categoryCheck) {
            return res.status(404).json("There is no such category.");
        }
        if (!authorCheck) {
            return res.status(404).json("Such an author does not exist.");
        }  
        await Articles.create({ title, content, authorId, categoryId });
        res.status(200).json("Article successfully created");
    } catch (err) {
        return res.status(500).json(`An error occurred: ${err.message}`);
    }
});

// Get all articles in a category
router.get("/categories/:categoryId", async (req, res) => {
    const { categoryId } = req.params;
    const checkId = Number(categoryId);

    if (isNaN(checkId)) {
        return res.status(400).json("Id must consist only of numbers");
    }

    const categoryCheck = await Categories.findOne({ where: { id: categoryId } });

    if (!categoryCheck) {
        return res.status(404).json("Non-existent id");
    }

    try {
        const articles = await Articles.findAll({ where: { categoryId } });
        if (articles.length === 0){
           return res.status(404).json('No articles found in this category')
        }
        res.status(200).json(articles);
    } catch (err) {
        return res.status(500).json(`An error occurred: ${err.message}`);
    }
});

// Get all articles by the author
router.get("/authors/:authorId", async (req, res) => {
    const { authorId } = req.params;
    const checkId = Number(authorId);

    if (isNaN(checkId)) {
        return res.status(400).json("Id must consist only of numbers");
    }

    const authorCheck = await Authors.findOne({ where: { id: authorId } });

    if (!authorCheck) {
        return res.status(404).json("Non-existent id");
    }

    try {
        const articles = await Articles.findAll({ where: { authorId } });
        return articles.length === 0
            ? res.status(404).json('No articles found by this author')
            : res.status(200).json(articles);
    } catch (err) {
        return res.status(422).json(`An error occurred: ${err.message}`);
    }
});

// Implementing article deletion
router.delete("/:articleId", async (req, res) => {
    const { articleId } = req.params;
    const id = Number(articleId);

    if (isNaN(id)) {
        return res.status(400).json("id can only be a number");
    }

    try {
        const article = await Articles.findByPk(id);
        if (!article) {
            return res.status(404).json('Id not found');
        }

        await article.destroy();
        return res.status(200).json("Successfully deleted");
    } catch (err) {
        return res.status(422).json(`An error occurred: ${err.message}`);
    }
});

module.exports = router;
