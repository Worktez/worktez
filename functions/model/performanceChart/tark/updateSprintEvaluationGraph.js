/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { createSprintName, checkUpdateTime } = require("../../application/lib");
const { getAllSprints } = require("../../sprints/lib");
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

        getTeamUseTeamId(orgDomain, teamId).then((team) => {
            teamName = team.TeamName;
            if (sprintRange["SprintRange1"]<=0) {
                sprintRange["SprintRange1"] = 1;
            }
            getAllSprints(orgDomain, teamName, sprintRange["SprintRange1"], sprintRange["SprintRange2"]).then((sprints) => {
                sprints.forEach((sprintDoc) => {
                    fullSprintName = createSprintName(sprintDoc.SprintNumber);
                    storyPointArray = [parseInt(sprintDoc.StartStoryPoint), parseInt(sprintDoc.MidStoryPoint), parseInt(sprintDoc.EndStoryPoint)];
                    inputJson[fullSprintName] = storyPointArray;
                });
                if (lastUpdated == 0) {
                    setOrganizationsChart(orgDomain, teamName, "SprintEvaluationGraph", inputJson);
                } else {
                    updateChart(orgDomain, teamName, "SprintEvaluationGraph", inputJson);
                }
            });
        }).catch((error) => {
            console.log(error);
        });
    }
};