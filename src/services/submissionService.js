const SubmissionProducer = require("../producers/submissionQueueProducer");

class SubmissionService {
  contructor(submissionRepository) {
    this.submissionRepository = submissionRepository;
  }

  async pingCheck() {
    return "pong";
  }

  async createSubmission(submissionPayload) {
    const submission = await this.submissionRepository.createSubmission(
      submissionPayload
    );
    if (!submission) {
      // TODO: add error handling
      throw { message: "Not able to create submission" };
    }
    console.log("submission created", submission);

    const response = await SubmissionProducer(submission);
    return {
      queueResponse: response,
      submission,
    };
  }
}

module.exports = SubmissionService;
