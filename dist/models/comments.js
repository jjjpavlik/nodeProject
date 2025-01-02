"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Comments = database_1.default.define("comments", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    }
});
exports.default = Comments;
