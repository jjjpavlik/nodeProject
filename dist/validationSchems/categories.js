"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoriesSchema = exports.updateCategoriesSchema = exports.createCategoriesSchema = void 0;
const zod_1 = require("zod");
//Create validation
exports.createCategoriesSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
});
//Update validation
exports.updateCategoriesSchema = zod_1.z.object({
    categoryId: zod_1.z.number().int("The number must be an integer.").positive("ID cannot be negative"),
    name: zod_1.z.string().min(1, "Name is required"),
});
//Delete
exports.deleteCategoriesSchema = zod_1.z.object({
    categoryId: zod_1.z.number().int("The number must be an integer.").positive("ID cannot be negative"),
});
