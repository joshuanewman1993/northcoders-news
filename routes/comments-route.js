const commentsRoute = require("express").Router();

const fetchAllComments = require("../controllers/Comments");

commentsRoute.get("/", fetchAllComments);

module.exports = commentsRoute;
