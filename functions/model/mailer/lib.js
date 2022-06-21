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
 * Author : Sanjay Krishna <sanjaykrishna1203@gmail.com>
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/
const { sendMail } = require("../email/lib");
const { getTask } = require("../tasks/lib");
const { getUserUseEmail } = require("../users/lib");
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

        if (mailType == "Watcher_Task" || mailType == "Log_Task") {
            getUserUseEmail(customParameter).then((userData)=>{
                valueArray.recipientName = userData.displayName;
                valueArray.watcher = customParameter;
                valueArray.taskId = taskId;
                valueArray.push(taskId);
                generateTemplate(mailType, valueArray).then((data) => {
                    const message = data;
                    sendMail(customParameter, message[0], message[1]);
                });
            });
        } else {
            watchers.forEach((element) => {
                getUserUseEmail(element).then((userData) => {
                    valueArray = [];
                    valueArray.doer = customParameter;
                    valueArray.taskId = taskId;
                    valueArray.AssigneeEmail = taskData.Assignee;
                    if(userData){                   
                        valueArray.recipientName = userData.displayName;
                    }
                    let message = "";
                    if (element == taskData.Assignee) {
                        generateTemplate(mailType, valueArray).then((data) => {
                            message = data;
                            sendMail(element, message[0], message[1]);
                        });
                    } else {
                        valueArray.watcher = element;
                        generateTemplate(mailType, valueArray).then((data) => {
                            message = data;
                            sendMail(element, message[0], message[1]);
                        });
                    }
                });
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
    getUserUseEmail(email).then((userData)=>{
        const valueArray = [];
        valueArray.push(uid);
        valueArray.push(email);
        valueArray.push(displayName);
        valueArray.push(userData.Username);
        generateTemplate(mailType, valueArray).then((data) => {
            const message = data;
            sendMail(email, message[0], message[1]);
        });
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
    generateTemplate(mailType, valueArray).then((data) => {
        const message = data;
        sendMail(userEmail, message[0], message[1]);
    });
};
/**
 * Description
 * @param {any} mailType
 * @param {any} userName
 * @param {any} userEmail
 * @param {any} userContact
 * @param {any} userOrg
 */
 exports.demoRequestMailer = function(mailType, userName, userEmail, userContact, userOrg) {
    const valueArray = [];
    valueArray.push(userName);
    valueArray.push(userEmail);
    valueArray.push(userContact);
    valueArray.push(userOrg);
    generateTemplate(mailType, valueArray).then((data) => {
        const message = data;
        sendMail("admin@worktez.com", message[0], message[1]);
    });
};