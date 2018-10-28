const mongoose = require("mongoose");
const { formatArticle, formatComments } = require("../utils");
const { Topic, User, Article, Comment } = require("../models");

const seedDB = (topicsData, userData, articleData, commentData) => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      // promise.all here will only resolve if all the information we have requested is
      // returned otherwise it will reject
      return Promise.all([
        Topic.insertMany(topicsData),
        User.insertMany(userData)
      ]);
      // insertMany allows the insertion of data into to the database.
    })
    .then(([topicDocs, userDocs]) => {
      // Passing in the user docs here allows me to gain access to the id's
      const formattedArticles = formatArticle(articleData, userDocs);
      return Promise.all([
        topicDocs,
        userDocs,
        Article.insertMany(formattedArticles)
      ]);
    })
    .then(([topicDocs, userDocs, articleDocs]) => {
      const formattedComments = formatComments(
        commentData,
        userDocs,
        articleDocs
      );

      return Promise.all([
        topicDocs,
        userDocs,
        articleDocs,
        Comment.insertMany(formattedComments)
      ]);
    })
    .then(console.log());
};

module.exports = seedDB;
