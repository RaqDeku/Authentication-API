// @ts-check
/**
 * @description Authentication Class for the various Social Oauths
 */
class SocialAuth {
  constructor() {}

  /**
   * @param {{code: string; redirect_uri: string;}} authData
   * @description Authentication Method for google
   * @returns User Data we want from the data Google provided
   */
  async authWithGoogle(authData) {
    const { code, redirect_uri } = authData;

    let token; // Access Token from Google

    await fetch(
      // @ts-ignore
      `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.CLIENT_ID_GOOGLE}&client_secret=${process.env.CLIENT_SECRET_GOOGLE}&redirect_uri=${redirect_uri}&grant_type=authorization_code`,
      { method: "POST" }
    )
      .then((response) => response.json())
      .then((data) => (token = data.access_token))
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
      .then(
        (userInfo) =>
          (userInfoFromToken = {
            email: userInfo.email,
            password: "",
            accountType: "google",
          })
      )
      .catch((err) => console.error(err));

    return userInfoFromToken;
  }

  /**
   * @param {{code: string; redirect_uri:string;}} authData
   * @description Authentication method for facebook
   * @returns User Data we want from data Facebook provided
   */
  async authWithFacebook(authData) {
    const { code, redirect_uri } = authData;
    let token;

    // Fetch Access Token from Facebook
    await fetch(
      `https://graph.facebook.com/v17.0/oauth/access_token?client_id=${process.env.CLIENT_ID_FACEBOOK}&redirect_uri=${redirect_uri}&client_secret=${process.env.CLIENT_SECRET_FACEBOOK}&code=${code}`,
      { method: "POST" }
    )
      .then((response) => response.json())
      .then((data) => (token = data.access_token))
      .catch((err) => console.log(err));
    // Send Token Back to Facebook for User Info
    let userInfoFromToken;
    await fetch(
      `https://graph.facebook.com/v12.0/me?fields=name,email&access_token=${token}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then(
        (userInfo) =>
          (userInfoFromToken = {
            email: userInfo.email,
            password: "",
            accountType: "facebook",
          })
      )
      .catch((err) => console.log(err));
    console.log(userInfoFromToken);
    return userInfoFromToken;
  }

  /**
   * @param {{redirect_uri: string}} authData
   * @description Authentication method twitter
   */
  async authWithTwitter(authData) {
    // Send a post to oauth/request_token
    const { redirect_uri } = authData;
    let encoded_uri = encodeURIComponent(redirect_uri);
    let params = {
      oauth_callback: encoded_uri,
      oauth_consumer_key: process.env.TWITER_API_KEY,
    };
    let request_token;
    await fetch(`https://api.twitter.com/oauth/request_token?${params}`)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }
}

module.exports = SocialAuth;
