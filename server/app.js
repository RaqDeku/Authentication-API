const express = require("express");
const routes = require("./routes/route");
const cors = require("cors");

/**
 * @description Creates Express Server Instance
 * @returns Express server Instance
 */

const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: "http://localhost:5173",
      allowedHeaders: "Content-Type",
      methods: ["POST", "GET"],
    })
  );

  // Routes endpoint
  routes(app);

  return app;
};

module.exports = createServer;
