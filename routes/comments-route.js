const commentsRoute = require("express").Router();

const {
  fetchAllComments,
  fetchOneCommentById,
  postOneCommentById,
  deleteOneComment,
  changeCommentVote
} = require("../controllers/Comments");

commentsRoute.route("/").get(fetchAllComments);
commentsRoute
  .route("/:comment_id")
  .get(fetchOneCommentById)
  .patch(changeCommentVote)
  .post(postOneCommentById)
  .delete(deleteOneComment);

module.exports = commentsRoute;
