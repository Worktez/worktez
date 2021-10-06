/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// const admin = require("firebase-admin");
// const db = admin.firestore();

const { db } = require("../application/lib");

exports.setTask = function(orgDomain, taskId, title, des, priority, difficulty, creator, assignee, reporter, estimatedTime, status, project, loggedWorkTotalTime, workDone, sprintNumber, storyPointNumber, creationDate, completiondate, orgId, teamId, type) {
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

exports.getAllTasks = function(orgDomain, teamId, sprintNumber, filterAssignee, filterPriority, filterDifficulty, filterStatus, filterProject) {
    let query = db.collection("Organizations").doc(orgDomain).collection("Tasks");

    query = query.where("SprintNumber", "==", sprintNumber);

    if (filterAssignee != "") {
        query = query.where("Assignee", "==", filterAssignee);
    }
    if (filterPriority != "") {
        query = query.where("Priority", "==", filterPriority);
    }
    if (filterDifficulty != "") {
        query = query.where("Difficulty", "==", filterDifficulty);
    }
    if (filterStatus != "") {
        query = query.where("Status", "==", filterStatus);
    }
    if (filterProject != "") {
        query = query.where("TeamId", "==", filterProject);
    } else {
        query = query.where("TeamId", "==", teamId);
    }

    const getAllTasksPromise = query.get();

    return Promise.resolve(getAllTasksPromise);
};