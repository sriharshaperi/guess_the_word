const gameRouter = require("./game-router");
const pnf = require("../templates/404");

module.exports = (app) => {
  app.use("/", gameRouter);
  app.get("*", function (req, res) {
    res.status(404).send(pnf.displayPage());
  });
};
