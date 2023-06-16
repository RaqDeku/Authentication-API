// @ts-check

class SocialAuth {
  constructor() {}

  /**
   * @param {{code: string; redirect_uri: string;}} authData
   */
  async authWithGoogle(authData) {
    const { code, redirect_uri } = authData;
    let fetchOptions = {
      method: "POST",
    };
    let token; // Access Token from Google

    await fetch(
      `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&redirect_uri=${redirect_uri}&grant_type=authorization_code`,
      fetchOptions
    )
      .then((response) => response.json())
      .then(
        (data) =>
          // @ts-ignore
          (token = data.access_token)
      )
      .catch((err) => console.error(err));

    // Send Access Token back to Google for User Information
    let userInfoFromToken;
    await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((userInfo) => {
        userInfoFromToken = {
          email: userInfo.email,
          password: "",
          accountType: "google",
        };
      })
      .catch((err) => console.error(err));

    return userInfoFromToken;
  }

  async authWithFacebook() {}
}

module.exports = SocialAuth;
