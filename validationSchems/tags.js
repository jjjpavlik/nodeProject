const {z} = require("zod");

//Create scheme
const createTagsSchem = z.object({
    name: z.string().min(1, "Name cannot be empty"),
    articlesId: z.number().int("The number must be an integer.").positive("ID cannot be negative"),
});

//Update scheme
const updateTagsSchem = z.object({
    tagId: z.number().int("The number must be an integer.").positive("ID cannot be negative"),
    name: z.string().min(1, "Name cannot be empty"),
});

//Delete scheme
const deleteTagsSchem = z.object({
    tagId: z.number().int("The number must be an integer.").positive("ID cannot be negative"),
});

module.exports = {
    createTagsSchem,
    updateTagsSchem,
    deleteTagsSchem,
};