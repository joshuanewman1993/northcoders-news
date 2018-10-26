const articlesRoute = require("express").Router();
const {
  fetchAllArticles,
  fetchArticleById,
  postCommentsByArticleId
} = require("../controllers/Articles");

articlesRoute.get("/", fetchAllArticles);
articlesRoute.get("/:id", fetchArticleById);
articlesRoute.post("/:id/comments", postCommentsByArticleId);

module.exports = articlesRoute;
