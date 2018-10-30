const articlesRoute = require("express").Router();
const {
  fetchAllArticles,
  fetchArticleById,
  postCommentsByArticleId,
  fetchAllArticleCommentsbyId
} = require("../controllers/articles");

articlesRoute.route("/").get(fetchAllArticles);
articlesRoute.route("/:id").get(fetchArticleById);
articlesRoute.route("/:id/comments").get(fetchAllArticleCommentsbyId);

articlesRoute.route("/:id/comments").post(postCommentsByArticleId);

module.exports = articlesRoute;
