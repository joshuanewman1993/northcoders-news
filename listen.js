// const port = process.env.Node_ENV || 1802;
process.env.NODE_ENV;
const app = require("./app");

const port = 1802;

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
