const express = require("express");
const { z } = require("zod");
const router = express.Router();
const Authors = require("../models/authors");
const { createAuthorsSchema, updateAuthorsSchema, deleteAuthorsSchema } = require("../validationSchems/authors");

// Create
router.post("/", async (req, res) => {
    const validationData = createAuthorsSchema.parse(req.body);

    try {
        const authorCheck = await Authors.findOne({ where: { email: validationData.email } });
        if (authorCheck) {
            return res.status(409).json("The author already exists.");
        }
        const author = await Authors.create({ name: validationData.name, email: validationData.email });
        res.status(201).json("Author added");
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
        const allAuthors = await Authors.findAll();
        res.status(200).json(allAuthors);
    } catch (err) {
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});

// Update
router.put("/", async (req, res) => {
    try {
        const validationData = updateAuthorsSchema.parse(req.body);
        const authorCheck = await Authors.findOne({ where: { id: validationData.authorId } });

        if (!authorCheck) {
            return res.status(404).json("Author not found");
        }

        await Authors.update(
            { name: validationData.name, email: validationData.email },
            { where: { id: validationData.authorId } }
        );
        res.status(200).json("Author updated");
    } catch (err) {
        if (err.name === "ZodError") {
            return res.status(400).json(err.errors);
        }
        return res.status(500).json(`An error occurred: ${err.message}`);
    }
});

// Delete
router.delete("/", async (req, res) => {
    const validationData = deleteAuthorsSchema.parse(req.body);

    try {
        const authorCheck = await Authors.findOne({ where: { id: validationData.authorId } });

        if (!authorCheck) {
            return res.status(404).json("Id not found");
        }

        await Authors.destroy({ where: { id: validationData.authorId } });
        res.status(200).json("Successfully deleted");
    } catch (err) {
        if (err.name === "ZodError") {
            return res.status(400).json(err.errors);
        }
        return res.status(500).json(`An error occurred: ${err.message}`);
    }
});

module.exports = router;
