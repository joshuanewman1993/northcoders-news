const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const HomePage = require("./controllers/Homepage");
const { DB_URL } =
  process.env.NODE_ENV === "production" ? process.env : require("./config");
const { handle400, handle404, handle500 } = require("./error");
const apiRouter = require("./routes/api-route");
// need to stop forgetting to bring in objects and construct or deconstruct them
app.use(bodyParser.json());
//  { useNewUrlParser: true } this is no longer needed
//due to an update recently to mongoDB

mongoose
  .connect(DB_URL)
  .then(() => console.log(`Connected to database ${DB_URL}`))
  .catch(console.log());

// app.get("/", HomePage);

// this is used to render the html page from your view folder
app.get("/", (req, res, next) => {
  res.sendFile(`${__dirname}/views/api.html`);
});

app.use("/api", apiRouter);

app.use("/*", (req, res, next) => {
  next({ status: 404 });
});

app.use(handle400);
app.use(handle404);
app.use(handle500);
module.exports = app;
