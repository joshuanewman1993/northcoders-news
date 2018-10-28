const Users = require("../models/User");

const fetchAllUsers = (req, res, next) => {
  // console.log(req.params.users, "is this undefined");
  Users.find()
    .then(users => {
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
      res.status(201).send({ user });
    })
    .catch(next);
};

const deleteOneUserByUserName = (req, res, next) => {
  Users.findOneAndRemove(req.params.username)
    .then(deleted => {
      res.status(301).send({ deleted });
    })
    .catch(next);
};
module.exports = {
  fetchAllUsers,
  fetchOneUserByUserName,
  createOneUser,
  deleteOneUserByUserName
};
