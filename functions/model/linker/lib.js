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