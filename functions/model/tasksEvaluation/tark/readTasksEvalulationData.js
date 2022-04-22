/* eslint-disable linebreak-style */
/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

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
    const sprintNumber = request.body.data.SprintNumber;
    const pageToLoad = request.body.data.PageToLoad;
    const tasks = [];
    const backlogTasks = [];
    let status = 200;

    let promises;

    const p1 = getAllTasks(orgDomain, teamId, sprintNumber, "", "", "", "", "", "", "").then((taskCol) => {
        taskCol.forEach((taskDoc) => {
            tasks.push(taskDoc.data());
        });
    }).catch((error) => {
        status = 500;
        console.log("Error:", error);
    });

    if (pageToLoad == "initial") {
        const p2 = getAllTasks(orgDomain, teamId, -1, "", "", "", "", "", "", "").then((taskCol) => {
            taskCol.forEach((taskDoc) => {
                backlogTasks.push(taskDoc.data());
            });
        });
        promises = [p1, p2];
    } else {
        promises = [p1];
    }


    return Promise.all(promises).then(() => {
        result = { data: {Tasks: tasks, BacklogTasks: backlogTasks} };
        return response.status(status).send(result);
    }).catch((err) => {
        result = { data: err };
        return response.status(status).send(result);
    });
};