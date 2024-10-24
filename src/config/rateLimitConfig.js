const serverConfig = require("./serverConfig");

const rateLimitConfig = {
  production: {
    max: 1,
    timeWindow: "1 minute",
  },
  development: {
    max: 1000,
    timeWindow: "1 minute",
  },
};

module.exports = rateLimitConfig[serverConfig.NODE_ENV || "development"];
