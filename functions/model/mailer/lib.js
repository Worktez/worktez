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
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/
const { sendMail } = require("../email/lib");
const { getTask } = require("../tasks/lib");

/**
 * Description
 * @param {any} mailType
 * @param {any} senderEmailOrUid
 * @param {any} receiverEmailOrUid
 * @param {any} taskId
 * @return {any}
 */
exports.taskMailer = function (mailType, taskId, orgDomain, customParameter) {
    var watchers = [];
    var valueArray = [];
    var htmlMessage = "";
    const promise = getTask(taskId, orgDomain).then((taskData) => {
        console.log(taskData.taskId, "TaskId");
        watchers = taskData.Watcher;
        console.log(watchers);

        if (mailType == "Watcher_Task") {
            valueArray.push(customParameter);//new Watcher email
            valueArray.push(taskId);
            message = generateTemplate(mailType, valueArray)
            sendMail(customParameter, message[0], message[1]);
        }
        else {
            watchers.forEach(element => {
                valueArray = [];
                valueArray.push(customParameter);//commentor or Deletor or editor or logger name
                valueArray.push(taskId);
                valueArray.push(taskData.Assignee)//assignee email
                if (element == watchers.Assignee) {
                    valueArray.push(false);//is watcher
                    var message = generateTemplate(mailType, valueArray);
                    sendMail(watchers.Assignee, message[0], message[1]);
                }
                else {
                    valueArray.push(true);//is watcher
                    valueArray.push(element);//watcher email
                    var message = generateTemplate(mailType, valueArray);
                    sendMail(element, message[0], message[1]);
                }
            });
        }
        return Promise.resolve(promise);
    }).catch((error) => {
        console.error(error);
        return error;
    });
};


/**
 * Description
 * @param {any} mailType
 * @param {any} senderEmailOrUid
 * @param {any} receiverEmailOrUid
 * @param {any} taskId
 * @return {any}
 */
exports.profileMailer = function (mailType, uid, email, displayName) {
    var valueArray = [];
    valueArray.push(uid);
    valueArray.push(email);
    valueArray.push(displayName);
    var message = generateTemplate(mailType, valueArray);
    console.log(email, "email in profilemailer");
    const promise = sendMail(email, message[0], message[1]).catch((error) => {
        console.error(error);
        return error;
    });
    return Promise.resolve(promise);
}


/**
 * Description
 * @param {any} mailType
 * @param {any} teamName
 * @param {any} teamManagerEmail
 * @param {any} userEmail
 * @param {any} organizationDomain
 * @param {any} teamId
 * @return {any}
 */
exports.verificationMailer = function (mailType, teamName, teamManagerEmail, userEmail, organizationDomain, teamId) {
    var valueArray = [];
    valueArray.push(teamName);
    valueArray.push(teamManagerEmail);
    valueArray.push(userEmail);
    valueArray.push(organizationDomain);
    var message = generateTemplate(mailType, valueArray);
    valueArray.push(teamId);
    const promise = sendMail(userEmail, message[0], message[1]).catch((error) => {
        console.error(error);
        return error;
    });
    return Promise.resolve(promise);
}


var generateTemplate = function (mailType, valueArray) {
    var message = [];
    var subjectMessage = mailType;//generate subject
    var htmlMessage = valueArray;//generate htmlmessage
    message.push(subjectMessage);
    message.push(htmlMessage);
    return message;
}

