const { PORT } = process.env || 1802;
const app = require("./app");

// const port = 1802;

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`Server is listening on ${PORT}`);
});
