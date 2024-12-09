const express = require("express");
const router = express.Router();
const Comments = require("../models/comments");
const Articles = require("../models/articles");

// Processing/Creating comments
router.post("/", async (req, res) => {
    const { articleId, content } = req.body;

    // Check for article availability
    const articleCheck = await Articles.findOne({ where: { id: articleId } });

    if (!articleId || !content) {
        return res.status(400).json('All fields must be filled in.');
    } else if (!articleCheck) {
        return res.status(404).json('No such article exists.');
    }

    try {
        const comment = await Comments.create({ articleId, content });
        return res.status(200).json('Comment added successfully');
    } catch (err) {
        res.status(500).json(`An error occurred while adding a comment: ${err}`);
    }
});

// Get all comments on a specific article
router.get("/comments/:articleId", async (req, res) => {
    const { articleId } = req.params;

    const checkId = Number(articleId);
    if (isNaN(checkId)) {
        return res.status(400).json("Id must consist of numbers");
    }

    const commentsCheck = await Comments.findOne({ where: { articleId: checkId } });
    if (!commentsCheck) {
        return res.status(404).json('There are no comments for the article!');
    }

    try {
        const foundComments = await Comments.findAll({ where: { articleId: checkId } });
        res.json(foundComments);
    } catch (err) {
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});

// Implementing comment deletion
router.delete("/:commentId", async (req, res) => {
    const { commentId } = req.params;
    const id = Number(commentId);

    if (isNaN(id)) {
        return res.status(400).json("id can only be a number");
    }

    try {
        const comment = await Comments.findByPk(id);
        if (!comment) {
            return res.status(404).json('Id not found');
        }

        await comment.destroy();
        res.status(200).json("Successfully deleted");
    } catch (err) {
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});

module.exports = router;
