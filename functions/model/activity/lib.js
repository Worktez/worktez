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

const { db } = require("../application/lib");

/**
 * Description
 * @param {any} orgDomain
 * @param {any} taskId
 * @param {any} totalActions=0
 * @param {any} totalComments=0
 * @return {any}
 */
exports.setActivities = function(orgDomain, taskId, totalActions = 0, totalComments = 0) {
    const setActivityPromise = db.collection("Organizations").doc(orgDomain).collection("Activity").doc(taskId).set({
        TaskId: taskId,
        TotalActions: totalActions,
        TotalComments: totalComments,
    });
    return Promise.resolve(setActivityPromise);
};

/**
 * Description
 * @param {any} inputJson
 * @param {any} orgDomain
 * @param {any} taskId
 * @return {any}
 */
exports.updateActivities = function(inputJson, orgDomain, taskId) {
    const updateActivitiesPromise = db.collection("Organizations").doc(orgDomain).collection("Activity").doc(taskId).update(inputJson);
    return Promise.resolve(updateActivitiesPromise);
};

/**
 * Description
 * @param {any} orgDomain
 * @param {any} taskId
 * @return {any}
 */
exports.getActivities = function(orgDomain, taskId) {
    const getActivitiesPromise = db.collection("Organizations").doc(orgDomain).collection("Activity").doc(taskId).get().then((doc) => {
        if (doc.exists) {
            return doc.data();
        } else {
            return;
        }
    });

    return Promise.resolve(getActivitiesPromise);
};

/**
 * Description
 * @param {any} orgDomain
 * @param {any} taskId
 * @param {any} actionId
 * @param {any} type
 * @param {any} comment
 * @param {any} date
 * @param {any} time
 * @param {any} uid
 * @return {any}
 */
exports.setAction = function(orgDomain, taskId, actionId, type, comment, date, time, uid) {
    const setActionPromise = db.collection("Organizations").doc(orgDomain).collection("Activity").doc(taskId).collection("Action").doc(actionId).set({
        Type: type,
        Comment: comment,
        Date: date,
        Time: time,
        Uid: uid,
    });

    return Promise.resolve(setActionPromise);
};

/**
 * Description
 * @param {any} orgDomain
 * @param {any} taskId
 * @param {any} type
 * @return {any}
 */
exports.getAction = function(orgDomain, taskId, type) {
    let query = db.collection("Organizations").doc(orgDomain).collection("Activity").doc(taskId).collection("Action");

    if (type!="") {
        query = query.where("Type", "==", type);
    }

    const getActionPromise = query.get();

    return Promise.resolve(getActionPromise);
};