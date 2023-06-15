const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  let hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  let match = await bcrypt.compare(password, hashedPassword);
  return match;
};

module.exports = { hashPassword, comparePassword };
