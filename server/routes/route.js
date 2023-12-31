const CustomAuthController = require("../controllers/auth");
const customAuthControllers = new CustomAuthController();

/**
 * @param {import('../app')} app
 * @description Route endpoints with controllers
 */
const routes = (app) => {
  app.post("/auth/register", customAuthControllers.authCustomUser);
  app.post("/auth/login", customAuthControllers.authCustomUser);
  app.get("/auth/google", customAuthControllers.authUserWithGoogle);
  app.get("/auth/facebook", customAuthControllers.authWithFacebook);
  app.post("/auth/twitter", customAuthControllers.authWithTwitter);
};

module.exports = routes;
