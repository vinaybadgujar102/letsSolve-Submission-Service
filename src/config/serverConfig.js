const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  REDIS_PORT: process.env.REDIS_PORT || "6379",
  REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
  NODE_ENV: process.env.NODE_ENV,
  ATLAS_DB_URL: process.env.ATLAS_DB_URL,
  PROBLEM_ADMIN_SERVICE_URL: process.env.PROBLEM_ADMIN_SERVICE_URL,
};
