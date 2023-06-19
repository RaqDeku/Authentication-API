const jwt = require("jsonwebtoken");

/**
 * @param {any} data
 * @returns signed access token
 */
const signJWT = async (data) => {
  let accessToken;
  try {
    accessToken = jwt.sign({ data }, "yourSecretKey", {
      expiresIn: "30m",
    });
  } catch (error) {
    console.log(error);
  }
  return accessToken;
};

module.exports = signJWT;
