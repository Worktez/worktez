/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { getAllTasks } = require("../../tasks/lib");
const { setOrganizationsChart } = require("../lib");
const { getTeamUseTeamId } = require("../../teams/lib");

exports.updatePerformanceChartData = function(orgDomain, teamId, assignee, sprintRange) {
    let teamName;
    const responseData = [];
    const inputJson = {};

    if (assignee == "Team") {
        assignee = "";
    }
    getTeamUseTeamId(orgDomain, teamId).then((team) => {
        teamName = team.TeamName;
        const promise1 = getAllTasks(orgDomain, teamId, "", assignee, "", "", "Completed", "", sprintRange["SprintRange1"], sprintRange["SprintRange2"]).then((snapshot) => {
            let i; let storyPoint; let data;
            for (i = sprintRange["SprintRange1"]; i <= sprintRange["SprintRange2"]; i++) {
                storyPoint = 0;
                snapshot.docs.forEach((taskDoc) => {
                    data = taskDoc.data();
                    if (data.SprintNumber == i) {
                        storyPoint += data.StoryPointNumber;
                    }
                });
                responseData.push(["S" + i, storyPoint]);
                inputJson["S"+i]=storyPoint;
            }
            setOrganizationsChart(orgDomain, teamName, "PerformanceChart", inputJson);
        });
        return Promise.resolve(promise1);
    }).catch((error) => {
        console.log("Error:", error);
    });
};