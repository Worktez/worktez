/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable  object-curly-spacing*/
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { getAllTasks } = require("./lib");

exports.getTasksForDashboard = function(request, response) {
    const orgDomain = request.body.data.OrgDomain;
    const filterAssignee = request.body.data.FilterAssignee;
    const filterStatus = "Incomplete";
    const tasksData = [];
    let status = 200;
    let result;

    const getTasksPromise = getAllTasks(orgDomain, "", "", filterAssignee, "", "", filterStatus, "").then((taskCol) => {
        taskCol.forEach((taskDoc) => {
            tasksData.push(taskDoc.data());
        });
    }).catch((error) => {
        status = 500;
        console.log("Error:", error);
    });

    const promises = [getTasksPromise];
    Promise.all(promises).then(() => {
            result = { data: { status: "OK", data: tasksData } };
            console.log("Got Task Sucessfully");
            return response.status(status).send(result);
        })
        .catch((error) => {
            console.error("Error Getting Tasks", error);
            result = { data: { status: "Error", data: undefined } };
            return response.status(status).send(result);
        });
};