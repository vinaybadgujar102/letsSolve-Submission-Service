const { fetchProblemDetails } = require("../apis/problemAdminApi");
const SubmissionProducer = require("../producers/submissionQueueProducer");
const SubmissionCreationError = require("../errors/submissionCreation.error");
class SubmissionService {
  constructor(submissionRepository) {
    // inject here
    this.submissionRepository = submissionRepository;
  }

  async pingCheck() {
    return "pong";
  }

  async createSubmission(submissionPayload) {
    // Hit the problem admin service and fetch the problem details
    const problemId = submissionPayload.problemID;
    const userID = submissionPayload.userID;

    const problemAdminApiResponse = await fetchProblemDetails(problemId);

    if (!problemAdminApiResponse) {
      throw new SubmissionCreationError(
        "Failed to create a submission in the repository"
      );
    }

    const languageCodeStub = problemAdminApiResponse.data.codeStubs.find(
      (codeStub) =>
        codeStub.language.toLowerCase() ===
        submissionPayload.language.toLowerCase()
    );

    console.log("languageCodeStub", languageCodeStub);

    if (languageCodeStub) {
      console.log("here");

      submissionPayload.code =
        languageCodeStub.startSnippet +
        "\n\n" +
        submissionPayload.code +
        "\n\n" +
        languageCodeStub.endSnippet;
    }
    const submission = await this.submissionRepository.createSubmission(
      submissionPayload
    );
    if (!submission) {
      // TODO: Add error handling here
      throw new SubmissionCreationError(
        "Failed to create a submission in the repository"
      );
    }
    console.log(submission);
    const response = await SubmissionProducer({
      [submission._id]: {
        code: submission.code,
        language: submission.language,
        inputCase: problemAdminApiResponse.data.testCases[0].input,
        outputCase: problemAdminApiResponse.data.testCases[0].output,
        userID: userID,
        submissionId: submission._id,
      },
    });

    // TODO: Add handling of all testcases here .
    return { queueResponse: response, submission };
  }

  async getUserProblemSubmissions(userID, problemID) {
    if (!userID || !problemID) {
      throw new SubmissionCreationError("User ID and Problem ID are required");
    }

    const submissions =
      await this.submissionRepository.getUserProblemSubmissions(
        userID,
        problemID
      );

    console.log("submissions", submissions);
    return submissions;
  }
}

module.exports = SubmissionService;
