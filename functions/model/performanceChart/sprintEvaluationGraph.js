/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { createSprintName } = require("../application/lib");
const { getSprint } = require("../sprints/lib");
const { getTeamUseTeamId } = require("../teams/lib");


exports.sprintEvaluationGraph = function(request, response) {
    const data = request.body.data;
    const orgDomain = data.OrganizationDomain;
    const sprintNumber = data.SprintNumber;
    const fullSprintName = createSprintName(sprintNumber);
    const teamId = data.TeamId;
    let status = 200;
    let storyPointArray;

    const sprintEvaluationGraphPromise = getTeamUseTeamId(orgDomain, teamId).then((team) => {
        const teamName = team.TeamName;
        const getSprintPromise = getSprint(orgDomain, teamName, fullSprintName).then((sprintDoc) => {
            storyPointArray = [parseInt(sprintDoc.StartStoryPoint), parseInt(sprintDoc.MidStoryPoint), parseInt(sprintDoc.EndStoryPoint)];
        });
        return Promise.resolve(getSprintPromise);
    }).catch((error) => {
        status = 500;
        console.log(error);
    });

    return Promise.resolve(sprintEvaluationGraphPromise).then(() => {
            result = { data: { StoryPointArray: storyPointArray } };
            console.log("Sent Performance Chart Data Successfully");
            return response.status(status).send(result);
        })
        .catch((error) => {
            result = { data: error };
            return response.status(status).send(result);
        });
};