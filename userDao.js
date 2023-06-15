// @ts-check
const { db } = require("./config/db-config");
let dbCol = "users";

class UserDao {
  constructor() {}

  /**
   * @param {{email: string; password: string;}} user
   */
  async createUser(user) {
    let newUser = await db().collection(dbCol).insertOne(user);
    return newUser.insertedId;
  }

  /**
   * @param {{email: string}} email
   */
  async findUser(email) {
    let user = await db().collection(dbCol).findOne(email);
    return user;
  }

  /**
   * @param {{email: string}} email
   * @param {any} newPassword
   */
  async updatePassword(email, newPassword) {
    await db().collection(dbCol).updateOne(email, newPassword);
    return;
  }
}

module.exports = UserDao;
