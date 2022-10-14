const {getTeam} = require("../lib");
const {updateTeamDetails, createLabelProperties} = require("../lib");

exports.updateTeamLabels = function(request, response) {
  const type = request.body.data.TypeLabels;
  const statusLabels = request.body.data.StatusLabels;
  const priorityLabels = request.body.data.PriorityLabels;
  const difficultyLabels = request.body.data.DifficultyLabels;
  const milestoneStatusLabels = request.body.data.MilestoneStatusLabels;
  const orgDomain = request.body.data.OrganizationDomain;
  const teamName = request.body.data.TeamName;

    // console.log(type, statusLabels, priorityLabels, difficultyLabels, milestoneStatusLabels, orgDomain, teamName);

  let status = 200;
  let result = {data: "Error updating team labels"};

  const promise1 = getTeam(orgDomain, teamName).then((teamData) => {
    if (teamData) {
      const updateJson = {
        Type: type,
        Status: statusLabels,
        Priority: priorityLabels,
        Difficulty: difficultyLabels,
        MilestoneStatus: milestoneStatusLabels,
        };
        console.log("check");
      updateTeamDetails(updateJson, orgDomain, teamName).then(() => {
      createLabelProperties(orgDomain, teamName, type, statusLabels, priorityLabels, difficultyLabels, milestoneStatusLabels);
    });
      result = {data: "Labels updated successfully"};
      console.log("Labels Updated Successfully");
    } else {
      status = 500;
      result = {data: "Error: Team doesn't exist"};
      console.log("Error: Team doesn't exist");
    }
  }).catch((error) => {
    status = 500;
    console.log("Error: ", error);
  });
  const Promises = [promise1];
  return Promise.all(Promises).then(() => {
    return response.status(status).send(result);
  }).catch((error) => {
    result = {data: error};
    console.error("Error updating Labels", error);
    return response.status(status).send(result);
  });
};
