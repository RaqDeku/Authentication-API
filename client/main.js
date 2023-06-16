let queryParams = {
  client_id: import.meta.env.VITE_CLIENT_ID,
  scope: "email",
  redirect_uri: "http://localhost:5173/",
  auth_type: "rerequest",
  display: "popup",
  response_type: "code",
};

let query = new URLSearchParams(queryParams).toString();

let uri = `https://accounts.google.com/o/oauth2/v2/auth?${query}`;

let googleLink = document.getElementById("googlelink");
googleLink.href = uri;

const googleAuth = async () => {
  const urlStr = window.location.href;
  let url = new URL(urlStr);
  let code = url.searchParams.get("code");
  let redirect_uri = "http://localhost:5173/";
  await fetch(
    `http://localhost:3000/auth/google?code=${code}&redirect_uri=${redirect_uri}&action_type=login`
  )
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("token").innerHTML = data.payload;
    });
};

googleLink.onclick(googleAuth());
