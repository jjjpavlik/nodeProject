import {z} from 'zod';

//Create scheme
export const createTagsSchem = z.object({
    name: z.string().min(1, "Name cannot be empty"),
    articlesId: z.number().int("The number must be an integer.").positive("ID cannot be negative"),
});

//Update scheme
export const updateTagsSchem = z.object({
    tagId: z.number().int("The number must be an integer.").positive("ID cannot be negative"),
    name: z.string().min(1, "Name cannot be empty"),
});

//Delete scheme
export const deleteTagsSchem = z.object({
    tagId: z.number().int("The number must be an integer.").positive("ID cannot be negative"),
});