/***********************************************************
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
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { db } = require("../application/lib");


exports.getLink = function(orgDomain, taskId) {
    const getLinkDetails = db.collection("Organizations").doc(orgDomain).collection("Tasks").doc(taskId).collection("Link").get();
    return Promise.resolve(getLinkDetails);
};

exports.setLinkDoc = function(orgDomain, taskId, linkType, linkURL, linkID) {
    const setLinkDetails = db.collection("Organizations").doc(orgDomain).collection("Tasks").doc(taskId).collection("Link").doc(linkID).set({
        LinkType: linkType,
        LinkURL: linkURL,
        TaskID: taskId,
        LinkID: linkID,
        OrgDomain: orgDomain,
    });
    return Promise.resolve(setLinkDetails);
};