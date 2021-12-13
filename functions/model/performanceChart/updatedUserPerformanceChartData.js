/* eslint-disable linebreak-style */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { setUserChart } = require("./lib");
const { getAllTasks } = require("../tasks/lib");
const { checkUpdateTime } = require("../application/lib");

exports.updatedUserPerformanceChartData =function(lastUpdated, orgDomain, assignee, uid, sprintRange) {
    const result = checkUpdateTime(lastUpdated);
    if (result) {
    let inputJson = {};
    inputJson["LastUpdated"] = result;
    let responseData = [];

    const userPerformanceChartDataPromise = getAllTasks(orgDomain, "", "", assignee, "", "", "Completed", "", sprintRange["SprintRange1"], sprintRange["SprintRange2"]).then((snapshot) => {
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
    }).catch((error) => {
        console.log("Error:", error);
    });

    return Promise.resolve(userPerformanceChartDataPromise).then(() => {
        setUserChart(orgDomain, uid, inputJson);
        return;
    })
    .catch((error) => {
            return error;
        });
    }
};