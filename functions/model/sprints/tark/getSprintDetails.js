/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
const { getSprint } = require("../lib");
const { createSprintName } = require("../../application/lib");

exports.getSprintDetails = function(request, response) {
  const orgDomain = request.body.data.OrgDomain;
  const sprintNumber = request.body.data.SprintNumber;
  const teamName = request.body.data.TeamName;
  const fullSprintName = createSprintName(sprintNumber);
  let result;
  const status = 200;

  const p1 = getSprint(orgDomain, teamName, fullSprintName).then((snapshot) => {
    result = snapshot;
  });

  return Promise.resolve(p1).then(() => {
    result = {data: {status: "Ok", sprintData: result}};
    return response.status(status).send(result);
  }).catch((error) => {
    console.error(error);
    result= {data: {status: "Error", sprintData: undefined}};
    return response.status(status).send(result);
  });
};

