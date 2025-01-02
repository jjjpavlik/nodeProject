"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
1;
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const categories_1 = __importDefault(require("./routes/categories"));
const articles_1 = __importDefault(require("./routes/articles"));
const authors_1 = __importDefault(require("./routes/authors"));
const comments_1 = __importDefault(require("./routes/comments"));
const tags_1 = __importDefault(require("./routes/tags"));
const { Categories, Articles, Authors, Comments, Tags } = require("./models/associations");
const app = (0, express_1.default)();
// Middleware for processing data from forms
app.use(express_1.default.json()); // Middleware for working with JSON
// Routes
app.use('/categories', categories_1.default);
app.use("/tags", tags_1.default);
app.use('/articles', articles_1.default);
app.use('/authors', authors_1.default);
app.use('/comments', comments_1.default);
// Database synchronization
database_1.default.sync({ alter: true })
    .then(() => console.log('Database synchronized'))
    .catch(err => console.error(`An error occurred: ${err.message}`));
// API start
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('The server is deployed on port 8080'));
