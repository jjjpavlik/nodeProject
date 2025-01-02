import express, {Request, Response} from "express";
import { z } from "zod";
import Categories from '../models/categories';
import {createCategoriesSchema,
        updateCategoriesSchema, 
        deleteCategoriesSchema} 
    from "../validationSchems/categories";

const router = express.Router();

// Create Categories
router.post("/", async (req:Request, res: Response): Promise<void> => {
    try {
        const validationData = createCategoriesSchema.parse(req.body);

        // Check for category uniqueness
        const uniqueCheck = await Categories.findOne({ where: { name: validationData.name } });
        if (uniqueCheck) {
            res.status(409).json("Category already exists");
        }

        await Categories.create({ name: validationData.name });
        res.status(201).json("Category created");
    } catch (err: any) {
        if (err.name === "ZodError") {
            res.status(400).json(err.errors);
        }

        res.status(500).json(`An error occurred: ${err.message}`);
    }
});

// Read Categories
router.get("/", async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await Categories.findAll();
        res.status(200).json(categories);
    } catch (err: any) {
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});

// Update Categories
router.put("/", async (req: Request, res: Response): Promise<void> => {
    try {
        const validationData = updateCategoriesSchema.parse(req.body);

        const categoryCheck = await Categories.findOne({ where: { id: validationData.categoryId } });
        if (!categoryCheck) {
            res.status(404).json("There is no such category");
        }

        await Categories.update({ name: validationData.name }, { where: { id: validationData.categoryId } });
        res.status(200).json("Category updated");
    } catch (err: any) {
        if (err.name === "ZodError") {
            res.status(400).json(err.errors);
        }

        res.status(500).json(`An error occurred: ${err.message}`);
    }
});

// Delete Categories
router.delete("/", async (req: Request, res: Response): Promise<void> => {
    try {
        const validationData = deleteCategoriesSchema.parse(req.body);

        const category = await Categories.findOne({ where: { id: validationData.categoryId } });
        if (!category) {
            res.status(404).json("Id not found");
        }

        await Categories.destroy({ where: { id: validationData.categoryId } });
        res.status(200).json("Successfully deleted");
    } catch (err: any) {
        if (err.name === "ZodError") {
            res.status(400).json(err.errors);
        }

        res.status(500).json(`An error occurred: ${err.message}`);
    }
});

export default router;
