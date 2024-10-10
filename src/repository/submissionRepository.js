const Submission = require("../models/submissionModel");

class SubmissionRepository {
  constructor() {
    this.submissionModel = Submission;
  }

  async createSubmission(submission) {
    const response = await this.submissionModel.create(submission);
    console.log(response);

    return response;
  }
}

module.exports = SubmissionRepository;
