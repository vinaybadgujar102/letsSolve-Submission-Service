const fastify = require("fastify")({
  logger: true,
});
const app = require("./app");
const serverConfig = require("./config/serverConfig");
const { connectDB } = require("./config/dbConfig");
const evaluationWorker = require("./workers/evaluationWorker");
const errorHandler = require("./utils/errorHandler");

fastify.register(app);

fastify.setErrorHandler(errorHandler);

fastify.listen({ port: serverConfig.PORT, host: "0.0.0.0" }, async (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  await connectDB();

  evaluationWorker("EvaluationQueue");
  console.log(`Server up at port ${serverConfig.PORT}`);
});
