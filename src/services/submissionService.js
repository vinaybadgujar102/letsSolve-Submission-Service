const SubmissionProducer = require("../producers/submissionQueueProducer");

class SubmissionService {
  contructor(submissionRepository) {
    this.submissionRepository = submissionRepository;
  }

  async pingCheck() {
    return "pong";
  }

  async createSubmission(submission) {
    const submissionPayload =
      this.submissionRepository.createSubmission(submission);
    if (!submission) {
      // TODO: add error handling
      throw { message: "Not able to create submission" };
    }
    console.log("submission created", submission);

    const response = await SubmissionProducer(submission);
    return {
      queueResponse: response,
      submission: submissionPayload,
    };
  }
}

module.exports = SubmissionService;
