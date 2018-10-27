const Topic = require("../models/Topic");
const Article = require("../models/Article");

const fetchAllTopics = (req, res, next) => {
  Topic.find()
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(next);
};
const fetchOneSlug = (req, res, next) => {
  const slug = req.params.slug;
  Article.findOne({ belongs_to: slug })
    // .populate("created_by")
    .then(topic => {
      res.status(200).send({ topic });
    })
    .catch(next);
};
const fetchAllArticlesBySlugId = (req, res, next) => {
  const slug = req.params.slug;
  Article.find({ belongs_to: slug })
    .populate("created_by")
    .then(topics => {
      // I use this error handling here to reject any topic slug and return a promise reject with a status 404
      if (topics.length === 0) {
        return Promise.reject({ status: 404, msg: "page not found" });
      }
      res.status(200).send({ topics });
    })
    .catch(next);
};
const postArticleBySlugId = (req, res, next) => {
  const slug = req.params.slug;
  Article.create({ ...req.body, belongs_to: slug })
    .then(article => {
      res.status(201).send({ article });
    })
    .catch(next);
};

module.exports = {
  fetchAllTopics,
  fetchOneSlug,
  fetchAllArticlesBySlugId,
  postArticleBySlugId
};
