// const {getTeam, updateTeamDetails} = require("../lib");

// exports.addGitDetails = function(request, response) {
//   const orgDomain = request.body.data.OrgDomain;
//   const teamName = request.body.data.teamName;
//   const inputJson = {};

//   let result;
//   const status=200;

//   const promise = getTeam(orgDomain, teamName).then((team) => {
//     if (team) {
//       let gitCounter = team.GitCounter;
//       gitCounter++;
//       const id = "G"+gitCounter;
//       inputJson["GitCounters"] = gitCounter;
//       updateTeamDetails(inputJson, orgDomain, teamName);
//       setGitDetails(orgDomain, teamName);
//     }
//   });
// };
