"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTagsSchem = exports.updateTagsSchem = exports.createTagsSchem = void 0;
const zod_1 = require("zod");
//Create scheme
exports.createTagsSchem = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name cannot be empty"),
    articlesId: zod_1.z.number().int("The number must be an integer.").positive("ID cannot be negative"),
});
//Update scheme
exports.updateTagsSchem = zod_1.z.object({
    tagId: zod_1.z.number().int("The number must be an integer.").positive("ID cannot be negative"),
    name: zod_1.z.string().min(1, "Name cannot be empty"),
});
//Delete scheme
exports.deleteTagsSchem = zod_1.z.object({
    tagId: zod_1.z.number().int("The number must be an integer.").positive("ID cannot be negative"),
});
