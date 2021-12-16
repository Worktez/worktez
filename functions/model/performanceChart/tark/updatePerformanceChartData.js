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
const { checkUpdateTime } = require("../../application/lib");

exports.updatePerformanceChartData = function(lastUpdated, orgDomain, teamId, assignee, sprintRange) {
    const result = checkUpdateTime(lastUpdated);
    if (result) {
    let teamName;
    const responseData = [];
    const inputJson = {};
    inputJson["LastUpdated"] = result;

    if (assignee == "Team") {
        assignee = "";
    }
    const performanceChartDataPromise = getTeamUseTeamId(orgDomain, teamId).then((team) => {
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
        });
        return Promise.resolve(promise1);
    }).catch((error) => {
        console.log("Error:", error);
    });
    return Promise.resolve(performanceChartDataPromise).then(() => {
        setOrganizationsChart(orgDomain, teamName, "PerformanceChart", inputJson);
        return;
    })
    .catch((error) => {
        return error;
        });
    }
};