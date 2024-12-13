const {z} = require("zod");

//Create schem
const createCommentsSchem = z.object({
    articleId: z.number().int("The number must be an integer.").positive("ID cannot be negative"),
    content: z.string().min(1,"Name is required"),
});

//Update schem
const updateCommentsSchem = z.object({
    commentId: z.number().int("The number must be an integer.").positive("ID cannot be negative"),
    content: z.string().min(1,"Name is required"),
});

//Delete Schem
const deleteCommentsSchem = z.object({
    commentId: z.number().int("The number must be an integer.").positive("ID cannot be negative"),
});

module.exports = {
    createCommentsSchem,
    updateCommentsSchem,
    deleteCommentsSchem,
};