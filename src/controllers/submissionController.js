async function pingRequest(req, res) {
  console.log(this);

  const response = await this.testService.pingCheck();
  return res.send(response);
}

async function createSubmission(req, res) {
  console.log(req.body);

  const response = await this.submissionService.createSubmission(req.body);
  console.log("-----------------", response);

  return res.status(201).send({
    error: {},
    data: response,
    success: true,
    message: "Created submission successfully",
  });
}

async function getUserProblemSubmissions(req, res) {
  const { userID, problemID } = req.params;

  const submissions = await this.submissionService.getUserProblemSubmissions(
    userID,
    problemID
  );

  return res.status(200).send({
    error: {},
    data: submissions,
    success: true,
    message: "Successfully fetched user's submissions for the problem",
  });
}

module.exports = { pingRequest, createSubmission, getUserProblemSubmissions };
