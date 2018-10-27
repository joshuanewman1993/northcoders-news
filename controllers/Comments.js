const Comment = require("../models/Comment");

const fetchAllComments = (req, res, next) => {
  Comment.find()
    .populate("created_by")
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
const fetchOneCommentById = (req, res, next) => {
  // console.log(req.params.comment_id);
  Comment.findById(req.params.comment_id)
    .populate("created_by")
    .then(comment => {
      if (!comment) {
        return Promise.reject({ status: 404, msg: "article not found" });
      }
      res.status(200).send({ comment });
    })
    .catch(next);
};
const postOneCommentById = (req, res, next) => {
  const comments_id = req.params.comment_id;
  Comment.create({ ...req.body, created_by: comments_id })
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
const deleteOneComment = (req, res, next) => {
  Comment.findOneAndRemove(req.params.comment_id)
    .then(deleted => {
      res.status(301).send({ deleted });
    })
    .catch(next);
};

module.exports = {
  fetchAllComments,
  fetchOneCommentById,
  deleteOneComment,
  postOneCommentById
};
