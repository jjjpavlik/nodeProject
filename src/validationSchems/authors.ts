import {z} from 'zod';

//Create validations
export const createAuthorsSchema = z.object({
    name: z.string().min(1, "Name cannot be empty"),
    email: z.string().email("Incorrect mail format"),
});

//Update validation
export const updateAuthorsSchema = z.object({
    authorId: z.number().int("The number must be an integer.").positive("ID cannot be negative"),
    name: z.string().min(1,"Name is required"),
    email: z.string().email("Incorrect mail format"),
});

//Delete 
export const deleteAuthorsSchema = z.object({
    authorId: z.number().int("The number must be an integer.").positive("ID cannot be negative"),
});
