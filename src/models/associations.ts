import Sequelize from "sequelize";
import sequelize from "../config/database";

import Categories from "./categories";
import Articles from "./articles";
import Authors from "./authors";
import Comments from "./comments";
import Tags from "./tags";
import articlesTags from "./articlesTags";

// Logic for table associations

// Categories have many articles
Categories.hasMany(Articles, {
    foreignKey: 'categoryId', // Adds the category_id field to the Articles table
    onDelete: 'CASCADE' // When a category is deleted, its articles are also deleted
});

// Articles belong to one category
Articles.belongsTo(Categories, {
    foreignKey: 'categoryId', // Specifies that an article belongs to a specific category
    onDelete: 'CASCADE'
});

// Articles belong to one author
Articles.belongsTo(Authors, {
    foreignKey: 'authorId', // Adds the author_id field to the Articles table
    onDelete: 'CASCADE'
});

// Authors have many articles
Authors.hasMany(Articles, {
    foreignKey: 'authorId', // Specifies that an author can have many articles
    onDelete: 'CASCADE'
});

// Comments belong to articles
Comments.belongsTo(Articles, {
    foreignKey: 'articleId', // Adds the article_id field to the Comments table
    onDelete: 'CASCADE'
});

// Articles have many comments
Articles.hasMany(Comments, {
    foreignKey: 'articleId', // Specifies that articles can have many comments
    onDelete: 'CASCADE'
});

// Many-to-many relationship between Articles and Tags
Articles.belongsToMany(Tags, { through: articlesTags, foreignKey: "articleId", onDelete: "CASCADE" });
Tags.belongsToMany(Articles, { through: articlesTags, foreignKey: "tagId", onDelete: "CASCADE" });

export {
    Categories,
    Articles,
    Authors,
    Comments,
    Tags,
};
