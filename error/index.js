const handle400 = (err, req, res, next) => {
  // console.log(err, "hi");
  if (err.status === 400 || err.name === "CastError") {
    res.status(400).send({ msg: err.message || "You made a bad request" });
  } else next(err);
};

const handle404 = (err, req, res, next) => {
  if (err.status === 404) res.status(404).send({ msg: "page not found" });
  else next(err);
};

const handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};

module.exports = { handle400, handle500, handle404 };
