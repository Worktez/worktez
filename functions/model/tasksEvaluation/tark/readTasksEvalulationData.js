/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { getAllTasks } = require("../../tasks/lib");

exports.readTasksEvaluationData = function(request, response) {
    const orgDomain = request.body.data.OrganizationDomain;
    const teamId = request.body.data.TeamId;
    const sprintRange1 = request.body.data.SprintRange1;
    const sprintRange2 = request.body.data.SprintRange2;
    const pageToLoad = request.body.data.PageToLoad;
    const tasks = [];
    let status = 200;
    let disableLoadMore = false;

    let p1;

    if (pageToLoad == "initial") {
        p1 = getAllTasks(orgDomain, teamId, -1, "", "", "", "", "", "", "").then(taskCol => {
            taskCol.forEach((taskDoc) => {
                tasks.push(taskDoc.data());
            });
        });
    } 

    const p2 = getAllTasks(orgDomain, teamId, "", "", "", "", "", "", sprintRange1, sprintRange2).then((taskCol) => {
        taskCol.forEach((taskDoc) => {
            tasks.push(taskDoc.data());
        });
    }).catch((error) => {
        status = 500;
        console.log("Error:", error);
    });
    

    return Promise.resolve(promise).then(() => {
        result = { data: {Tasks: tasks} };
        console.log("Read Task Evaluation Page Data Successfully");
        return response.status(status).send(result);
    }).catch((err) => {
        result = { data: err };
        console.log("Error occured in reading task evaluation page data");
        return response.status(status).send(result);
    });
};