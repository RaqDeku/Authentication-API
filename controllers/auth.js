"use strict";
// @ts-check
const EmailAuthService = require("../services/customAuth");
const UserDao = require("../userDao");
const customAuthService = new EmailAuthService(new UserDao());

class CustomAuthController {
  constructor() {}

  async createUser(req, res) {
    const { email, password } = req.body;
    let result = await customAuthService.createUser({ email, password });
    console.log(result);
    res.status(result.statusCode).json({ payload: result.payload });
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    let result = await customAuthService.loginUser({ email, password });
    res.status(result.statusCode).json({ payload: result.payload });
  }

  async resetPassword() {}
}

module.exports = CustomAuthController;
