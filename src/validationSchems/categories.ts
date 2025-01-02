import {z} from 'zod';

//Create validation
export const createCategoriesSchema = z.object({
    name: z.string().min(1, "Name is required"),
});

//Update validation
export const updateCategoriesSchema = z.object({
    categoryId: z.number().int("The number must be an integer.").positive("ID cannot be negative"),
    name: z.string().min(1,"Name is required"),
});

//Delete
export const deleteCategoriesSchema = z.object({
    categoryId: z.number().int("The number must be an integer.").positive("ID cannot be negative"),
});
