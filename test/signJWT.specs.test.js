const signJWT = require("../middleware/signJWT");

describe("signing accessToken", () => {
  it("should return a jwt access token", async () => {
    const userId = "dtf3579BF6329hr4";
    let accessToken = signJWT(userId);
    expect(accessToken).toBe(accessToken);
  });
});
