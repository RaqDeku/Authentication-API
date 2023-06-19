/**
 * @description Google Oauth
 */

// let googleQueryParams = {
//   client_id: import.meta.env.VITE_CLIENT_ID,
//   scope: "email",
//   redirect_uri: "http://localhost:5173/",
//   auth_type: "rerequest",
//   display: "popup",
//   response_type: "code",
// };

// let googleQuery = new URLSearchParams(googleQueryParams).toString();

// let googleUri = `https://accounts.google.com/o/oauth2/v2/auth?${googleQuery}`;

// let googleLink = document.getElementById("googlelink");
// googleLink.href = googleUri;

// const googleAuth = async () => {
//   const urlStr = window.location.href;
//   let url = new URL(urlStr);
//   let code = url.searchParams.get("code");
//   let redirect_uri = "http://localhost:5173/";
//   await fetch(
//     `http://localhost:3000/auth/google?code=${code}&redirect_uri=${redirect_uri}&action_type=login`
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       document.getElementById("token").innerHTML = data.payload;
//     });
// };
// googleLink.onclick(googleAuth());

/**
 * @description Facebook Oauth
 */

let facebookQueryParams = {
  client_id: import.meta.env.VITE_FACEBOOK_ID,
  redirect_uri: "http://localhost:5173/",
  display: "popup",
  response_type: "code",
  auth_type: "rerequest",
  scope: "public_profile email",
  state: "jj367632fdv2580auth",
};

let facebookQuery = new URLSearchParams(facebookQueryParams).toString();

let facebookUri = `https://www.facebook.com/v17.0/dialog/oauth?${facebookQuery}`;
let facebookLink = document.getElementById("facebooklink");
facebookLink.href = facebookUri;

const facebookAuth = async () => {
  let urlStr = window.location.href;
  let code = new URL(urlStr).searchParams.get("code");
  let redirect_uri = "http://localhost:5173/";
  // For the action_type; just change the value to either 'register / login' to hit
  // either route, the authentication process is the same for either.
  // the action_type would tell the backend what authentication is the user is performing and
  // process the necessary logic.
  await fetch(
    `http://localhost:3000/auth/facebook?code=${code}&redirect_uri=${redirect_uri}&action_type=register`
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
};

facebookLink.onclick(facebookAuth());

/**
 * @description Twitter Oauth
 */

// let redirect_uri = encodeURI("http://localhost:5173/");
// let twitterQueryParams = {
//   oauth_callback: redirect_uri,
//   oauth_consumer_key: import.meta.env.VITE_TWITTER_API_KEY,
// };

// let twitterQuery = new URLSearchParams(twitterQueryParams).toString();

// let twitterUri = `https://api.twitter.com/oauth/request_token?${twitterQuery}`;
// let twitterLink = document.getElementById("twitterlink");
// twitterLink.href = twitterUri;

// twitterLink.onclick(async () => {
//   let urlStr = window.location.href;
// });
