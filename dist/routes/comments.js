"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const comments_1 = __importDefault(require("../models/comments"));
const articles_1 = __importDefault(require("../models/articles"));
const comments_2 = require("../validationSchems/comments");
// Create
router.post("/", async (req, res) => {
    try {
        const validationData = comments_2.createCommentsSchem.parse(req.body);
        // Check for article availability
        const articleCheck = await articles_1.default.findOne({ where: { id: validationData.articleId } });
        if (!articleCheck) {
            res.status(404).json("No such article exists.");
        }
        const comment = await comments_1.default.create({
            articleId: validationData.articleId,
            content: validationData.content,
        });
        res.status(201).json("Comment added successfully");
    }
    catch (err) {
        if (err.name === "ZodError") {
            res.status(400).json(err.errors);
        }
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});
// Read
router.get("/", async (req, res) => {
    try {
        const { articleId } = req.body;
        const commentsCheck = await comments_1.default.findOne({ where: { id: articleId } });
        if (!commentsCheck) {
            res.status(404).json("There are no comments for the article!");
        }
        const foundComments = await comments_1.default.findAll({ where: { articleId: articleId } });
        res.status(200).json(foundComments);
    }
    catch (err) {
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});
// Update
router.put("/", async (req, res) => {
    try {
        const validationData = comments_2.updateCommentsSchem.parse(req.body);
        // Check for comment availability
        const commentCheck = await comments_1.default.findOne({ where: { id: validationData.commentId } });
        if (!commentCheck) {
            res.status(404).json("No such comment exists.");
        }
        await comments_1.default.update({ content: validationData.content }, { where: { id: validationData.commentId } });
        res.status(200).json("Comment updated successfully");
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
    try {
        const validationData = comments_2.deleteCommentsSchem.parse(req.body);
        const checkId = await comments_1.default.findOne({ where: { id: validationData.commentId } });
        if (!checkId) {
            res.status(404).json("Comment not found");
        }
        await comments_1.default.destroy({ where: { id: validationData.commentId } });
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
