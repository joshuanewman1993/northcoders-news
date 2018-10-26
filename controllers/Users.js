const Users = require("../models/User");

const fetchAllUsers = (req, res, next) => {
  Users.find().then(users => {
    res.status(200).send({ users });
  });
};

module.exports = fetchAllUsers;
