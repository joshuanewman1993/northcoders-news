const topicsRoute = require("express").Router();
const {
  fetchAllTopics,
  fetchOneSlug,
  fetchAllArticlesBySlugId,
  postArticleBySlugId
} = require("../controllers/topics");

topicsRoute.get("/", fetchAllTopics);
// fetch one topic by slug??!?
topicsRoute.route("/:slug").get(fetchOneSlug);
topicsRoute.route("/:slug/articles").get(fetchAllArticlesBySlugId);
topicsRoute.route("/:slug/articles").post(postArticleBySlugId);

// belongs_to is the slug
//on the req.params
module.exports = topicsRoute;
