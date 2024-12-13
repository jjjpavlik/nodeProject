const express = require("express");
const { z } = require("zod");
const router = express.Router();
const Articles = require("../models/articles");
const Categories = require("../models/categories");
const Authors = require("../models/authors");
const { where } = require("sequelize");
const {
  createArticlesSchem,
  updateArticlesSchem,
  deleteArticlesSchem,
} = require("../validationSchems/articles");

// Create
router.post("/", async (req, res) => {
  try {
    const validationData = createArticlesSchem.parse(req.body);

    const [categoryCheck, authorCheck] = await Promise.all([
      Categories.findOne({ where: { id: validationData.categoryId } }),
      Authors.findOne({ where: { id: validationData.authorId } }),
    ]);

    if (!categoryCheck) {
      return res.status(404).json("There is no such category.");
    }
    if (!authorCheck) {
      return res.status(404).json("Such an author does not exist.");
    }

    await Articles.create({
      title: validationData.title,
      content: validationData.content,
      authorId: validationData.authorId,
      categoryId: validationData.categoryId,
    });

    return res.status(201).json("Article successfully created");
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json(err.errors);
    }
    return res.status(500).json(`An error occurred: ${err.message}`);
  }
});

// Read by categoryId
router.get("/categoryId/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  const categoryCheck = await Categories.findOne({ where: { id: categoryId } });

  if (!categoryCheck) {
    return res.status(404).json("Non-existent category id");
  }

  try {
    const articles = await Articles.findAll({ where: { categoryId } });
    if (articles.length === 0) {
      return res.status(404).json("No articles found in this category");
    }
    return res.status(200).json(articles);
  } catch (err) {
    return res.status(500).json(`An error occurred: ${err.message}`);
  }
});

// Get all articles by the author
router.get("/", async (req, res) => {
  const { authorId } = req.body;

  const authorCheck = await Authors.findOne({ where: { id: authorId } });

  if (!authorCheck) {
    return res.status(404).json("Non-existent author id");
  }

  try {
    const articles = await Articles.findAll({ where: { authorId } });
    return articles.length === 0
      ? res.status(404).json("No articles found by this author")
      : res.status(200).json(articles);
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json(err.errors);
    }
    return res.status(500).json(`An error occurred: ${err.message}`);
  }
});

// Update
router.put("/", async (req, res) => {
  try {
    const validationData = updateArticlesSchem.parse(req.body);
    const checkArticle = await Articles.findOne({ where: { id: validationData.articleId } });

    if (!checkArticle) {
      return res.status(404).json("Article not found");
    }

    await Articles.update(
      {
        title: validationData.title,
        content: validationData.content,
        authorId: validationData.authorId,
        categoryId: validationData.categoryId,
      },
      { where: { id: validationData.articleId } }
    );

    return res.status(200).json("Article successfully updated");
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json(err.errors);
    }
    return res.status(500).json(`An error occurred: ${err.message}`);
  }
});

// Delete
router.delete("/", async (req, res) => {
  const validationData = deleteArticlesSchem.parse(req.body);

  try {
    const article = await Articles.findOne({ where: { id: validationData.articleId } });

    if (!article) {
      return res.status(404).json("Article not found");
    }

    await article.destroy({ where: { id: validationData.articleId } });
    return res.status(200).json("Article successfully deleted");
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json(err.errors);
    }
    return res.status(500).json(`An error occurred: ${err.message}`);
  }
});

module.exports = router;
