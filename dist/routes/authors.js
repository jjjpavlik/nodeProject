"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authors_1 = __importDefault(require("../models/authors"));
const authors_2 = require("../validationSchems/authors");
// Create
router.post("/", async (req, res) => {
    const validationData = authors_2.createAuthorsSchema.parse(req.body);
    try {
        const authorCheck = await authors_1.default.findOne({ where: { email: validationData.email } });
        if (authorCheck) {
            res.status(409).json("The author already exists.");
        }
        const author = await authors_1.default.create({ name: validationData.name, email: validationData.email });
        res.status(201).json("Author added");
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
        const allAuthors = await authors_1.default.findAll();
        res.status(200).json(allAuthors);
    }
    catch (err) {
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});
// Update
router.put("/", async (req, res) => {
    try {
        const validationData = authors_2.updateAuthorsSchema.parse(req.body);
        const authorCheck = await authors_1.default.findOne({ where: { id: validationData.authorId } });
        if (!authorCheck) {
            res.status(404).json("Author not found");
        }
        await authors_1.default.update({ name: validationData.name, email: validationData.email }, { where: { id: validationData.authorId } });
        res.status(200).json("Author updated");
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
    const validationData = authors_2.deleteAuthorsSchema.parse(req.body);
    try {
        const authorCheck = await authors_1.default.findOne({ where: { id: validationData.authorId } });
        if (!authorCheck) {
            res.status(404).json("Id not found");
        }
        await authors_1.default.destroy({ where: { id: validationData.authorId } });
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
