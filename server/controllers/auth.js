"use strict";
// @ts-check
const CustomAuthService = require("../services/customAuth");
const SocialAuth = require("../services/socialAuth");
const UserDao = require("../userDao");
const customAuthService = new CustomAuthService(new UserDao());
const socialAuth = new SocialAuth();

/**
 * @description Custom Authentication class for all the supported forms of authentication
 */
class CustomAuthController {
  constructor() {}

  /**
   * @param {Request} req
   * @param {Response} res
   * @description Create User Controller for creating new User via custom email regiatration
   * @returns status Code and Payload from Service Class
   */
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

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @description Login User Controller for Logining in User via custom email login
   * @returns status Code and Payload from Service Class
   */
  async loginUser(req, res) {
    const { email, password } = req.body;
    let result = await customAuthService.loginUser({ email, password });
    return res.status(result.statusCode).json({ payload: result.payload });
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @description Updating Password of Users who choose Custom Login Authentication
   */
  async resetPassword(req, res) {}

  /**
   * @param {Request} req
   * @param {Response} res
   * @description Authenticate User who choose Google via the Social Auth Class
   * @returns status Code and Payload from Service Class
   */
  async authUserWithGoogle(req, res) {
    const { code, redirect_uri, action_type } = req.query;
    // Request for user data from Google
    let { email, accountType } = await socialAuth.authWithGoogle({
      code,
      redirect_uri,
    });

    let result;
    // Authenticate based on Action type of user
    switch (action_type) {
      case "register":
        result = await customAuthService.createUser({ email, accountType });
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

  /**
   * @param {Request} req
   * @param {Response} res
   * @description Authenticate User who choose Facebook via the Social Auth Class
   * @returns status Code and Payload from Service Class
   */

  async authWithFacebook(req, res) {
    const { code, redirect_uri, action_type } = req.query;
    // Request user data from Facebook
    let { email, accountType } = await socialAuth.authWithFacebook({
      code,
      redirect_uri,
    });
    let result;
    // Route based on Action type of user
    switch (action_type) {
      case "register":
        result = await customAuthService.createUser({ email, accountType });
        res.status(result.statusCode).json({ payload: result.payload });
        break;
      case "login":
        result = await customAuthService.loginUser({ email });
        res.status(result.statusCode).json({ payload: result.payload });
      default:
        res.status(400).json({ payload: "Bad Request" });
        break;
    }
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @description Authenticate User who choose Twitter using Social Class
   */
  async authWithTwitter(req, res) {
    const { redirect_uri, action_type } = req.query;
    // Request user data from Twitter
    const data = await socialAuth.authWithTwitter({ redirect_uri });
    // const { email, password, accountType } = data;

    // Authenticate User based on action type
    // let result;
    // switch (action_type) {
    //   case "register":
    //     result = await customAuthService.createUser({
    //       email,
    //       password,
    //       accountType,
    //     });
    //     res.status(result.statusCode).json({ payload: result.payload });
    //     break;

    //   default:
    //     break;
    // }
  }
}

module.exports = CustomAuthController;
