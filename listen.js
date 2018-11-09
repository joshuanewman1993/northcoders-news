const port = process.env.PORT;
const app = require("./app");

// const port = 1802;

app.listen(port, err => {
  if (err) throw err;
  console.log(`Server is listening on ${port}`);
});
