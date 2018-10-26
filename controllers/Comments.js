const Comment = require("../models/Comment");

const fetchAllComments = (req, res, next) => {
  Comment.find()
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

module.exports = fetchAllComments;
