const articlesRoute = require("express").Router();
const {
  fetchAllArticles,
  fetchArticleById,
  postCommentsByArticleId,
  fetchAllArticleCommentsbyId
} = require("../controllers/articles");

articlesRoute.get("/", fetchAllArticles);
articlesRoute.get("/:id", fetchArticleById);
articlesRoute.get("/:id/comments", fetchAllArticleCommentsbyId);

articlesRoute.post("/:id/comments", postCommentsByArticleId);

module.exports = articlesRoute;
