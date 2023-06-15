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
   * @param {{email: string; password: string}} userData
   */
  async createUser(userData) {
    const { email, password } = userData;
    let result;
    let error;
    await hashPassword(password)
      .then(async (hash) => {
        let credentials = { email: email.trim(), password: hash };
        await this.userDao.createUser(credentials).then(async (userId) => {
          let accessToken = await signJWT(userId);
          result = { statusCode: 201, payload: accessToken };
        });
      })
      .catch(() => {
        error = { statusCode: 500, payload: "Something Went Wrong" };
      });
    return result ? result : error;
  }

  /**
   * @param {{ email: any; password: any; }} userData
   */
  async loginUser(userData) {
    const { email, password } = userData;
    let result;
    let error;
    await this.userDao
      .findUser({ email })
      .then(async (user) => {
        if (user) {
          await comparePassword(password, user.password).then(async (match) => {
            if (match) {
              result = { statusCode: 200, payload: await signJWT(user.id) };
            } else {
              error = { statusCode: 400, payload: "Password Do Not Match!" };
            }
          });
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
