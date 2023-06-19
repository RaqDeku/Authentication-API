// @ts-check
const { db } = require("./config/db-config");
let dbCol = "users";

/**
 * @description Servers as layer between database drivers and application and performs the CRUD ops on the database.
 */
class UserDao {
  constructor() {}

  /**
   * @param {any} user
   * @description Creates New User Document
   * @returns User Id (User Document ID)
   */
  async createUser(user) {
    let newUser = await db().collection(dbCol).insertOne(user);
    return newUser.insertedId;
  }

  /**
   * @param {{email: string}} email
   * @description Find User Document
   * @returns User Document
   */
  async findUser(email) {
    let user = await db().collection(dbCol).findOne(email);
    return user;
  }

  /**
   * @param {{email: string}} email
   * @param {any} newPassword
   * @description Update User Password
   */
  async updatePassword(email, newPassword) {
    await db().collection(dbCol).updateOne(email, newPassword);
    return;
  }
}

module.exports = UserDao;
