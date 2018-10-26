const topicsRoute = require("express").Router();
const {
  fetchAllTopics,
  fetchAllArticlesBySlugId,
  postArticleBySlugId
} = require("../controllers/Topics");

topicsRoute.get("/", fetchAllTopics);
topicsRoute.get("/:slug/articles", fetchAllArticlesBySlugId);
topicsRoute.post("/:slug/articles", postArticleBySlugId);

// belongs_to is the slug
//on the req.params
module.exports = topicsRoute;
