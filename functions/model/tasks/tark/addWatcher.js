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

/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if


const { updateTask, getTask } = require("../lib");

exports.addWatcher = function(request, response) {
    const taskId = request.body.data.TaskId;
    const orgDomain = request.body.data.OrgDomain;
    const newWatcher = request.body.data.NewWatcher;

    let status = 200;
    let result;
    const promises = [];
    const watchers = [];

    console.log(taskId)
    console.log(orgDomain)
    const addWatcherPromise = getTask(taskId, orgDomain).then((taskDoc) => {
       console.log(taskDoc);
        const updateTaskJson = {
            Watcher: newWatcher,
        };
        // updateTask(updateTaskJson, orgDomain, taskId);
        console.log(":actuallu updated task")

        promises.push(addWatcherPromise);

        Promise.all(promises).then(() => {
            result = { data: "Added watcher successfully!" };
            console.log("Watcher added successfully!");
            return response.status(status).send(result);
        })})
        .catch((error) => {
            status = 500;
            const result = { data: error };
            console.error("Error adding watcher", error);
            return response.status(status).send(result);
        });
};