const {
  createSubmission,
  getUserProblemSubmissions,
} = require("../../../controllers/submissionController");

async function submissionRoutes(fastify, options) {
  fastify.post("/", createSubmission);
  fastify.get("/user/:userID/problem/:problemID", getUserProblemSubmissions);
}

module.exports = submissionRoutes;
