const express = require("express");
const router = express.Router();
const Tags = require("../models/tags");
const Articles = require("../models/articles");
const ArticleTags = require("../models/ArticleTags");

// Processing/Creating comments
router.post('/', async (req, res) => {
    try {
        const {name, articlesId} = req.body;
        console.log(name, articlesId)
        const articlCheck = await Articles.findOne({ where: { id: articlesId } });
        
        if (!name || !articlesId ) {
            return res.status(400).json("All fields must be filled in.");
        }
        if (!articlCheck) {
            return res.status(404).json('Article not found');
        }
        const tags = await Tags.create({ name });
        await tags.addArticles(articlCheck);
        res.status(200).json('Category added to article');

    } catch (err) {
        return res.status(500).json(`An error occurred: ${err.message}`);
    }
});

module.exports = router;