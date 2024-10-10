const submissionQueue = require("../queues/submissionQueue");

module.exports = async function (payload) {
  await submissionQueue.add("SubmissionQueue", payload);
  console.log("submission added to queue");
};
