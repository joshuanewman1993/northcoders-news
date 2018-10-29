const usersRoute = require("express").Router();
const {
  fetchAllUsers,
  fetchOneUserByUserName,
  createOneUser,
  deleteOneUserByUserName
} = require("../controllers/users");

usersRoute.get("/", fetchAllUsers);
usersRoute.get("/:username", fetchOneUserByUserName);
usersRoute.post("/:username", createOneUser);
usersRoute.delete("/:username", deleteOneUserByUserName);
module.exports = usersRoute;
