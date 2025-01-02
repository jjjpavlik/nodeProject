import Sequelize from "sequelize";
import sequelize from "../config/database";

import Categories from"./categories";
import Articles from"./articles";
import Authors from"./authors";
import Comments from"./comments";
import Tags from"./tags";
import articlesTags from"./articlesTags";

// Логіка прив'язок таблиць

// Категорії мають багато статей
Categories.hasMany(Articles, {
    foreignKey: 'categoryId', // Додає поле category_id до таблиці Articles
    onDelete: 'CASCADE' // У разі видалення категорії статті також видаляються
});

// Статті належать до однієї категорії
Articles.belongsTo(Categories, {
    foreignKey: 'categoryId', // Вказує, що стаття належить до певної категорії
    onDelete: 'CASCADE'
});

// Статті належать до одного автора
Articles.belongsTo(Authors, {
    foreignKey: 'authorId', // Додає поле author_id до таблиці Articles
    onDelete: 'CASCADE'
});

// Автор має багато статей
Authors.hasMany(Articles, {
    foreignKey: 'authorId', // Вказує, що автор має багато статей
    onDelete: 'CASCADE'
});

// Коментарі належать до статей
Comments.belongsTo(Articles, {
    foreignKey: 'articleId', // Додає поле article_id до таблиці Comments
    onDelete: 'CASCADE'
});

// Статті мають багато коментарів
Articles.hasMany(Comments, {
    foreignKey: 'articleId', // Вказує, що статті мають багато коментарів
    onDelete: 'CASCADE'
});

Articles.belongsToMany(Tags, {through: articlesTags, foreignKey: "articleId", onDelete: "CASCADE"});
Tags.belongsToMany(Articles, {through: articlesTags, foreignKey: "tagId", onDelete: "CASCADE"});

export {
    Categories,
    Articles,
    Authors,
    Comments,
    Tags,
};
