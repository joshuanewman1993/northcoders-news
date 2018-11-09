const route = require("express").Router();
// const topicsRoute = require("./topics-route");
const articlesRoute = require("./articles-route");
const commentsRoute = require("./comments-route");
const usersRoute = require("./users-route");

// route.use("/topics", topicsRoute);
route.use("/articles", articlesRoute);
route.use("/comments", commentsRoute);
route.use("/users", usersRoute);

module.exports = route;
