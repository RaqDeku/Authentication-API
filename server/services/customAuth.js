// @ts-check
const signJWT = require("../middleware/signJWT");
const { hashPassword, comparePassword } = require("../middleware/password");

class CustomAuthServices {
  /**
   * @param {import("../userDao")} dao
   */
  constructor(dao) {
    this.userDao = dao;
  }

  /**
   * @param {{email: string; password: string, accountType: string;}} userData
   */
  async createUser(userData) {
    const { email, password, accountType } = userData;
    let result;
    let error;
    switch (accountType) {
      case "customEmail":
        if (!password || !email)
          error = { statusCode: 400, payload: "Email and Password required!" };
        await hashPassword(password)
          .then(async (hash) => {
            let credentials = {
              email: email.trim(),
              password: hash,
              accountType,
            };
            await this.userDao.createUser(credentials).then(async (userId) => {
              let accessToken = await signJWT(userId);
              result = { statusCode: 201, payload: accessToken };
            });
          })
          .catch(() => {
            error = { statusCode: 500, payload: "Something Went Wrong!" };
          });
        break;

      case "google" || "facebook" || "twitter":
        await this.userDao
          .createUser({ email, password, accountType })
          .then(async (userId) => {
            result = { statusCode: 201, payload: await signJWT(userId) };
          });
        break;
      default:
        error = { statusCode: 500, payload: "Something Went Wrong!" };
        break;
    }
    return result ? result : error;
  }

  /**
   * @param {{ email: any; password: string; }} userData
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
        console.log(user);
        switch (user.accountType) {
          case "customEmail":
            if (!password)
              error = { statusCode: 400, payload: "Password Required!" };
            await comparePassword(password, user.password).then(
              async (match) => {
                if (match) {
                  result = { statusCode: 200, payload: await signJWT(user.id) };
                } else {
                  error = {
                    statusCode: 400,
                    payload: "Password Do Not Match!",
                  };
                }
              }
            );
            break;
          // Other Types of Social Auths
          case "google" || "facebook" || "twitter":
            result = { statusCode: 200, payload: await signJWT(user.id) };
            break;
          default:
            error = { statusCode: 400, payload: "User Not Found!" };
            break;
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
