async function pingRequest(req, res) {
  console.log(this);

  const response = await this.testService.pingCheck();
  return res.send(response);
}

async function createSubmission(req, res) {
  const response = await this.submissionService.createSubmission(req.body);

  return res.status(201).json({
    error: {},
    data: response,
    success: true,
    message: "Created submission successfully",
  });
}

module.exports = { pingRequest, createSubmission };
