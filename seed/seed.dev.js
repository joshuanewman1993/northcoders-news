// process.env.NODE_ENV || 'production';
// the above is used as part of the final stages of deployment and you seed it once
// then take it out.
const seedDB = require("./seed");
const mongoose = require("mongoose");
const { DB_URL } = require("../config");
const data = require("./testData");

// might be  worth renaming the above data to something more useful like topicData?
// the same goes for the others,
// I tried renaming the above to Topics/Articles/Users and it have me cannot read property
// of Topics undefined.
mongoose
  .connect(DB_URL)
  .then(() => {
    return seedDB(data.topics, data.users, data.articles, data.comments);
  })
  .then(() => mongoose.disconnect())
  .catch(console.log);
