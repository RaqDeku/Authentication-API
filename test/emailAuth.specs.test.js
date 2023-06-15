const EmailAuthService = require("../services/emailAuth");

describe("user service", () => {
  describe("User Dao class.generateAccessToken", () => {
    let generateAccessToken = jest.fn();
    let userExist = jest.fn();
    let createNewUser = jest.fn();
    let loginUser = jest.fn();

    beforeAll(() => {
      generateAccessToken.mockReset(),
        userExist.mockReset(),
        createNewUser.mockReset();
      loginUser.mockReset();
    });

    it("should generate access token", async () => {
      const userId = "2dhEcfyrh5hfc8";
      const dao = {
        generateAccessToken: generateAccessToken.mockReturnValueOnce(
          Promise.resolve(String)
        ),
        userExist,
        createNewUser,
        loginUser,
      };

      const emailAuthService = new EmailAuthService(dao);
      const token = await emailAuthService.generateAccessToken(userId);
      expect(token).toEqual(token);
    });
  });

  describe.only("userDao.userExist", () => {
    let generateAccessToken = jest.fn();
    let userExist = jest.fn();
    let createNewUser = jest.fn();
    let loginUser = jest.fn();

    beforeAll(() => {
      generateAccessToken.mockReset(),
        userExist.mockReset(),
        createNewUser.mockReset();
      loginUser.mockReset();
    });

    it("should return user", async () => {
      let user = {
        userId: "2dhEcfyrh5hfc8",
        email: "foo@gmail.com",
      };
      const dao = {
        generateAccessToken,
        userExist: userExist.mockReturnValueOnce(
          Promise.resolve({ userId: "2dhEcfyrh5hfc8", email: "foo@gmail.com" })
        ),
        createNewUser,
        loginUser,
      };
      const emailAuthService = new EmailAuthService(dao);
      const existingUser = await emailAuthService.userExist(user.email);
      expect(existingUser).toEqual(user);
    });
  });
});
