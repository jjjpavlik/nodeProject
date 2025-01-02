"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAuthorsSchema = exports.updateAuthorsSchema = exports.createAuthorsSchema = void 0;
const zod_1 = require("zod");
//Create validations
exports.createAuthorsSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name cannot be empty"),
    email: zod_1.z.string().email("Incorrect mail format"),
});
//Update validation
exports.updateAuthorsSchema = zod_1.z.object({
    authorId: zod_1.z.number().int("The number must be an integer.").positive("ID cannot be negative"),
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Incorrect mail format"),
});
//Delete 
exports.deleteAuthorsSchema = zod_1.z.object({
    authorId: zod_1.z.number().int("The number must be an integer.").positive("ID cannot be negative"),
});
