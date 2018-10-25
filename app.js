const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const HomePage = require("./controllers/Homepage");
const { DB_URL } = require("./config");
const app = express();

// need to stop forgetting to bring in objects and construct or deconstruct them

//  { useNewUrlParser: true } this is no longer needed
//due to an update recently to mongoDB
console.log(DB_URL);
mongoose
  .connect(DB_URL)
  .then(() => console.log(`Connected to database ${DB_URL}`))
  .catch(console.log());

app.use(bodyParser.json());
app.get("/", HomePage);

module.exports = app;
