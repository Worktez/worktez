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


const { addActivity } = require("../../activity/tark/addActivity");
const { taskMailer } = require("../../mailer/lib");
const { sendNotification } = require("../../notifications/lib");
const { updateTask, getTask } = require("../lib");

exports.addWatcher = function(request, response) {
    const taskId = request.body.data.TaskId;
    const orgDomain = request.body.data.OrgDomain;
    const newWatcher = request.body.data.NewWatcher;
    const creationDate = request.body.data.CreationDate;
    const time = request.body.data.Time;
    const uid = request.body.data.Uid;

    let status = 200;
    let result;
    const promises = [];
    const watchers = [];
    let senderEmail = "";

    const addWatcherPromise = getTask(taskId, orgDomain).then((taskDoc) => {
        senderEmail = taskDoc.Assignee;
        taskDoc.Watcher.forEach((element) => {
            watchers.push(element);
        });
        if (!watchers.includes(newWatcher)) {
            watchers.push(newWatcher);
        }
        const updateTaskJson = {
            Watcher: watchers,
        };
        updateTask(updateTaskJson, orgDomain, taskId);

        promises.push(addWatcherPromise);

        Promise.all(promises).then(() => {
            result = { data: "Added watcher successfully!" };
            console.log("Watcher added successfully!");
            const link = "https://worktez.com/TaskDetails/" + taskId;

            const notificationMessage = "You have been added as a watcher for " + taskId;
            // const subjectMessage = "You have been added as a watcher";
            // const htmlMessage = "<div style=\"background-color:#E9ECEF;margin:auto;width:80%;padding-top: 30px;height:100%;\">" +
            //     "<table style=\"background-color:#ffffff;height:80%;width:80%;margin:auto;\"><tr><td><img src=\"https://worktez.com/assets/logo.png\" style=\"height:50%;width:50%;display:block;margin:auto;\" alt=\"worktez logo\"></td></tr>" +
            //     "<tr><td><h2 style=\"text-align:center;\">Welcome to Worktez</h2></td></tr>" + "<tr><td style=\"padding-left:30px;text-align:center;\"><p>" + "Hi " + newWatcher + "<br>" + notificationMessage + "</p></td></tr><tr style=\"text-align:center;\" rowspan=\"1\"><td><a href=\"https://worktez.com/TaskDetails/" + taskId + "\" target=\"_blank\" style=\"background-color: #dc3226; color: white; text-decoration:none; padding: 15px;border-radius:50px;border:red;cursor:pointer;\">View comment</a><p style=\"color:#666;\">Please click the button to view the comment.</p></td></tr><tr><td></td></tr></table>" + "<div style=\"text-align:center;padding:20px;\">" + "<p style=\"color:#666;\">Show us some love. Like & Follow us. Spread the word about Worktez.</p><a href=\"https://www.linkedin.com/company/worktez/\" target=\"_blank\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" class=\"bi bi-linkedin\" viewBox=\"0 0 16 16\" style=\"margin-left:10px;cursor:pointer;\"><path d=\"M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z\"/></svg></a><a href=\"https://github.com/Worktez/worktez\" target=\"_blank\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" class=\"bi bi-github\" viewBox=\"0 0 16 16\" style=\"margin-left:10px;cursor:pointer;\"><path d=\"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z\"/></svg></a></div></div>";

            addActivity("EDITED", "AddedWatcher", taskId, creationDate, time, orgDomain, uid);
            // sendMail(newWatcher, subjectMessage, htmlMessage);
            taskMailer("Watcher_Task", taskId, orgDomain, newWatcher);
            sendNotification(notificationMessage, senderEmail, uid, creationDate, time, orgDomain, link);
            return response.status(status).send(result);
        });
    })
        .catch((error) => {
            status = 500;
            const result = { data: error };
            console.error("Error adding watcher", error);
            return response.status(status).send(result);
        });
};