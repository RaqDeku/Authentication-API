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
   * @description Create User Controller for authenticating User via custom email regiatration
   * @returns status Code and Payload from Service Class
   */
  async authCustomUser(req, res) {
    const { email, password } = req.body;
    let result = await customAuthService.authCustomUser({ email, password });
    console.log(result);
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
    const { code, redirect_uri } = req.query;
    // Request for user data from Google
    let { email, provider } = await socialAuth.authWithGoogle({
      code,
      redirect_uri,
    });

    let result = await customAuthService.authWithOauth({ email, provider });
    return res.status(result.statusCode).json({ payload: result.payload });
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @description Authenticate User who choose Facebook via the Social Auth Class
   * @returns status Code and Payload from Service Class
   */

  async authWithFacebook(req, res) {
    const { code, redirect_uri } = req.query;
    // Request user data from Facebook
    let { email, provider } = await socialAuth.authWithFacebook({
      code,
      redirect_uri,
    });
    let result = await customAuthService.authWithOauth({ email, provider });
    return res.status(result.statusCode).json({ payload: result.payload });
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @description Authenticate User who choose Twitter using Social Class
   */
  async authWithTwitter(req, res) {}
}

module.exports = CustomAuthController;
