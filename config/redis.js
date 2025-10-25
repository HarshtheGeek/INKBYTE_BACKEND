// redisClient.js
const { Redis } = require("@upstash/redis");

let redisClient;

if (!redisClient) {
  redisClient = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

module.exports = redisClient;
