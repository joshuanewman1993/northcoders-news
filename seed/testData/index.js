module.exports = {
  topics: require("./topics"),
  users: require("./users"),
  articles: require("./articles"),
  comments: require("./comments")
};

// we use an index file so that we can bring in the information directly
// by referencing one file this reduces the amount of import statements required.
