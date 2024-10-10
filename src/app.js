const fastifyPlugin = require("fastify-plugin");

/**
 *
 * @param {Fastify object} fastify
 * @param {*} options
 */

async function app(fastify, options) {
  fastify.register(require("@fastify/cors"));

  fastify.register(require("./repository/repositoryPlugin"));

  fastify.register(require("./services/servicePlugin"));

  fastify.register(require("./routes/api/apiRoutes"), {
    prefix: "/api",
  });
}

module.exports = fastifyPlugin(app);
