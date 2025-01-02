import express,{Request, Response} from 'express';
import { z } from 'zod';
const router = express.Router();
import Tags from '../models/tags';
import Articles from '../models/articles';
import { createTagsSchem, updateTagsSchem, deleteTagsSchem } from "../validationSchems/tags";

// Create
router.post('/', async (req:Request, res: Response): Promise<void> => {
    try {
        const validationData = createTagsSchem.parse(req.body);
        const articlCheck = await Articles.findOne({ where: { id: validationData.articlesId } });

        if (!articlCheck) {
            res.status(404).json('Article not found');
        }

        const tags = await Tags.create({ name: validationData.name }) as any;
        await tags.addArticles(articlCheck);
        res.status(201).json('Category added to article');
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
        const allTags = await Tags.findAll();
        res.status(200).json(allTags);
    } catch (err:any) {
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});

// Update
router.put("/", async (req:Request, res: Response): Promise<void> => {
    try {
        const validationData = updateTagsSchem.parse(req.body);
        const checkTag = await Tags.findOne({ where: { id: validationData.tagId } });

        if (!checkTag) {
            res.status(404).json("Tag not found");
        }

        await Tags.update({ name: validationData.name }, { where: { id: validationData.tagId } });
        res.status(200).json("Tags updated");
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
        const validationData = deleteTagsSchem.parse(req.body);
        const tagCheck = await Tags.findOne({ where: { id: validationData.tagId } });

        if (!tagCheck) {
            res.status(404).json("Tag not found");
        }

        await Tags.destroy({ where: { id: validationData.tagId } });
        res.status(200).json("Tag deleted");
    } catch (err:any) {
        if (err.name === "ZodError") {
            res.status(400).json(err.errors);
        }
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});

export default router;
