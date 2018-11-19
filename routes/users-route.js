const usersRoute = require("express").Router();
const {
  fetchAllUsers,
  fetchOneUserByUserName,
  createOneUser,
  deleteOneUserByUserName
} = require("../controllers/Users");

usersRoute.route("/").get(fetchAllUsers);
usersRoute.route("/:username").get(fetchOneUserByUserName);
usersRoute.route("/:username").post(createOneUser);
usersRoute.route("/:username").delete(deleteOneUserByUserName);
module.exports = usersRoute;
