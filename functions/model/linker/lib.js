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
 * @param {any} orgDomain
 * @param {any} taskId
 * @return {any}
 */
exports.getLink = function(orgDomain, taskId) {
    const getLinkDetails = db.collection("Organizations").doc(orgDomain).collection("Tasks").doc(taskId).collection("Link").get();
    return Promise.resolve(getLinkDetails);
};

/**
 * Description
 * @param {any} orgDomain
 * @param {any} taskId
 * @param {any} linkType
 * @param {any} linkURL
 * @param {any} linkID
 * @return {any}
 */
exports.setLinkDoc = function(orgDomain, taskId, linkType, linkURL, linkID) {
    const setLinkDetails = db.collection("Organizations").doc(orgDomain).collection("Tasks").doc(taskId).collection("Link").doc(linkID).set({
        LinkType: linkType,
        LinkURL: linkURL,
        TaskID: taskId,
        LinkID: linkID,
        OrgDomain: orgDomain,
        LinkStatus: "Active",
    });
    return Promise.resolve(setLinkDetails);
};

/**
 * Description
 * @param {any} orgDomain
 * @param {any} taskId
 * @param {any} linkType
 * @param {any} linkURL
 * @param {any} linkID
 * @return {any}
 */
 exports.removeLinkDoc = function(orgDomain, taskId, linkID) {
    const setLinkDetails = db.collection("Organizations").doc(orgDomain).collection("Tasks").doc(taskId).collection("Link").doc(linkID).update({
        LinkStatus : "Deleted",
    });
    return Promise.resolve(setLinkDetails);
};

/**
 * Description
 * @param {any} orgDomain
 * @param {any} taskId
 * @param {any} linkID
 * @return {any}
 */

exports.getLinkData = function(orgDomain, taskId, linkId){
    console.log(orgDomain)
    console.log(taskId)
    console.log(linkId)
    const getLinkDetails = db.collection("Organizations").doc(orgDomain).collection("Tasks").doc(taskId).collection("Link").doc(linkId).get();
    return Promise.resolve(getLinkDetails);
}