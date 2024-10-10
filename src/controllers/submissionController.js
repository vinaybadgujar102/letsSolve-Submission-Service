async function pingRequest(req, res) {
  console.log(this);

  const response = await this.testService.pingCheck();
  return res.send(response);
}

async function createSubmission(req, res) {
  console.log(req.body);

  const response = await this.submissionService.createSubmission(req.body);
  console.log(response);

  return res.status(201).send({
    error: {},
    data: response,
    success: true,
    message: "Created submission successfully",
  });
}

module.exports = { pingRequest, createSubmission };
