import express,{Request, Response} from 'express';
import { z } from 'zod';
const router = express.Router();
import Comments from '../models/comments';
import Articles from '../models/articles';
import { createCommentsSchem, updateCommentsSchem, deleteCommentsSchem } from '../validationSchems/comments';

// Create
router.post("/", async (req:Request, res: Response): Promise<void> => {
    try {
        const validationData = createCommentsSchem.parse(req.body);

        // Check for article availability
        const articleCheck = await Articles.findOne({ where: { id: validationData.articleId } });
        if (!articleCheck) {
            res.status(404).json("No such article exists.");
        }

        const comment = await Comments.create({
            articleId: validationData.articleId,
            content: validationData.content,
        });
        res.status(201).json("Comment added successfully");
    } catch (err:any) {
        if (err.name === "ZodError") {
            res.status(400).json(err.errors);
        }
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});

// Read
router.get("/", async (req:Request, res: Response): Promise<void> => {
    try {
        const { articleId } = req.body;

        const commentsCheck = await Comments.findOne({ where: { id: articleId } });
        if (!commentsCheck) {
            res.status(404).json("There are no comments for the article!");
        }

        const foundComments = await Comments.findAll({ where: { articleId: articleId } });
        res.status(200).json(foundComments);
    } catch (err:any) {
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});

// Update
router.put("/", async (req:Request, res: Response): Promise<void> => {
    try {
        const validationData = updateCommentsSchem.parse(req.body);

        // Check for comment availability
        const commentCheck = await Comments.findOne({ where: { id: validationData.commentId } });
        if (!commentCheck) {
            res.status(404).json("No such comment exists.");
        }

        await Comments.update(
            { content: validationData.content },
            { where: { id: validationData.commentId } }
        );
        res.status(200).json("Comment updated successfully");
    } catch (err:any) {
        if (err.name === "ZodError") {
            res.status(400).json(err.errors);
        }
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});

// Delete
router.delete("/", async (req:Request, res: Response): Promise<void> => {
    try {
        const validationData = deleteCommentsSchem.parse(req.body);

        const checkId = await Comments.findOne({ where: { id: validationData.commentId } });
        if (!checkId) {
            res.status(404).json("Comment not found");
        }

        await Comments.destroy({ where: { id: validationData.commentId } });
        res.status(200).json("Successfully deleted");
    } catch (err:any) {
        if (err.name === "ZodError") {
            res.status(400).json(err.errors);
        }
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});

export default router;
