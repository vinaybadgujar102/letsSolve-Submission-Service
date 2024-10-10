const fastifyPlugin = require("fastify-plugin");

/**
 *
 * @param {Fastify object} fastify
 * @param {*} options
 */

async function app(fastify, options) {
  await fastify.register(require("@fastify/cors"));

  await fastify.register(require("./repository/repositoryPlugin"));

  await fastify.register(require("./services/servicePlugin"));

  await fastify.register(require("./routes/api/apiRoutes"), {
    prefix: "/api",
  });
}

module.exports = fastifyPlugin(app);
