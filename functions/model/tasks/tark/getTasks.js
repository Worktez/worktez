/***********************************************************
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
/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable  object-curly-spacing*/
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { getAllTasks } = require("../lib");

exports.getTasks = function(request, response) {
    const orgDomain = request.body.data.OrgDomain;
    const teamId = request.body.data.TeamId;
    const sprintNumber = request.body.data.SprintNumber;
    const filterAssignee = request.body.data.FilterAssignee;
    const filterPriority = request.body.data.FilterPriority;
    const filterDifficulty = request.body.data.FilterDifficulty;
    const filterStatus = request.body.data.FilterStatus;
    const filterProject = request.body.data.FilterProject;
    const tasksData = [];
    let status = 200;
    let result;

    const getTasksPromise = getAllTasks(orgDomain, teamId, sprintNumber, filterAssignee, filterPriority, filterDifficulty, filterStatus, filterProject).then((taskCol) => {
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