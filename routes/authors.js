const express = require("express");
const router = express.Router();
const Authors = require("../models/authors");

// Create
router.post('/', async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json('Fields cannot be empty.');
    }

    try {
        const author = await Authors.create({ name, email });
        res.status(200).json("Author added");
    } catch (err) {
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});
//Read
router.get("/", async (req, res) => {
    try{
        const allAuthors = await Authors.findAll();
        res.status(200).json(allAuthors);
    }catch(err){
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});
//Update
router.put("/", async (req, res) => {
    try{
        const {authorId, name, email} = req.body;
        const authorCheck = Authors.findOne({where:{id:authorId}});

        if(!authorCheck){
            res.status(422).json("Author not found")
        }
        if(!name || !email){
            res.status(422).json("Fields cannot be empty.")
        }
        await Authors.update({name, email},{where: {id: authorId}});
        res.status(200).json("Author update")
    }catch(err){
        res.status(500).json(`An error occurred: ${err.message}`);
    }

   
});

// Delete
router.delete("/:authorId", async (req, res) => {
    const { authorId } = req.params;
    const id = Number(authorId);

    if (isNaN(id)) {
        return res.status(400).json("id can only be a number");
    }

    try {
        const author = await Authors.findByPk(id);

        if (!author) {
            return res.status(404).json('Id not found');
        }

        await author.destroy();
        res.status(200).json("Successfully deleted");

    } catch (err) {
        res.status(500).json(`An error occurred: ${err.message}`);
    }
});

module.exports = router;
