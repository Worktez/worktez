const {getTeam} = require("../../teams/lib");

exports.checkIfUserAlreadyAMember = function(request, response) {
  const organizationDomain = request.body.data.OrganizationDomain;
  const teamName = request.body.data.TeamName;
  //   const teamId =request.body.data.TeamId;
  const userEmail = request.body.data.UserEmail;
  let status = 200;
  let resultData = "";

  getTeam(organizationDomain, teamName).then((data) => {
    const teamMembers = data.TeamMembers;
    if (teamMembers.indexOf(userEmail)) {
      resultData = "true";
    } else {
      resultData = "false";
    }
    const result = {data: resultData};
    return response.status(status).send(result);
  }).catch((err) => {
    status = 500;
    resultData = "false";
    console.error("Error : " + err);
    const result = {data: resultData};
    return response.status(status).send(result);
  });
};
