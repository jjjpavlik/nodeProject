"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const tags_1 = __importDefault(require("../models/tags"));
const articles_1 = __importDefault(require("../models/articles"));
const tags_2 = require("../validationSchems/tags");
// Create
router.post('/', async (req, res) => {
    try {
        const validationData = tags_2.createTagsSchem.parse(req.body);
        const articlCheck = await articles_1.default.findOne({ where: { id: validationData.articlesId } });
        if (!articlCheck) {
            res.status(404).json('Article not found');
        }
        const tags = await tags_1.default.create({ name: validationData.name });
        await tags.addArticles(articlCheck);
        res.status(201).json('Category added to article');
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
        const allTags = await tags_1.default.findAll();
        res.status(200).json(allTags);
    }
    catch (err) {
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});
// Update
router.put("/", async (req, res) => {
    try {
        const validationData = tags_2.updateTagsSchem.parse(req.body);
        const checkTag = await tags_1.default.findOne({ where: { id: validationData.tagId } });
        if (!checkTag) {
            res.status(404).json("Tag not found");
        }
        await tags_1.default.update({ name: validationData.name }, { where: { id: validationData.tagId } });
        res.status(200).json("Tags updated");
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
        const validationData = tags_2.deleteTagsSchem.parse(req.body);
        const tagCheck = await tags_1.default.findOne({ where: { id: validationData.tagId } });
        if (!tagCheck) {
            res.status(404).json("Tag not found");
        }
        await tags_1.default.destroy({ where: { id: validationData.tagId } });
        res.status(200).json("Tag deleted");
    }
    catch (err) {
        if (err.name === "ZodError") {
            res.status(400).json(err.errors);
        }
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});
exports.default = router;
