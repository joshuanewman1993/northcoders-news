const commentsRoute = require("express").Router();

const {
  fetchAllComments,
  fetchOneCommentById,
  postOneCommentById,
  deleteOneComment
} = require("../controllers/comments");

commentsRoute.route("/").get(fetchAllComments);
commentsRoute.route("/:comment_id").get(fetchOneCommentById);
commentsRoute.route("/:comment_id").post(postOneCommentById);
commentsRoute.route("/:comment_id").delete(deleteOneComment);
module.exports = commentsRoute;
