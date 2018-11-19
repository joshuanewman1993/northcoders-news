const Comment = require("../models/Comment");

const fetchAllComments = (req, res, next) => {
  Comment.find()
    .populate("created_by")
    .lean()
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
const fetchOneCommentById = (req, res, next) => {
  Comment.findById(req.params.comment_id)
    .populate("created_by")
    .then(comment => {
      //putting the !comment below rejects any comments that are not found by the id
      if (!comment) {
        return Promise.reject({ status: 404, msg: "article not found" });
      }
      res.status(200).send({ comment });
    })
    .catch(next);
  //I was getting an uncaught error that is now caught with the 404 block here
};
const postOneCommentById = (req, res, next) => {
  const comments_id = req.params.comment_id;
  Comment.create({ ...req.body, created_by: comments_id })
    .then(comment => {
      if (!comment) {
        return Promise.reject({ status: 400, msg: "You made a bad request" });
      }
      res.status(201).send({ comment });
    })
    .catch(next);
};
const deleteOneComment = (req, res, next) => {
  Comment.findOneAndRemove(req.params.comment_id)
    .then(deleted => {
      if (!deleted || deleted.length === 0) {
        return Promise.reject({ status: 400, msg: "You made a bad request" });
      }
      res.status(204).send({ deleted });
    })
    .catch(next);
};

const changeCommentVote = (req, res, next) => {
  let value = req.query.vote === "up" ? 1 : req.query.vote === "down" ? -1 : 0;
  Comment.findOneAndUpdate(
    { _id: req.params.comment_id },
    { $inc: { votes: value } },
    { new: true }
  )
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(next);
};
module.exports = {
  fetchAllComments,
  fetchOneCommentById,
  deleteOneComment,
  postOneCommentById,
  changeCommentVote
};
