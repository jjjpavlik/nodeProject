import express, {Request, Response } from 'express';
import { z } from 'zod';
const router = express.Router();
import Authors from '../models/authors';
import {createAuthorsSchema,
        updateAuthorsSchema,
        deleteAuthorsSchema} 
    from '../validationSchems/authors';

// Create
router.post("/", async (req:Request, res: Response): Promise<void> => {
    const validationData = createAuthorsSchema.parse(req.body);

    try {
        const authorCheck = await Authors.findOne({ where: { email: validationData.email } });
        if (authorCheck) {
            res.status(409).json("The author already exists.");
        }
        const author = await Authors.create({ name: validationData.name, email: validationData.email }); 
        res.status(201).json("Author added");
    } catch (err: any) {
        if (err.name === "ZodError") {
            res.status(400).json(err.errors);
        }
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});

// Read
router.get("/", async (req:Request, res: Response): Promise<void> => {
    try {
        const allAuthors = await Authors.findAll();
        res.status(200).json(allAuthors);
    } catch (err: any) {
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});

// Update
router.put("/", async (req:Request, res: Response): Promise<void> => {
    try {
        const validationData = updateAuthorsSchema.parse(req.body);
        const authorCheck = await Authors.findOne({ where: { id: validationData.authorId } });

        if (!authorCheck) {
            res.status(404).json("Author not found");
        }

        await Authors.update(
            { name: validationData.name, email: validationData.email },
            { where: { id: validationData.authorId } }
        );
        res.status(200).json("Author updated");
    } catch (err: any) {
        if (err.name === "ZodError") {
            res.status(400).json(err.errors);
        }
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});

// Delete
router.delete("/", async (req:Request, res: Response): Promise<void> => {
    const validationData = deleteAuthorsSchema.parse(req.body);

    try {
        const authorCheck = await Authors.findOne({ where: { id: validationData.authorId } });

        if (!authorCheck) {
            res.status(404).json("Id not found");
        }

        await Authors.destroy({ where: { id: validationData.authorId } });
        res.status(200).json("Successfully deleted");
    } catch (err: any) {
        if (err.name === "ZodError") {
            res.status(400).json(err.errors);
        }
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});

export default router;
