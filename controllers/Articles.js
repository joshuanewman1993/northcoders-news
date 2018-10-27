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
    .populate("created_by")
    .then(article => {
      if (!article) {
        return Promise.reject({ status: 404, msg: "article not found" });
      }
      res.status(200).send({ article });
    })
    .catch(next);
};

const fetchAllArticleCommentsbyId = (req, res, next) => {
  // Comment???
  Comment.find({ belongs_to: req.params.id })
    .populate("created_by")
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

const postCommentsByArticleId = (req, res, next) => {
  const article_id = req.params.id;
  Comment.create({ ...req.body, belongs_to: article_id })
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
// const deleteOneArticle = (req, res, next) => {};

module.exports = {
  fetchAllArticles,
  fetchArticleById,
  postCommentsByArticleId,
  fetchAllArticleCommentsbyId
};
