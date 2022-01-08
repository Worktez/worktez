/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { db } = require("../application/lib");

exports.setFileToTask = function(inputJson, orgDomain, taskId, taskFileDocumentName) {
    const setFileToTaskPromise = db.collection("Organizations").doc(orgDomain).collection("Tasks").doc(taskId).collection("Files").doc(taskFileDocumentName).set(inputJson);
    return Promise.resolve(setFileToTaskPromise);
};

exports.updateFileToTask = function(inputJson, orgDomain, taskId, taskFileDocumentName) {
    const updateFileToTaskPromise = db.collection("Organizations").doc(orgDomain).collection("Tasks").doc(taskId).collection("Files").doc(taskFileDocumentName).update(inputJson);
    return Promise.resolve(updateFileToTaskPromise);
};

exports.getFileInTask = function(orgDomain, taskId) {
    let query = db.collection("Organizations").doc(orgDomain).collection("Tasks").doc(taskId).collection("Files");
    query = query.where("FileStatus", "==", "OK");

    const getFilesPromise = query.get();

    return Promise.resolve(getFilesPromise);
};

exports.setFileToOrg = function(inputJson, orgDomain, logoFileName) {
    const setFileToOrgPromise = db.collection("Organizations").doc(orgDomain).collection("LogoFiles").doc(logoFileName).set(inputJson);
    return Promise.resolve(setFileToOrgPromise);
};

exports.setFileToOrgDocument = function(inputJson, orgDomain, orgFileDocumentName) {
    const setFileToOrgPromise = db.collection("Organizations").doc(orgDomain).collection("Documents").doc(orgFileDocumentName).set(inputJson);
    return Promise.resolve(setFileToOrgPromise);
};

exports.setFileToContributorsDocument = function(inputJson, orgFileDocumentName) {
    const setFileToContributorsPromise = db.collection("ContributorsDocuments").doc(orgFileDocumentName).set(inputJson);
    return Promise.resolve(setFileToContributorsPromise);
};

exports.setProfilePicToUserDocument = function(inputJson, uid, orgFileDocumentName) {
    const setProfilePicToUserDocumentPromise = db.collection("Users").doc(uid).collection("ProfilePic").doc(orgFileDocumentName).set(inputJson);
    return Promise.resolve(setProfilePicToUserDocumentPromise);
};

exports.getFileInOrgDocument = function(orgDomain) {
    let query = db.collection("Organizations").doc(orgDomain).collection("Documents");
    query = query.where("FileStatus", "==", "OK");

    const getFilesPromise = query.get();

    return Promise.resolve(getFilesPromise);
};