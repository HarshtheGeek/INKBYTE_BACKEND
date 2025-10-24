require('dotenv').config();
const { createClient } = require("redis");

const redisClient = createClient({
  url: process.env.REDIS_URL ,
});

redisClient.on("connect", () => console.log("Redis connected"));
redisClient.on("error", (err) => console.error("Redis Error:", err));

(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;
