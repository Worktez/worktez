/* eslint-disable linebreak-style */
/* eslint-disable valid-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Sanjay Krishna <sanjaykrishna1203@gmail.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

const { addActivity } = require("../../activity/tark/addActivity");
const { addTask } = require("../lib");


 /**
 * Description
 * @param {any} request
 * @param {any} response
 * @return {any}
 */
exports.addTaskToMilestone = function(request, response) {
    const uid = request.body.data.Uid;
    const milestoneId = request.body.data.MilestoneId;
    const taskId = request.body.data.TaskId;
    const orgDomain = request.body.data.OrgDomain;
    const date = request.body.data.Date;
    const time = request.body.data.Time;
    let result;
    let status = 200;

    const promise = addTask(milestoneId, taskId, orgDomain).then(()=>{
        addActivity("Edited", "Edited Milestone Id", taskId, date, time, orgDomain, uid);
    }).catch((err)=>{
        result = { data: error };
        status = 500;
        console.error("Error", error);
    });
    Promise.resolve(promise).then(() => {
        console.log("Task added Successfully");
        result = { data: "Milestone task added successfully" };
        return response.status(status).send(result);
    })
    .catch((error) => {
        console.error("Error Adding task in milestone", error);
        return response.status(status).send(result);
    });
};