require("dotenv").config();
const createServer = require("./app");
const { connect } = require("./config/db-config");
const app = createServer();
let port = process.env.PORT;

(async () => {
  await connect("users");

  app.listen(port, () => {
    console.log(`server is running on ${port}...`);
  });
})();
