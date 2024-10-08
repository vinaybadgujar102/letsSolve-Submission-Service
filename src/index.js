const fastify = require("fastify")({
  logger: true,
});
const app = require("./app");
const PORT = 3000;

fastify.register(app);
fastify.listen({ port: PORT }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
