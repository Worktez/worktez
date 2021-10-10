/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// const admin = require("firebase-admin");
// const db = admin.firestore();

const { db } = require("../application/lib");

exports.setTask = function(orgDomain, taskId, title, des, priority, difficulty, creator, assignee, reporter, estimatedTime, status, project, loggedWorkTotalTime, workDone, sprintNumber, storyPointNumber, creationDate, completiondate, orgId, teamId, type, linkcounter=0) {
    const createTask = db.collection("Organizations").doc(orgDomain).collection("Tasks").doc(taskId).set({
        Id: taskId,
        Title: title,
        Description: des,
        Priority: priority,
        Difficulty: difficulty,
        Creator: creator,
        Assignee: assignee,
        Reporter: reporter,
        Watcher: [],
        EstimatedTime: estimatedTime,
        Status: status,
        Project: project,
        LogWorkTotalTime: loggedWorkTotalTime,
        WorkDone: workDone,
        SprintNumber: sprintNumber,
        StoryPointNumber: storyPointNumber,
        CreationDate: creationDate,
        CompletionDate: completiondate,
        OrganizationId: orgId,
        TeamId: teamId,
        Type: type,
        LinkCounter: linkcounter,
    });
    return Promise.resolve(createTask);
};

exports.updateTask = function(inputJson, orgDomain, taskId) {
    const updateTaskPromise = db.collection("Organizations").doc(orgDomain).collection("Tasks").doc(taskId).update(inputJson);
    return Promise.resolve(updateTaskPromise);
};

exports.getTask = function(taskId, orgDomain) {
    const getTaskDetails = db.collection("Organizations").doc(orgDomain).collection("Tasks").doc(taskId).get().then((taskDoc) => {
        return taskDoc.data();
    });
    return Promise.resolve(getTaskDetails);
};

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