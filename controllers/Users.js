const Users = require("../models/User");

const fetchAllUsers = (req, res, next) => {
  Users.find()
    .then(users => {
      if (users.length === 0) {
        return Promise.reject({ status: 404, msg: "user not found" });
      }
      res.status(200).send({ users });
    })
    .catch(next);
};

const fetchOneUserByUserName = (req, res, next) => {
  Users.findOne({ username: req.params.username })
    .then(user => {
      if (!user) {
        return Promise.reject({ status: 404, msg: "user not found" });
      }
      res.status(200).send({ user });
    })
    .catch(next);
};

const createOneUser = (req, res, next) => {
  Users.create({ ...req.body, username: req.params.username })
    .then(user => {
      if (!user) {
        Promise.reject({ status: 400, msg: "You made a bad request" });
      }
      res.status(201).send({ user });
    })
    .catch(next);
};

const deleteOneUserByUserName = (req, res, next) => {
  Users.findOneAndRemove({ username: req.params.username })
    .then(deleted => {
      // this is not fully functioning properly it allows you to delete based on any username
      //but it sends a bad request out when there is no users currently.
      if (deleted.length === 0) {
        return Promise.reject({ status: 400, msg: "You made a bad request" });
      }
      res.status(204).send({ deleted });
    })
    .catch(next);
};
module.exports = {
  fetchAllUsers,
  fetchOneUserByUserName,
  createOneUser,
  deleteOneUserByUserName
};
