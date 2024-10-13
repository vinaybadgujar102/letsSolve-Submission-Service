const axiosInstance = require("../config/axiosInstance");
const { PROBLEM_ADMIN_SERVICE_URL } = require("../config/serverConfig");

const problemAdminApi = `${PROBLEM_ADMIN_SERVICE_URL}/api/v1`;
async function fetchProblemDetails(problemId) {
  try {
    const uri = problemAdminApi + `/problems/${problemId}`;
    const response = await axiosInstance.get(uri);
    console.log("API response: ", response);
    return response.data;
  } catch (error) {
    console.log("Something went wrong while fetching problem details", error);
  }
}

module.exports = {
  fetchProblemDetails,
};
