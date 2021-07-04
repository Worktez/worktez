/* eslint-disable object-curly-spacing */
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { setTeam, getTeam } = require("./lib");
const { updateTeam } = require("./updateTeam");


exports.createTeam = function(request, response) {
    const teamId = request.body.data.TeamId;
    const teamDescription = request.body.data.TeamDescription;
    const teamManagerEmail = request.body.data.TeamManagerEmail;
    const teamMembers = request.body.data.TeamMembers;
    const taskLabels = request.body.data.TaskLabels;
    const statusLabels = request.body.data.StatusLabels;
    const priorityLabels = request.body.data.PriorityLabels;
    const difficultyLabels = request.body.data.DifficultyLabels;

    const orgDomain = request.body.data.OrganizationDomain;
    const teamName = request.body.data.TeamName;

    let status = 200;

    const promise1 = getTeam(orgDomain, teamName).then((team) => {
        if (!team.exist) {
            const orgId = team.OrganizationId;

            setTeam(orgDomain, teamName, teamDescription, teamManagerEmail, teamMembers, taskLabels, statusLabels, priorityLabels, difficultyLabels, orgId, teamId);
        } else {
            updateTeam(request, response);
        }
    }).catch((error) => {
        status = 500;
        console.log("Error:", error);
    });
    // Need to get the organization collection to update the organization doc with the fresh teams array

    const Promises = [promise1];
    let result;
    return Promise.all(Promises).then(() => {
            result = { data: "Team Created Successfully" };
            console.log("Team Created Successfully");
            return response.status(status).send(result);
        })
        .catch((error) => {
            result = { data: error };
            console.error("Error Creating Team", error);
            return response.status(status).send(result);
        });
};