async function pingRequest(req, res) {
  console.log(this);

  const response = await this.testService.pingCheck();
  return res.send(response);
}

module.exports = { pingRequest };
