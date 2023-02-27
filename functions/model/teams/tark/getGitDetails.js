const {getGitDetailsById} = require("../lib");

exports.getGitDetails = function(request, response) {
  const orgDomain = request.body.data.OrganizationDomain;
  const teamName = request.body.data.TeamName;

  let status = 200;
  let result;

  getGitDetailsById(orgDomain, teamName)
      .then((gitData) => {
        if (gitData) {
          const result = {data: gitData};
          return response.status(status).send(result);
        }
      }).catch((error) => {
        status=500;
        result = {data: error};
        console.error(error);
        return response.status(status).send(result);
      });
};
