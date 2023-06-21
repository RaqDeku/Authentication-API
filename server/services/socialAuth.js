// @ts-check
const getUriWithParam = require("../utils/queryString");

let GOOGLE_TOKEN_URI = "https://oauth2.googleapis.com/token";
let GOOGLE_USERINFO_URI = "https://www.googleapis.com/oauth2/v2/userinfo";

let FACEBOOK_TOKEN_URI = "https://graph.facebook.com/v17.0/oauth/access_token";
let FACEBOOK_USERINFO_URI = "https://graph.facebook.com/v12.0/me";

/**
 * @description Authentication Class for the various Social Oauths
 */
class SocialAuth {
  constructor() {}

  /**
   * @param {any} args
   * @returns Data Object from fetch()
   */
  async fetchData(...args) {
    // @ts-ignore
    return fetch(...args)
      .then((response) => response.json())
      .catch((err) => console.log(err));
  }
  /**
   * @param {{code: string; redirect_uri: string;}} authData
   * @description Authentication Method for google
   * @returns User Data
   */
  async authWithGoogle(authData) {
    const { code, redirect_uri } = authData;
    const tokenUrl = getUriWithParam(GOOGLE_TOKEN_URI, {
      code,
      client_id: process.env.CLIENT_ID_GOOGLE,
      client_secret: process.env.CLIENT_SECRET_GOOGLE,
      redirect_uri,
      grant_type: "authorization_code",
    });
    let { access_token } = await this.fetchData(tokenUrl, { method: "POST" });
    let { email } = await this.fetchData(GOOGLE_USERINFO_URI, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return { email, provider: "google" };
  }

  /**
   * @param {{code: string; redirect_uri:string;}} authData
   * @description Authentication method for facebook
   * @returns User Data
   */
  async authWithFacebook(authData) {
    const { code, redirect_uri } = authData;
    let tokenUrl = getUriWithParam(FACEBOOK_TOKEN_URI, {
      client_id: process.env.CLIENT_ID_FACEBOOK,
      client_secret: process.env.CLIENT_SECRET_FACEBOOK,
      code,
      redirect_uri,
    });
    const { access_token } = await this.fetchData(tokenUrl);
    const userInfoUrl = getUriWithParam(FACEBOOK_USERINFO_URI, {
      fields: ["name", "email"].join(","),
      access_token,
    });
    const { email } = await this.fetchData(userInfoUrl);
    return { email, provider: "facebook" };
  }

  async authWithTwitter(authData) {}
}

module.exports = SocialAuth;
