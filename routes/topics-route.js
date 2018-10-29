const topicsRoute = require("express").Router();
const {
  fetchAllTopics,
  fetchOneSlug,
  fetchAllArticlesBySlugId,
  postArticleBySlugId
} = require("../controllers/topics");

topicsRoute.get("/", fetchAllTopics);
// fetch one topic by slug??!?
topicsRoute.get("/:slug", fetchOneSlug);
topicsRoute.get("/:slug/articles", fetchAllArticlesBySlugId);
topicsRoute.post("/:slug/articles", postArticleBySlugId);

// belongs_to is the slug
//on the req.params
module.exports = topicsRoute;
