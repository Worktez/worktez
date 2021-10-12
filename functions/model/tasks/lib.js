/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// const admin = require("firebase-admin");
// const db = admin.firestore();

const { db } = require("../application/lib");

exports.setTask = function(orgDomain, taskId, title, des, priority, difficulty, creator, assignee, reporter, estimatedTime, status, project, loggedWorkTotalTime, workDone, sprintNumber, storyPointNumber, creationDate, completiondate, orgId, teamId, type, taskFileCounter) {
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
        TaskFilesCounter: taskFileCounter,
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

exports.getAllTasks = function(orgDomain, teamId, sprintNumber, filterAssignee, filterPriority, filterDifficulty, filterStatus, filterProject, sortByFields, userEmail) {
    let query = db.collection("Organizations").doc(orgDomain).collection("Tasks");

    query = query.where("SprintNumber", "==", sprintNumber);

    if (userEmail) {
        query = query.where("Assignee", "==", userEmail);
    } else {
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
    }

    for (const field in sortByFields) {
        if (sortByFields[field] != null) {
            if (field == "Progress") {
                query = query.orderBy("WorkDone", sortByFields[field]);
            } if (field == "Status" || field == "Priority" || field == "Difficulty") {
                query = query.orderBy(field.split("@@")[0], sortByFields[field]);
            } if (field == "Id" || field == "Title" || field == "Assignee") {
                query = query.orderBy(field, sortByFields[field]);
            }
        }
    }
    const getAllTasksPromise = query.get();

    return Promise.resolve(getAllTasksPromise);
};