//@ts-check
const { MongoClient, ServerApiVersion } = require("mongodb");
let uri = process.env.MONGODB;

// @ts-ignore
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let dbInstance;

const connect = async (dbRef = "users") => {
  try {
    let conn = await client.connect();
    dbInstance = conn.db(dbRef);
    console.log("Connected to Database...");
  } catch (error) {
    console.log(error);
  }

  return client;
};

const db = () => {
  return dbInstance;
};

module.exports = { connect, db };
