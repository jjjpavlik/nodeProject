const express = require("express");
const router = express.Router();
const Comments = require("../models/comments");
const Articles = require("../models/articles");

// Create
router.post("/", async (req, res) => {
    const { articleId, content } = req.body;

    // Check for article availability
    const articleCheck = await Articles.findOne({ where: { id: articleId } });

    if (!articleId || !content) {
        return res.status(400).json('All fields must be filled in.');
    }
    if (!articleCheck) {
        return res.status(404).json('No such article exists.');
    }

    try {
        const comment = await Comments.create({ articleId, content });
        return res.status(200).json('Comment added successfully');
    } catch (err) {
        res.status(500).json(`An error occurred while adding a comment: ${err}`);
    }
});

// Read
router.get("/", async (req, res) => {
    try {    
    const { articleId } = req.body;
    const commentsCheck = await Comments.findOne({ where: { id: articleId } });

    if (!commentsCheck) {
        return res.status(404).json('There are no comments for the article!');
    }
        
    const foundComments = await Comments.findAll({ where: { articleId: articleId } });
    res.json(foundComments);

    } catch (err) {
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});
//Update
router.put("/", async (req, res) => {
    const { commentId, content } = req.body;

    // Check for article availability
    const commentCheck = await Comments.findOne({ where: { id: commentId } });

    if (!commentId || !content) {
        return res.status(400).json('All fields must be filled in.');
    }
    if (!commentCheck) {
        return res.status(404).json('No such article exists.');
    }

    try {
        await Comments.update({content}, {where: {id: commentId}});
        return res.status(200).json('Comment update successfully');
    } catch (err) {
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});

// Delete
router.delete("/", async (req, res) => {
    try { 
        const { commentId } = req.body;
        const checkId = await Comments.findOne({where:{id: commentId}});
        if (!checkId) {
            return res.status(404).json('Comments not found');
        }
        await Comment.destroy({where: {id: commentId}});
        res.status(200).json("Successfully deleted");
    } catch (err) {
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});

module.exports = router;
