const { createSubmission } = require("../controllers/submissionController");
const Submission = require("../models/submissionModel");

class SubmissionRepository {
  constructor() {
    this.submissionModel = Submission;
  }

  async createSubmission(submission) {
    console.log(submission);

    const response = await this.submissionModel.create(submission);
    return response;
  }

  async getUserProblemSubmissions(userID, problemID) {
    const submissions = await this.submissionModel
      .find({
        userID: userID,
        problemID: problemID,
      })
      .sort({ createdAt: -1 });
    return submissions;
  }
}

module.exports = SubmissionRepository;
