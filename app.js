const express = require("express");
const routes = require("./routes/route");

const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  routes(app);

  return app;
};

module.exports = createServer;
