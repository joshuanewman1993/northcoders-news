const usersRoute = require("express").Router();
const fetchAllUsers = require("../controllers/Users");

usersRoute.get("/", fetchAllUsers);

module.exports = usersRoute;
