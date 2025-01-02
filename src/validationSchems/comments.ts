import {z} from 'zod';

//Create schem
export const createCommentsSchem = z.object({
    articleId: z.number().int("The number must be an integer.").positive("ID cannot be negative"),
    content: z.string().min(1,"Name is required"),
});

//Update schem
export const updateCommentsSchem = z.object({
    commentId: z.number().int("The number must be an integer.").positive("ID cannot be negative"),
    content: z.string().min(1,"Name is required"),
});

//Delete Schem
export const deleteCommentsSchem = z.object({
    commentId: z.number().int("The number must be an integer.").positive("ID cannot be negative"),
});

