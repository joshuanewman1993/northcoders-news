sendHomePage = (req, res, next) => {
  res.send({ message: "Watson thinks #MitchIsGod" });
};

module.exports = sendHomePage;
