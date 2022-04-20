/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *author:sanjaykrishna1203@gmail.com
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/
const { sendMail } = require("../email/lib");
const { getTask } = require("../tasks/lib");
const { generateTemplate } = require("./tark/generateTemplate");

/**
 * Description
 * @param {any} mailType
 * @param {any} taskId
 * @param {any} orgDomain
 * @param {any} customParameter
 * @return {any}
 */
exports.taskMailer = function(mailType, taskId, orgDomain, customParameter) {
    let watchers = [];
    let valueArray = [];
    const promise = getTask(taskId, orgDomain).then((taskData) => {
        watchers = taskData.Watcher;

        if (mailType == "Watcher_Task") {
            valueArray.push(customParameter);// new Watcher email
            valueArray.push(taskId);
            generateTemplate(mailType, valueArray).then((data) => {
                const message = data;
                sendMail(customParameter, message[0], message[1]);
            });
        } else {
            watchers.forEach((element) => {
                valueArray = [];
                valueArray.push(customParameter);// commentor or Deletor or editor or logger name
                valueArray.push(taskId);
                valueArray.push(taskData.Assignee);// assignee email
                let message = "";
                if (element == watchers.Assignee) {
                    valueArray.push(false);// is watcher
                    generateTemplate(mailType, valueArray).then((data) => {
                        message = data;
                        sendMail(watchers.Assignee, message[0], message[1]);
                    });
                } else {
                    valueArray.push(true);// is watcher
                    valueArray.push(element);// watcher email
                    generateTemplate(mailType, valueArray).then((data) => {
                        message = data;
                        sendMail(element, message[0], message[1]);
                    });
                }
            });
        }
    }).catch((error) => {
        console.error(error);
        return error;
    });
    return Promise.resolve(promise);
};


/**
 * Description
 * @param {any} mailType
 * @param {any} uid
 * @param {any} email
 * @param {any} displayName
 */
exports.profileMailer = function(mailType, uid, email, displayName) {
    const valueArray = [];
    valueArray.push(uid);
    valueArray.push(email);
    valueArray.push(displayName);
    generateTemplate(mailType, valueArray).then((data)=>{
        const message = data;
        sendMail(email, message[0], message[1]);
    });
};


/**
 * Description
 * @param {any} mailType
 * @param {any} teamName
 * @param {any} teamManagerEmail
 * @param {any} userEmail
 * @param {any} organizationDomain
 * @param {any} teamId
 */
exports.verificationMailer = function(mailType, teamName, teamManagerEmail, userEmail, organizationDomain, teamId) {
    const valueArray = [];
    valueArray.push(teamName);
    valueArray.push(teamManagerEmail);
    valueArray.push(userEmail);
    valueArray.push(organizationDomain);
    valueArray.push(teamId);
    generateTemplate(mailType, valueArray).then((data)=>{
        const message = data;
        sendMail(userEmail, message[0], message[1]);
    });
};
