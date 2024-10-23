const { Worker } = require("bullmq");
const redisConnection = require("../config/redisConfig");
const axios = require("axios");
const Submission = require("../models/submissionModel");

function evaluationWorker(queue) {
  new Worker(
    "EvaluationQueue",
    async (job) => {
      if (job.name === "EvaluationJob") {
        try {
          console.log("here");

          const submissionId = job.data.submissionId;
          const staus = job.data.response.status;
          const submissionUpdate = await Submission.updateOne(
            { _id: submissionId },
            { status: staus }
          );

          console.log(submissionUpdate);
          const response = await axios.post(
            "http://localhost:3001/sendPayload",
            {
              userID: job.data.userID,
              payload: job.data,
            }
          );
          console.log(response);
          console.log(job.data);
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
