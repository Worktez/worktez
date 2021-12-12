/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
const { getTeamUseTeamId } = require("../teams/lib");
const { getOrganizationsChartDetails } = require("./lib");
const { updateSprintEvaluationGraphData } = require("./updateSprintEvaluationGraph");

exports.getSprintEvaluationGraph = function(request, response) {
  const data = request.body.data;
  const orgDomain = data.OrganizationDomain;
  const teamId = data.TeamId;
  const sprintRange = data.SprintNumberRange;
  let result;
  let teamName;
  let lastUpdated = 0;
  let status = 200;
  
  const sprintEvaluationGraphPromise = getTeamUseTeamId(orgDomain, teamId).then((team) => {
    teamName = team.TeamName;
    const p1 = getOrganizationsChartDetails(orgDomain, teamName, "SprintEvaluationGraph").then((doc) => {
      const responseData = [];
      if (doc == undefined) {
        updateSprintEvaluationGraphData(0, orgDomain, teamId, sprintRange);
        result = {data: {status: "ERROR", data: undefined}};
      } else {
        if (doc.LastUpdated != undefined) {
          lastUpdated = doc.LastUpdated;
        }
        updateSprintEvaluationGraphData(lastUpdated, orgDomain, teamId, sprintRange);
        for (const i in doc) {
          if (i!="LastUpdated") {
            const start = doc[i][0];
            const mid = doc[i][1];
            const end = doc[i][2];
            responseData.push([i, start, mid, end]);
          }
        }
        result = { data: { status: "OK", data: responseData } };
      }
    });
    return Promise.resolve(p1);
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });
  return Promise.resolve(sprintEvaluationGraphPromise).then(() => {
    console.log("Fetched Sprint Evaluation Graph Data Successfully");
    return response.status(status).send(result);
  }).catch((error) => {
    console.error("Error Fetching Sprint Evaluation Graph Data", error);
    return response.status(status).send(result);
  });
};
