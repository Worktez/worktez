/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
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
 * @param {any} schedularDocId
 * @param {any} type
 * @param {any} orgAppKey
 * @param {any} assignee
 * @param {any} teamId
 * @param {any} orgDomain
 * @return {any}
 */
exports.setSchedular = function(schedularDocId, type, orgAppKey, assignee, teamId, orgDomain) {
    const inputJson = {
        Type: type,
        OrgAppKey: orgAppKey,
        TeamId: teamId,
        OrgDomain: orgDomain,
        Assignee: assignee,
    };
    const setSchedularDoc = db.collection("SchedularOrg").doc(schedularDocId).set(inputJson);
    return Promise.resolve(setSchedularDoc);
};

/**
 * Description
 * @param {any} schedularDocId
 * @return {any}
 */
exports.getSchedular = function(schedularDocId) {
    const getSchedularPromise = db.collection("SchedularOrg").doc(schedularDocId).get().then((doc) => {
        return doc.data();
    });
    return Promise.resolve(getSchedularPromise);
};

/**
 * Description
 * @param {any} type
 * @param {any} orgAppKey
 * @param {any} assignee
 * @param {any} teamId
 * @param {any} orgDomain
 * @return {any}
 */
exports.getAllSchedular = function(type, orgAppKey, assignee, teamId, orgDomain) {
    let query = db.collection("SchedularOrg");
    if (type != "") {
        console.log("check1");
        query = query.where("Type", "==", type);
    }
    if (orgAppKey != "") {
        console.log("check2");
        query = query.where("OrgAppKey", "==", orgAppKey);
    }
    if (assignee != "") {
        console.log("check3");
        query = query.where("Assignee", "==", assignee);
    }
    if (teamId != "") {
        console.log("check4");
        query = query.where("TeamId", "==", teamId);
    }
    if (orgDomain != "") {
        console.log("check5");
        query = query.where("OrgDomain", "==", orgDomain);
    }
    const getAllScheduledPromises = query.get();

    return Promise.resolve(getAllScheduledPromises);
};
