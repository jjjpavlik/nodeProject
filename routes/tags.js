const express = require("express");
const { z } = require("zod");
const router = express.Router();
const Tags = require("../models/tags");
const Articles = require("../models/articles");
const { createTagsSchem, updateTagsSchem, deleteTagsSchem } = require("../validationSchems/tags");

// Create
router.post('/', async (req, res) => {
    try {
        const validationData = createTagsSchem.parse(req.body);
        const articlCheck = await Articles.findOne({ where: { id: validationData.articlesId } });

        if (!articlCheck) {
            return res.status(404).json('Article not found');
        }

        const tags = await Tags.create({ name: validationData.name });
        await tags.addArticles(articlCheck);
        res.status(201).json('Category added to article');
    } catch (err) {
        if (err.name === "ZodError") {
            return res.status(400).json(err.errors);
        }
        return res.status(500).json(`An error occurred: ${err.message}`);
    }
});

// Read
router.get("/", async (req, res) => {
    try {
        const allTags = await Tags.findAll();
        res.status(200).json(allTags);
    } catch (err) {
        return res.status(500).json(`An error occurred: ${err.message}`);
    }
});

// Update
router.put("/", async (req, res) => {
    try {
        const validationData = updateTagsSchem.parse(req.body);
        const checkTag = await Tags.findOne({ where: { id: validationData.tagId } });

        if (!checkTag) {
            return res.status(404).json("Tag not found");
        }

        await Tags.update({ name: validationData.name }, { where: { id: validationData.tagId } });
        res.status(200).json("Tags updated");
    } catch (err) {
        if (err.name === "ZodError") {
            return res.status(400).json(err.errors);
        }
        return res.status(500).json(`An error occurred: ${err.message}`);
    }
});

// Delete
router.delete("/", async (req, res) => {
    try {
        const validationData = deleteTagsSchem.parse(req.body);
        const tagCheck = await Tags.findOne({ where: { id: validationData.tagId } });

        if (!tagCheck) {
            return res.status(404).json("Tag not found");
        }

        await Tags.destroy({ where: { id: validationData.tagId } });
        res.status(200).json("Tag deleted");
    } catch (err) {
        if (err.name === "ZodError") {
            return res.status(400).json(err.errors);
        }
        return res.status(500).json(`An error occurred: ${err.message}`);
    }
});

module.exports = router;
