/* eslint-disable linebreak-style */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { setUserChart } = require("../lib");
const { getAllTasks } = require("../../tasks/lib");
const { getUserUseEmail } = require("../../users/lib");

exports.updatedUserPerformanceChartData =function(orgDomain, assignee, sprintRange) {
        let inputJson = {};
        let responseData = [];

        getUserUseEmail(assignee).then((data) => {
            const uid = data.uid;
            getAllTasks(orgDomain, "", "", assignee, "", "", "Completed", "", sprintRange["SprintRange1"], sprintRange["SprintRange2"]).then((snapshot) => {
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
                setUserChart(orgDomain, uid, inputJson);
            }).catch((error) => {
                console.log("Error:", error);
            });
        }).catch((error) => {
            console.log("Error:", error);
        });
};