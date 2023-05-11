const redis = require("redis");
const PORT = 5001;
const client = redis.createClient();

client.on("error", (err) => console.log("Redis Server Error", err));

module.exports = client;
