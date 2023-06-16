//@ts-check
const router = require("express")();
const CustomAuthController = require("../controllers/auth");
const customAuthControllers = new CustomAuthController();

const routes = (app) => {
  app.post("/auth/register", customAuthControllers.createUser);
  app.post("/auth/login", customAuthControllers.loginUser);
  app.get("/auth/google", customAuthControllers.authUserWithGoogle);
};

module.exports = routes;
