"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentsSchem = exports.updateCommentsSchem = exports.createCommentsSchem = void 0;
const zod_1 = require("zod");
//Create schem
exports.createCommentsSchem = zod_1.z.object({
    articleId: zod_1.z.number().int("The number must be an integer.").positive("ID cannot be negative"),
    content: zod_1.z.string().min(1, "Name is required"),
});
//Update schem
exports.updateCommentsSchem = zod_1.z.object({
    commentId: zod_1.z.number().int("The number must be an integer.").positive("ID cannot be negative"),
    content: zod_1.z.string().min(1, "Name is required"),
});
//Delete Schem
exports.deleteCommentsSchem = zod_1.z.object({
    commentId: zod_1.z.number().int("The number must be an integer.").positive("ID cannot be negative"),
});
