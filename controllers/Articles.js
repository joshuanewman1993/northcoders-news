const Article = require("../models/Article");
const Comment = require("../models/Comment");

const fetchAllArticles = (req, res, next) => {
  Article.find()
    .populate("created_by")
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};
const fetchArticleById = (req, res, next) => {
  Article.findById(req.params.id)
    .then(article => {
      if (!article) {
        return Promise.reject({ status: 404, msg: "article not found" });
      }
      res.status(200).send({ article });
    })
    .catch(next);
};
const postCommentsByArticleId = (req, res, next) => {
  // Do I need to access comments here?
  const article_id = req.params.article_id;
  const body = req.body;
  body.belongs_to = article_id;
  Comment.create(body)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

module.exports = {
  fetchAllArticles,
  fetchArticleById,
  postCommentsByArticleId
};
