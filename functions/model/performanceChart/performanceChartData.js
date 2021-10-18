/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { getAllTasks } = require("../tasks/lib");

exports.performanceChartData = function(request, response) {
    const data = request.body.data;
    const orgDomain = data.OrganizationDomain;
    const sprintRange = data.SprintNumberRange;
    const teamId = data.TeamId;
    let assignee = data.Assignee;
    let status = 200;

    const responseData = [];

    if (assignee == "Team") {
        assignee = "";
    }
    const performanceChartDataPromise = getAllTasks(orgDomain, teamId, "", assignee, "", "", "Completed", "", sprintRange["SprintRange1"], sprintRange["SprintRange2"]).then((snapshot) => {
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
        }
    }).catch((error) => {
        status = 500;
        console.log("Error:", error);
    });

    const promises = [performanceChartDataPromise];
    Promise.all(promises).then(() => {
            result = { data: { status: "OK", data: responseData } };
            console.log("Got Performance Chart Data Sucessfully");
            return response.status(status).send(result);
        })
        .catch((error) => {
            console.error("Error Getting Performance Chart Data", error);
            result = { data: { status: "Error", data: undefined } };
            return response.status(status).send(result);
        });
};