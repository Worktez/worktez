/* eslint-disable linebreak-style */
/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author: Abhishek Mishra <am1426620@gmail.com>
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

/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if
const { updateTask, getTask } = require("../lib");

exports.addPrLink = function(request, response) {
    const orgDomain = request.body.data.OrganizationDomain;
    const taskId = request.body.data.TaskID;
    const prLink = request.body.data.PrLink;
    const prApiLink = request.body.data.PrApiLink;
    const prNumber = request.body.data.PrNumber;

    let status = 200;
    let result;

    const promise1 = getTask(taskId, orgDomain).then((task) => {
        if (task) {
            const updateJson = {
                PrLink: prLink,
                PrApiLink: prApiLink,
                PrNumber: prNumber,

            };
            updateTask(updateJson, orgDomain, taskId);
            result = { data: "Task Updated Successfully" };
            console.log("Task Updated Successfully");
        } else {
            status = 500;
            result = { data: "Error: Task doesn't exist" };
            console.log("Error: Task doesn't exist");
        }
    }).catch((error) => {
        status = 500;
        console.log("Error: ", error);
    });

    const Promises = [promise1];
    return Promise.all(Promises).then(() => {
            return response.status(status).send(result);
        })
        .catch((error) => {
            result = { data: error };
            console.error("Error updating Task", error);
            return response.status(status).send(result);
        });
};