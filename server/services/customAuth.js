// @ts-check
const signJWT = require("../utils/signJWT");
const { hashPassword, comparePassword } = require("../utils/password");

/**
 * @description Custom Authentication Class which creates/login user(s)
 * @private User Dao
 */
class CustomAuthServices {
  userDao;
  /**
   * @param {import("../userDao")} dao
   * @description User Dao which servers as layer to interact which the database in absence of packages like mongoose.
   */
  constructor(dao) {
    this.userDao = dao;
  }

  /**
   * @param {{email: string; password: string, provider: string;}} userData
   * @description Create User Method
   * @returns Access Token or Error
   */
  async createUser(userData) {
    const { email, password, provider } = userData;
    let result;
    let error;
    if (provider === "customEmail") {
      if (!password || !email)
        error = { statusCode: 400, payload: "Email and Password required!" };
      await hashPassword(password)
        .then(async (hash) => {
          let credentials = {
            email: email.trim(),
            password: hash,
            provider,
          };
          await this.userDao.createUser(credentials).then(async (userId) => {
            let accessToken = await signJWT(userId);
            result = { statusCode: 201, payload: accessToken };
          });
        })
        .catch(() => {
          error = { statusCode: 500, payload: "Something Went Wrong!" };
        });
    } else if (provider === "google" || "facebook" || "twitter") {
      await this.userDao
        .createUser({ email, provider })
        .then(
          async (userId) =>
            (result = { statusCode: 201, payload: await signJWT(userId) })
        );
    } else {
      error = {
        statusCode: 400,
        payload: "Authentication Type is not Supported!",
      };
    }
    return result ? result : error;
  }

  /**
   * @param {{ email: any; password: string; }} userData
   * @description Login User Method
   * @returns Access Token or Error
   */
  async loginUser(userData) {
    const { email, password } = userData;
    let result;
    let error;
    // @check for email
    if (!email) error = { statusCode: 400, payload: "Email required!" };
    await this.userDao
      .findUser({ email })
      .then(async (user) => {
        if (user.provider === "customEmail") {
          if (!password)
            error = { statusCode: 400, payload: "Password Required!" };
          await comparePassword(password, user.password).then(async (match) => {
            if (match) {
              result = { statusCode: 200, payload: await signJWT(user.id) };
            } else {
              error = {
                statusCode: 400,
                payload: "Password Do Not Match!",
              };
            }
          });
          // Other Types of Social Auths
        } else if (user.provider === "google" || "facebook" || "twitter") {
          result = { statusCode: 200, payload: await signJWT(user.id) };
        } else {
          error = { statusCode: 400, payload: "User Not Found!" };
        }
      })
      .catch(() => {
        error = { statusCode: 500, payload: "Something Went Wrong!" };
      });
    return result ? result : error;
  }

  async resetPassword() {}
}

module.exports = CustomAuthServices;
