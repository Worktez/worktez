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
 * @param {any} inputJson
 * @param {any} orgDomain
 * @param {any} taskId
 * @param {any} taskFileDocumentName
 * @return {any}
 */
exports.setFileToTask = function(inputJson, orgDomain, taskId, taskFileDocumentName) {
    const setFileToTaskPromise = db.collection("Organizations").doc(orgDomain).collection("Tasks").doc(taskId).collection("Files").doc(taskFileDocumentName).set(inputJson);
    return Promise.resolve(setFileToTaskPromise);
};

/**
 * Description
 * @param {any} inputJson
 * @param {any} orgDomain
 * @param {any} taskId
 * @param {any} taskFileDocumentName
 * @return {any}
 */
exports.updateFileToTask = function(inputJson, orgDomain, taskId, taskFileDocumentName) {
    const updateFileToTaskPromise = db.collection("Organizations").doc(orgDomain).collection("Tasks").doc(taskId).collection("Files").doc(taskFileDocumentName).update(inputJson);
    return Promise.resolve(updateFileToTaskPromise);
};

/**
 * Description
 * @param {any} inputJson
 * @param {any} orgDomain
 * @param {any} OrgFileDocumentName
 * @return {any}
 */
exports.updateFileToOrg = function(inputJson, orgDomain, OrgFileDocumentName) {
    const updateFileToOrgPromise = db.collection("Organizations").doc(orgDomain).collection("Documents").doc(OrgFileDocumentName).update(inputJson);
    return Promise.resolve(updateFileToOrgPromise);
};

/**
 * Description
 * @param {any} orgDomain
 * @param {any} taskId
 * @return {any}
 */
exports.getFileInTask = function(orgDomain, taskId) {
    let query = db.collection("Organizations").doc(orgDomain).collection("Tasks").doc(taskId).collection("Files");
    query = query.where("FileStatus", "==", "OK");

    const getFilesPromise = query.get();

    return Promise.resolve(getFilesPromise);
};

/**
 * Description
 * @param {any} inputJson
 * @param {any} orgDomain
 * @param {any} logoFileName
 * @return {any}
 */
exports.setFileToOrg = function(inputJson, orgDomain, logoFileName) {
    const setFileToOrgPromise = db.collection("Organizations").doc(orgDomain).collection("LogoFiles").doc(logoFileName).set(inputJson);
    return Promise.resolve(setFileToOrgPromise);
};

/**
 * Description
 * @param {any} inputJson
 * @param {any} orgDomain
 * @param {any} orgFileDocumentName
 * @return {any}
 */
exports.setFileToOrgDocument = function(inputJson, orgDomain, orgFileDocumentName) {
    const setFileToOrgPromise = db.collection("Organizations").doc(orgDomain).collection("Documents").doc(orgFileDocumentName).set(inputJson);
    return Promise.resolve(setFileToOrgPromise);
};

/**
 * Description
 * @param {any} inputJson
 * @param {any} orgFileDocumentName
 * @return {any}
 */
exports.setFileToContributorsDocument = function(inputJson, orgFileDocumentName) {
    const setFileToContributorsPromise = db.collection("ContributorsDocuments").doc(orgFileDocumentName).set(inputJson);
    return Promise.resolve(setFileToContributorsPromise);
};

/**
 * Description
 * @param {any} inputJson
 * @param {any} uid
 * @param {any} orgFileDocumentName
 * @return {any}
 */
exports.setProfilePicToUserDocument = function(inputJson, uid, orgFileDocumentName) {
    const setProfilePicToUserDocumentPromise = db.collection("Users").doc(uid).collection("ProfilePic").doc(orgFileDocumentName).set(inputJson);
    return Promise.resolve(setProfilePicToUserDocumentPromise);
};

/**
 * Description
 * @param {any} orgDomain
 * @return {any}
 */
exports.getFileInOrgDocument = function(orgDomain) {
    let query = db.collection("Organizations").doc(orgDomain).collection("Documents");
    query = query.where("FileStatus", "==", "OK");

    const getFilesPromise = query.get();

    return Promise.resolve(getFilesPromise);
};