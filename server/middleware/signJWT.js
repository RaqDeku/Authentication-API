const jwt = require("jsonwebtoken");

const signJWT = async (userId) => {
  let accessToken;
  try {
    accessToken = jwt.sign({ userId }, "yourSecretKey", {
      expiresIn: "30m",
    });
  } catch (error) {
    console.log(error);
  }
  return accessToken;
};

module.exports = signJWT;
