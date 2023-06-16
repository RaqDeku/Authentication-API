"use strict";
// @ts-check
const CustomAuthService = require("../services/customAuth");
const SocialAuth = require("../services/socialAuth");
const UserDao = require("../userDao");
const customAuthService = new CustomAuthService(new UserDao());
const socialAuth = new SocialAuth();

class CustomAuthController {
  constructor() {}

  async createUser(req, res) {
    const { email, password } = req.body;
    let result = await customAuthService.createUser({
      email,
      password,
      accountType: "customEmail",
    });
    console.log(result);
    return res.status(result.statusCode).json({ payload: result.payload });
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    let result = await customAuthService.loginUser({ email, password });
    return res.status(result.statusCode).json({ payload: result.payload });
  }

  async resetPassword() {}

  async authUserWithGoogle(req, res) {
    const { code, redirect_uri, action_type } = req.query;
    // Request for user data from Google
    let data = await socialAuth.authWithGoogle({ code, redirect_uri });
    const { email, password, accountType } = data;
    // console.log(`Data: ${JSON.stringify(data)}`);
    let result;
    // Route based on Action type of user
    switch (action_type) {
      case "register":
        result = await customAuthService.createUser({
          email,
          password,
          accountType,
        });
        // console.log(`Result: ${JSON.stringify(result)}`);
        res.status(result.statusCode).json({ payload: result.payload });
        break;
      case "login":
        result = await customAuthService.loginUser({ email });
        res.status(result.statusCode).json({ payload: result.payload });
        break;
      default:
        res.status(400).json({ payload: "Bad Request" });
        break;
    }
  }
}

module.exports = CustomAuthController;
