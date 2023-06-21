// @ts-check
const signJWT = require("../utils/signJWT");
const { hashPassword, comparePassword } = require("../utils/password");
const { AUTH_ERROR, SERVER_ERROR } = require("../constants/constants");

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
  async authCustomUser(userData) {
    const { email, password, provider } = userData;
    let result;
    let error;

    if (!password || !email)
      error = {
        statusCode: AUTH_ERROR.ERROR_CODE,
        payload: AUTH_ERROR.ERROR_MSG,
      };

    // Find User if User Exist
    await this.userDao.findUser({ email }).then(async (user) => {
      if (user) {
        await comparePassword(password, user.password)
          .then(async (match) => {
            if (match)
              result = { statusCode: 200, payload: await signJWT(user.id) };
            else
              error = {
                StatusCode: AUTH_ERROR.ERROR_CODE,
                payload: AUTH_ERROR.ERROR_MSG_PASSWORD,
              };
          })
          .catch(
            () =>
              (error = {
                statusCode: SERVER_ERROR.ERROR_CODE,
                payload: SERVER_ERROR.ERROR_MSG,
              })
          );
      } else {
        // Create User if User does not exist
        await hashPassword(password)
          .then(async (hash) => {
            await this.userDao
              .createUser({
                email,
                password: hash,
                provider: "customEmail",
              })
              .then(
                async (userId) =>
                  (result = {
                    statusCode: 200,
                    payload: await signJWT(userId),
                  })
              )
              .catch(
                () =>
                  (error = {
                    statusCode: SERVER_ERROR.ERROR_CODE,
                    payload: SERVER_ERROR.ERROR_MSG,
                  })
              );
          })
          .catch(
            () =>
              (error = {
                statusCode: SERVER_ERROR.ERROR_CODE,
                payload: SERVER_ERROR.ERROR_MSG,
              })
          );
      }
    });
    return result ? result : error;
  }

  async resetPassword() {}

  /**
   * @param {{email: string; provider: string }} authData
   * @description Authenticate User based on Oauth
   * @returns Access Token Or Error
   */
  async authWithOauth(authData) {
    const { email, provider } = authData;
    let result;
    let error;
    // First Find User if user Exist
    await this.userDao
      .findUser({ email })
      .then(async (user) => {
        if (user) {
          result = { statusCode: 200, payload: await signJWT(user.id) };
        } else {
          // Create User if User does not Exist
          await this.userDao
            .createUser({ email, provider })
            .then(async (userId) => {
              result = { statusCode: 200, payload: await signJWT(userId) };
            })
            .catch(() => {
              error = {
                statusCode: SERVER_ERROR.ERROR_CODE,
                payload: SERVER_ERROR.ERROR_MSG,
              };
            });
        }
      })
      .catch(() => {
        error = {
          statusCode: SERVER_ERROR.ERROR_CODE,
          payload: SERVER_ERROR.ERROR_MSG,
        };
      });
    return result ? result : error;
  }
}

module.exports = CustomAuthServices;
