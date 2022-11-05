/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */

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
 * @param {any} title
 * @param {any} des
 * @param {any} priority
 * @param {any} difficulty
 * @param {any} creator
 * @param {any} assignee
 * @param {any} reporter
 * @param {any} estimatedTime
 * @param {any} status
 * @param {any} project
 * @param {any} loggedWorkTotalTime
 * @param {any} workDone
 * @param {any} sprintNumber
 * @param {any} storyPointNumber
 * @param {any} creationDate
 * @param {any} completiondate
 * @param {any} orgId
 * @param {any} teamId
 * @param {any} type
 * @param {any} taskFileCounter
 * @param {any} linkCounter=0
 * @param {any} lastUpdatedDate
 * @param {any} watchers
 * @param {any} milestoneId
 * @param {any} prLink=""
 * @param {any} prApiLink=""
 * @param {any} prNumber
 * @return {any}
 */
exports.setTask = function(orgDomain, taskId, title, des, priority, difficulty, creator, assignee, reporter, estimatedTime, status, project, loggedWorkTotalTime, workDone, sprintNumber, storyPointNumber, creationDate, completiondate, orgId, teamId, type, taskFileCounter, linkCounter = 0, lastUpdatedDate, watchers, milestoneId, prLink="", prApiLink="", prNumber=null) {
  const createTask = db.collection("Organizations").doc(orgDomain).collection("Tasks").doc(taskId).set({
    Id: taskId,
    Title: title,
    Description: des,
    Priority: priority,
    Difficulty: difficulty,
    Creator: creator,
    Assignee: assignee,
    Reporter: reporter,
    Watcher: watchers,
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
    LastUpdatedDate: lastUpdatedDate,
    PrLink: prLink,
    PrApiLink: prApiLink,
    PrNumber: prNumber,
    MilestoneId: milestoneId,

  });
  return Promise.resolve(createTask);
};

/**
 * Description
 * @param {any} inputJson
 * @param {any} orgDomain
 * @param {any} taskId
 * @return {any}
 */
exports.updateTask = function(inputJson, orgDomain, taskId) {
  const updateTaskPromise = db.collection("Organizations").doc(orgDomain).collection("Tasks").doc(taskId).update(inputJson);
  return Promise.resolve(updateTaskPromise);
};

/**
 * Description
 * @param {any} taskId
 * @param {any} orgDomain
 * @return {any}
 */
exports.getTask = function(taskId, orgDomain) {
  const getTaskDetails = db.collection("Organizations").doc(orgDomain).collection("Tasks").doc(taskId).get().then((taskDoc) => {
    return taskDoc.data();
  });
  return Promise.resolve(getTaskDetails);
};

/**
 * Description
 * @param {any} orgDomain
 * @param {any} teamId=""
 * @param {any} sprintNumber=""
 * @param {any} filterAssignee=""
 * @param {any} filterPriority=""
 * @param {any} filterDifficulty=""
 * @param {any} filterStatus=""
 * @param {any} filterProject=""
 * @param {any} sprintRange1=""
 * @param {any} sprintRange2=""
 * @param {any} milestoneId=""
 * @return {any}
 */
exports.getAllTasks = function(orgDomain, teamId = "", sprintNumber = "", filterAssignee = "", filterPriority = "", filterDifficulty = "", filterStatus = "", filterProject = "", sprintRange1 = "", sprintRange2 = "", milestoneId = "") {
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
  if (teamId != "") {
    query = query.where("TeamId", "==", teamId);
  }
  if (milestoneId != "") {
    query = query.where("MilestoneId", "==", milestoneId);
  }

  const getAllTasksPromise = query.get();

  return Promise.resolve(getAllTasksPromise);
};

