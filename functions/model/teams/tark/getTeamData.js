/* eslint-disable linebreak-style */
/* eslint-disable  object-curly-spacing*/
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { getTeamUseTeamId } = require("../lib");

exports.getTeamData = function(request, response) {
    const orgDomain = request.body.data.OrganizationDomain;
    const teamId = request.body.data.TeamId;

    let status = 200;
    let result;

    getTeamUseTeamId(orgDomain, teamId).then((team) => {
        if (team) {
            result = { data: {status: "OK", resultData: team} };
            return response.status(status).send(result);
        }
    }).catch((error) => {
        status = 500;
        result = { data: error };
        console.error("Error Getting Teams", error);
        return response.status(status).send(result);
    });
};
