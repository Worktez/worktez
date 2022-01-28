/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { createSprintName } = require("../../application/lib");
const { getAllSprints } = require("../../sprints/lib");
const { getTeamUseTeamId } = require("../../teams/lib");
const { updateChart, setOrganizationsChart, getOrganizationsChartDetails } = require("../lib");

exports.updateSprintEvaluationGraphData = function(orgDomain, teamId, sprintRange) {
        let fullSprintName;
        let teamName;
        let storyPointArray=[];
        const inputJson = {};

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

                getOrganizationsChartDetails(orgDomain, teamId, "SprintEvaluationGraph").then((data) => {
                    if (data != undefined) {
                        updateChart(orgDomain, teamName, "SprintEvaluationGraph", inputJson);
                    } else {
                        setOrganizationsChart(orgDomain, teamName, "SprintEvaluationGraph", inputJson);
                    }
                    return null;
                }).catch((err) => {
                    console.log(err);
                });
                return null;
            }).catch((err) => {
                console.log(err);
            });
            return null;
        }).catch((error) => {
            console.log(error);
        });
};