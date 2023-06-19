const bcrypt = require("bcrypt");

/**
 * @param {string} password
 * @returns Hashed Password
 */
const hashPassword = async (password) => {
  let hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

/**
 * @param {string} password
 * @param {string} hashedPassword
 * @returns Boolean
 */
const comparePassword = async (password, hashedPassword) => {
  let match = await bcrypt.compare(password, hashedPassword);
  return match;
};

module.exports = { hashPassword, comparePassword };
