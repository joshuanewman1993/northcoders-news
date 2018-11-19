const articlesRoute = require("express").Router();
const {
  fetchAllArticles,
  fetchArticleById,
  postCommentsByArticleId,
  fetchAllArticleCommentsbyId,
  changeArticleVote
} = require("../controllers/Articles");

articlesRoute.route("/").get(fetchAllArticles);
articlesRoute
  .route("/:id")
  .get(fetchArticleById)
  .patch(changeArticleVote);
articlesRoute.route("/:id/comments").get(fetchAllArticleCommentsbyId);

articlesRoute.route("/:id/comments").post(postCommentsByArticleId);

module.exports = articlesRoute;
