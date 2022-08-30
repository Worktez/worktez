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
 * @param {any} orgAppKey
 * @param {any} orgId
 * @return {any}
 */
exports.setSchedular = function(schedularDocId, orgAppKey, orgId) {
    const inputJson = {
        OrgAppKey: orgAppKey,
        OrgId: orgId,
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
 * @param {any} orgAppKey
 * @param {any} orgId
 * @return {any}
 */
exports.getAllSchedular = function(orgAppKey, orgId) {
    let query = db.collection("SchedularOrg");
    if (orgId != "") {
        query = query.where("OrgId", "==", orgId);
    }
    if (orgAppKey != "") {
        query = query.where("OrgAppKey", "==", orgAppKey);
    }
    const getAllScheduledPromises = query.get();

    return Promise.resolve(getAllScheduledPromises);
};
