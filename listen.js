// const port = process.env.PORT || 1802;
// process.env.NODE_ENV;
const app = require("./app");

const port = 1802;

app.listen(port, err => {
  if (err) throw err;
  console.log(`Server is listening on ${port}`);
});
