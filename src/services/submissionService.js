const SubmissionProducer = require("../producers/submissionQueueProducer");

class SubmissionService {
  contructor() {}

  async pingCheck() {
    return "pong";
  }

  async createSubmission(submission) {
    const response = await SubmissionProducer(submission);
    return response;
  }
}

module.exports = SubmissionService;
