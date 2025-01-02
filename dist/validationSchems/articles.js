"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticlesSchem = exports.updateArticlesSchem = exports.createArticlesSchem = void 0;
const zod_1 = require("zod");
//Create articles
exports.createArticlesSchem = zod_1.z.object({
    title: zod_1.z.string().min(1, "Name is required"),
    content: zod_1.z.string().min(1, "Name is required"),
    authorId: zod_1.z.number().int("The number must be an integer.").positive("ID cannot be negative"),
    categoryId: zod_1.z.number().int("The number must be an integer.").positive("ID cannot be negative"),
});
//Update articles
exports.updateArticlesSchem = zod_1.z.object({
    articleId: zod_1.z.number().int("The number must be an integer.").positive("ID cannot be negative"),
    title: zod_1.z.string().min(1, "Name is required"),
    content: zod_1.z.string().min(1, "Name is required"),
    authorId: zod_1.z.number().int("The number must be an integer.").positive("ID cannot be negative"),
    categoryId: zod_1.z.number().int("The number must be an integer.").positive("ID cannot be negative"),
});
//Delete articles
exports.deleteArticlesSchem = zod_1.z.object({
    articleId: zod_1.z.number().int("The number must be an integer.").positive("ID cannot be negative"),
});
