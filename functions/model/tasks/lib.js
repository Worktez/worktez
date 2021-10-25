/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { db } = require("../application/lib");

exports.setTask = function(orgDomain, taskId, title, des, priority, difficulty, creator, assignee, reporter, estimatedTime, status, project, loggedWorkTotalTime, workDone, sprintNumber, storyPointNumber, creationDate, completiondate, orgId, teamId, type, taskFileCounter, linkCounter = 0) {
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
        LinkCounter: linkCounter,
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

exports.getAllTasks = function(orgDomain, teamId = "", sprintNumber = "", filterAssignee = "", filterPriority = "", filterDifficulty = "", filterStatus = "", filterProject = "", sprintRange1 = "", sprintRange2 = "") {
    let query = db.collection("Organizations").doc(orgDomain).collection("Tasks");
    if (sprintNumber != "") {
        query = query.where("SprintNumber", "==", sprintNumber);
    }
    if (sprintRange1 != "") {
        query = query.where("SprintNumber", ">=", sprintRange1);
    }
    if (sprintRange2 != "") {
        query = query.where("SprintNumber", "<=", sprintRange2);
    }
    if (filterAssignee != "") {
        query = query.where("Assignee", "==", filterAssignee);
    }
    if (filterPriority != "") {
        query = query.where("Priority", "==", filterPriority);
    }
    if (filterDifficulty != "") {
        query = query.where("Difficulty", "==", filterDifficulty);
    }
    if (filterStatus == "Incomplete") {
        query = query.where("Status", "!=", "Completed");
    } else if (filterStatus != "") {
        query = query.where("Status", "==", filterStatus);
    }
    if (filterProject != "") {
        query = query.where("Project", "==", filterProject);
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