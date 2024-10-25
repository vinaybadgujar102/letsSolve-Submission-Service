const fastifyPlugin = require("fastify-plugin");
const servicePlugin = require("./services/servicePlugin");
const repositoryPlugin = require("./repositories/repositoryPlugin");
const todoRoutes = require("./routes/api/v1/submissionRoutes");
const rateLimitConfig = require("./config/rateLimitConfig");
const cors = require("@fastify/cors");

/**
 *
 * @param {Fastify object} fastify
 * @param {*} options
 */
async function app(fastify, options) {
  await fastify.register(cors, { origin: "*" });
  await fastify.register(require("@fastify/rate-limit"), rateLimitConfig);
  await fastify.register(repositoryPlugin);
  await fastify.register(servicePlugin);

  await fastify.register(todoRoutes, { prefix: "/todos" });
  await fastify.register(require("./routes/api/apiRoutes"), { prefix: "/api" });
}

module.exports = fastifyPlugin(app);
