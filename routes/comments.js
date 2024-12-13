const express = require("express");
const { z } = require("zod");
const router = express.Router();
const Comments = require("../models/comments");
const Articles = require("../models/articles");
const { createCommentsSchem, updateCommentsSchem, deleteCommentsSchem } = require("../validationSchems/comments");

// Create
router.post("/", async (req, res) => {
    try {
        const validationData = createCommentsSchem.parse(req.body);

        // Check for article availability
        const articleCheck = await Articles.findOne({ where: { id: validationData.articleId } });
        if (!articleCheck) {
            return res.status(404).json("No such article exists.");
        }

        const comment = await Comments.create({
            articleId: validationData.articleId,
            content: validationData.content,
        });
        return res.status(201).json("Comment added successfully");
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
        const { articleId } = req.body;

        const commentsCheck = await Comments.findOne({ where: { id: articleId } });
        if (!commentsCheck) {
            return res.status(404).json("There are no comments for the article!");
        }

        const foundComments = await Comments.findAll({ where: { articleId: articleId } });
        res.status(200).json(foundComments);
    } catch (err) {
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});

// Update
router.put("/", async (req, res) => {
    try {
        const validationData = updateCommentsSchem.parse(req.body);

        // Check for comment availability
        const commentCheck = await Comments.findOne({ where: { id: validationData.commentId } });
        if (!commentCheck) {
            return res.status(404).json("No such comment exists.");
        }

        await Comments.update(
            { content: validationData.content },
            { where: { id: validationData.commentId } }
        );
        return res.status(200).json("Comment updated successfully");
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
        const validationData = deleteCommentsSchem.parse(req.body);

        const checkId = await Comments.findOne({ where: { id: validationData.commentId } });
        if (!checkId) {
            return res.status(404).json("Comment not found");
        }

        await Comments.destroy({ where: { id: validationData.commentId } });
        res.status(200).json("Successfully deleted");
    } catch (err) {
        if (err.name === "ZodError") {
            return res.status(400).json(err.errors);
        }
        return res.status(500).json(`An error occurred: ${err.message}`);
    }
});

module.exports = router;
