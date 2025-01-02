import express, {Request, Response} from "express";
import { z } from "zod";
const router = express.Router();

import Articles from '../models/articles';
import Categories from '../models/categories';
import Authors  from '../models/authors';
import { where } from "sequelize";
import {
  createArticlesSchem,
  updateArticlesSchem,
  deleteArticlesSchem,
} from '../validationSchems/articles';

// Create
router.post("/", async (req:Request, res: Response): Promise<void> => {
  try {
    const validationData = createArticlesSchem.parse(req.body);

    const [categoryCheck, authorCheck] = await Promise.all([
      Categories.findOne({ where: { id: validationData.categoryId } }),
      Authors.findOne({ where: { id: validationData.authorId } }),
    ]);

    if (!categoryCheck) {
      res.status(404).json("There is no such category.");
    }
    if (!authorCheck) {
      res.status(404).json("Such an author does not exist.");
    }

    await Articles.create({
      title: validationData.title,
      content: validationData.content,
      authorId: validationData.authorId,
      categoryId: validationData.categoryId,
    });

    res.status(201).json("Article successfully created");
  } catch (err: any) {
    if (err.name === "ZodError") {
       res.status(400).json(err.errors);
    }
    res.status(500).json(`An error occurred: ${err.message}`);
  }
});

// Read by categoryId
router.get("/categoryId/:categoryId", async (req:Request, res: Response): Promise<void> => {
  const { categoryId } = req.params;
  const categoryCheck = await Categories.findOne({ where: { id: categoryId } });

  if (!categoryCheck) {
    res.status(404).json("Non-existent category id");
  }

  try {
    const articles = await Articles.findAll({ where: { categoryId } });
    if (articles.length === 0) {
      res.status(404).json("No articles found in this category");
    }
    res.status(200).json(articles);
  } catch (err: any) {
    res.status(500).json(`An error occurred: ${err.message}`);
  }
});

// Get all articles by the author
router.get("/", async (req:Request, res: Response): Promise<void> => {
  const { authorId } = req.body;

  const authorCheck = await Authors.findOne({ where: { id: authorId } });

  if (!authorCheck) {
    res.status(404).json("Non-existent author id");
  }

  try {
    const articles = await Articles.findAll({ where: { authorId } });
    articles.length === 0 ? res.status(404).json("No articles found by this author"): res.status(200).json(articles);
  } catch (err: any) {
    if (err.name === "ZodError") {
      res.status(400).json(err.errors);
    }
    res.status(500).json(`An error occurred: ${err.message}`);
  }
});

// Update
router.put("/", async (req:Request, res: Response): Promise<void> => {
  try {
    const validationData = updateArticlesSchem.parse(req.body);
    const checkArticle = await Articles.findOne({ where: { id: validationData.articleId } });

    if (!checkArticle) {
      res.status(404).json("Article not found");
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

    res.status(200).json("Article successfully updated");
  } catch (err:any) {
    if (err.name === "ZodError") {
      res.status(400).json(err.errors);
    }
    res.status(500).json(`An error occurred: ${err.message}`);
  }
});

// Delete
router.delete("/", async (req:Request, res: Response): Promise<void> => {
  const validationData = deleteArticlesSchem.parse(req.body);

  try {
    const article = await Articles.findOne({ where: { id: validationData.articleId } });

    if (!article) {
      res.status(404).json("Article not found");
    }

    await Articles.destroy({ where: { id: validationData.articleId } });
    res.status(200).json("Article successfully deleted");
  } catch (err:any) {
    if (err.name === "ZodError") {
      res.status(400).json(err.errors);
    }
    res.status(500).json(`An error occurred: ${err.message}`);
  }
});

export default router;
