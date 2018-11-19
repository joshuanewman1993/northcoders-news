const Article = require("../models/Article");
const Comment = require("../models/Comment");

const fetchAllArticles = (req, res, next) => {
  return Promise.all([Article.find().lean(), Comment.find().lean()])
    .then(([articlesData, commentsData]) => {
      //<-- use articleDocs and commentDocs
      const articles = articlesData.map(article => {
        const comment_count = commentsData.filter(
          comment => comment.belongs_to.toString() === article._id.toString()
        ).length;
        return { ...article, comment_count };
      });
      res.send({ articles });
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
  Comment.find({ belongs_to: req.params.id })
    .populate("created_by")
    .then(comments => {
      if (comments.length === 0) {
        return Promise.reject({ status: 404, msg: "comments not found" });
      }
      res.status(200).send({ comments });
    })
    .catch(next);
};

const postCommentsByArticleId = (req, res, next) => {
  const article_id = req.params.id;
  Comment.create({ ...req.body, belongs_to: article_id })
    .then(comment => {
      if (!comment) {
        return Promise.reject({ status: 400, msg: "You made a bad request" });
      }
      res.status(201).send({ comment });
    })
    .catch(next);
};

const changeArticleVote = (req, res, next) => {
  let value = req.query.vote === "up" ? 1 : req.query.vote === "down" ? -1 : 0;

  Article.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { votes: value } },
    { new: true }
  )
    .then(article => {
      res.status(200).send(article);
    })
    .catch(next);
};
module.exports = {
  fetchAllArticles,
  fetchArticleById,
  postCommentsByArticleId,
  fetchAllArticleCommentsbyId,
  changeArticleVote
};
