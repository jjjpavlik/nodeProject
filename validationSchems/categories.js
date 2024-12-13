const {z} = require("zod");

//Create validation
const createCategoriesSchema = z.object({
    name: z.string().min(1, "Name is required"),
});

//Update validation
const updateCategoriesSchema = z.object({
    categoryId: z.number().int("The number must be an integer.").positive("ID cannot be negative"),
    name: z.string().min(1,"Name is required"),
});

//Delete
const deleteCategoriesSchema = z.object({
    categoryId: z.number().int("The number must be an integer.").positive("ID cannot be negative"),
});

module.exports = {
    createCategoriesSchema,
    updateCategoriesSchema,
    deleteCategoriesSchema,
};