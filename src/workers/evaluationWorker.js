const { Worker } = require("bullmq");
const redisConnection = require("../config/redisConfig");

function evaluationWorker(queue) {
  new Worker(
    "evaluationWorker",
    async (job) => {
      if (job.name === "EvaluationJob") {
        try {
          const response = await axios.post(
            "http://localhost:3000/sendPayload",
            {
              userId: job.data.userId,
              payload: job.data,
            }
          );
          console.log(response);

          console.log("job data: ", job.data);
        } catch (error) {
          console.log(error);
        }
      }
    },
    {
      connection: redisConnection,
    }
  );
}

module.exports = evaluationWorker;
