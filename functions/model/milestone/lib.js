/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

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

 const { db } = require("../application/lib");

 /**
 * Description
 * @param {any} uid
 * @param {any} orgDomain
 * @param {any} title
 * @param {any} description
 * @param {any} milestoneId
 * @param {any} teamId
 * @param {any} totalTasks
 * @param {any} totalCompletedTasks
 * @param {any} creationDate
 * @param {any} creationTime
 * @return {any}
 */
exports.setMilestone = function(uid, orgDomain, title, description, milestoneId, teamId, totalTasks, totalCompletedTasks, creationDate, creationTime) {
    const addMilestonePromise = db.collection("Organizations").doc(orgDomain).collection("Milestones").doc(milestoneId).set({
        CreatorUid: uid,
        TeamId: teamId,
        MilestoneId: milestoneId,
        Title: title,
        Description: description,
        TotalTasks: totalTasks,
        TotalCompletedTasks: totalCompletedTasks,
        CreationDate: creationDate,
        CreationTime: creationTime,
    });
    return Promise.resolve(addMilestonePromise);
};

 /**
 * Description
 * @param {any} orgDomain
 * @param {any} milestoneId
 * @return {any}
 */
exports.getMilestoneData = function(orgDomain, milestoneId) {
    const getMilstoneDataPromise = db.collection("Organizations").doc(orgDomain).collection("Milestones").doc(milestoneId).get().then((doc) => {
        if (doc.exists) return doc.data();
        else return;
    });
    return Promise.resolve(getMilstoneDataPromise);
};

 /**
 * Description
 * @param {any} orgDomain
 * @param {any} teamId
 * @return {any}
 */
exports.getAllMilestonesData = function(orgDomain, teamId="") {
    let query = db.collection("Organizations").doc(orgDomain).collection("Milestones");
    if (teamId != "") {
        query = query.where("TeamId", "==", teamId);
    }

    const promise = query.get().then((doc) => {
        const data=[];
        doc.forEach((element) => {
            if (element.exists) {
                data.push( element.data());
            }
        });
        return data;
    });
    return Promise.resolve(promise);
};

// exports.getTaskData = function(orgDomain, milestoneId) {
//     let query = db.collection("Organizations").doc(orgDomain).collection("Tasks");
//     query = query.where("MilestoneId", "==", milestoneId);
//     const promise = query.get().then((doc) => {
//         const data=[];
//         doc.forEach((element) => {
//             if (element.exists) {
//                 data.push( element.data());
//             }
//         });
//         return data;
//     });
//     return Promise.resolve(promise);
// };