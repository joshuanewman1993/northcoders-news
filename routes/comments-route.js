const commentsRoute = require("express").Router();

const {
  fetchAllComments,
  fetchOneCommentById,
  postOneCommentById,
  deleteOneComment
} = require("../controllers/Comments");

commentsRoute.get("/", fetchAllComments);
commentsRoute.get("/:comment_id", fetchOneCommentById);
commentsRoute.post("/:comment_id", postOneCommentById);
commentsRoute.delete("/:comment_id", deleteOneComment);
module.exports = commentsRoute;
