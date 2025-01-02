import { z } from 'zod';

//Create articles
export const createArticlesSchem = z.object({
    title: z.string().min(1,"Name is required"),
    content: z.string().min(1,"Name is required"),
    authorId: z.number().int("The number must be an integer.").positive("ID cannot be negative"),
    categoryId: z.number().int("The number must be an integer.").positive("ID cannot be negative"),
});

//Update articles
export const updateArticlesSchem = z.object({
    articleId: z.number().int("The number must be an integer.").positive("ID cannot be negative"),
    title: z.string().min(1,"Name is required"),
    content: z.string().min(1,"Name is required"),
    authorId: z.number().int("The number must be an integer.").positive("ID cannot be negative"),
    categoryId: z.number().int("The number must be an integer.").positive("ID cannot be negative"),
});

//Delete articles
export const deleteArticlesSchem = z.object({
    articleId: z.number().int("The number must be an integer.").positive("ID cannot be negative"),
});
