/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { createSprintName, checkUpdateTime } = require("../../application/lib");
const { getSprint } = require("../../sprints/lib");
const { getTeamUseTeamId } = require("../../teams/lib");
const { updateChart, setOrganizationsChart } = require("../lib");

exports.updateSprintEvaluationGraphData = function(lastUpdated, orgDomain, teamId, sprintRange) {
    const result = checkUpdateTime(lastUpdated);
    if (result) {
        let fullSprintName;
        let teamName;
        let storyPointArray=[];
        const inputJson = {};
        inputJson["LastUpdated"] = result;

        const sprintEvaluationGraphPromise = getTeamUseTeamId(orgDomain, teamId).then((team) => {
            teamName = team.TeamName;
            if (sprintRange["SprintRange1"]<=0) {
                sprintRange["SprintRange1"] = 1;
            }
            for (i = sprintRange["SprintRange1"]; i <= sprintRange["SprintRange2"]; i++) {
                fullSprintName = createSprintName(i);
                const getSprintPromise = getSprint(orgDomain, teamName, fullSprintName).then((sprintDoc) => {
                    storyPointArray = [parseInt(sprintDoc.StartStoryPoint), parseInt(sprintDoc.MidStoryPoint), parseInt(sprintDoc.EndStoryPoint)];
                    inputJson[fullSprintName] = storyPointArray;
                });
                return Promise.resolve(getSprintPromise);
            }
        }).catch((error) => {
            console.log(error);
        });
        return Promise.resolve(sprintEvaluationGraphPromise).then(() => {
            if (lastUpdated == 0) {
                setOrganizationsChart(orgDomain, teamName, "SprintEvaluationGraph", inputJson);
            } else {
                updateChart(orgDomain, teamName, "SprintEvaluationGraph", inputJson);
            }
            return;
            })
            .catch((error) => {
                return error;
            });
    }
};