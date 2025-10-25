const NodeCache = require("node-cache");

const memoryCache = new NodeCache({ stdTTL: 86400, checkperiod: 3600 }); 

module.exports = memoryCache;
