const express = require("express");
const router = express.Router();
const Tags = require("../models/tags");
const Articles = require("../models/articles");
const ArticleTags = require("../models/ArticleTags");
const { where } = require("sequelize");

// Create
router.post('/', async (req, res) => {
    try {
        const {name, articlesId} = req.body;
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
// Read
router.get("/", async (req, res) => {
   
   try{
    const allTags = await Tags.findAll();
    res.status(200).json(allTags);
   }catch(err){
    return res.status(500).json(`An error occurred: ${err.message}`);
   } 
});
//Update
router.put("/", async (req, res) => {
    try{
        const {tagId, name} = req.body;
        const checkTag = await Tags.findOne({where:{id: tagId}});
        if(!checkTag){
            return res.status(422).json("Tag not found");
        }
        await Tags.update({name}, {where:{id: tagId}});
        res.status(200).json("Tags update")
    }catch(err){
        return res.status(500).json(`An error occurred: ${err.message}`);
    }
});

//Delete
router.delete("/", async (req, res) => {
    try{
    const {tagId} = req.body;
    const tagCheck = await Tags.findOne({where:{id: tagId}});
        if(!tagCheck){
            res.status(422).json("Tag not found");
        }
    await Tags.delete({where:{id:tagId}});
    res.status(200).json("Tag delete");

    }catch(err){
        return res.status(500).json(`An error occurred: ${err.message}`);  
    }
   
});