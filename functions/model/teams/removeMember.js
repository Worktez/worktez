/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { updateTeamDetails } = require("./lib");

exports.removeMember = function(request, response) {
    const orgDomain = request.body.data.OrganizationDomain;
    const teamName = request.body.data.TeamName;
    const teamMembers = request.body.data.TeamMembers;
    const remove = request.body.data.Remove;
    let result;
    let status = 200;

    const index = teamMembers.indexOf(remove);
    if (index != -1) {
        teamMembers.splice(index, 1);
        const updateJson = {
            TeamMembers: teamMembers,
        };
        updateTeamDetails(updateJson, orgDomain, teamName);
        result = { data: "Member removed Successfully" };
        console.log("Member removed Successfully");
    } else {
        result = { data: "Member not found" };
        console.error("Error while removing member");
        status = 500;
    }
    return response.status(status).send(result);
};
