/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { updateTeamDetails } = require("./lib");
const { sendVerificationEmail } = require("../users/addUserEmail");

exports.addMember = function(request, response) {
    const orgDomain = request.body.data.OrganizationDomain;
    const teamName = request.body.data.TeamName;
    const teamMembers = request.body.data.TeamMembers;
    const add = request.body.data.Add;
    const teamManager = request.body.data.TeamManager;
    const teamDescription = request.body.data.TeamDescription;
    const teamId = request.body.data.TeamId;

    let result;
    let status = 200;

    if (add != "") {
        teamMembers.push(add);
        const updateJson = {
            TeamMembers: teamMembers,
        };
        console.log(teamId);
        updateTeamDetails(updateJson, orgDomain, teamName);
        sendVerificationEmail(teamName, teamManager, teamDescription, add, orgDomain, teamId);
        result = { data: "Member added Successfully" };
        console.log("Member added Successfully");
    } else {
        result = { data: "Member not found" };
        console.error("Error while adding member");
        status = 500;
    }
    return response.status(status).send(result);
};