/* eslint-disable no-undef */
/* eslint-disable object-curly-spacing */
/* eslint-disable require-jsdoc */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const admin = require("firebase-admin");
admin.initializeApp();

const createNewTaskAPI = require("./createNewTaskAPI");
const startNewSprintAPI = require("./startNewSprintAPI");
const logWorkAPI = require("./logWorkAPI");
const editPageTaskAPI = require("./editPageTaskAPI");
const deleteTaskAPI = require("./deleteTaskAPI");
const createNewUserAPI = require("./createNewUserAPI");
const updateSprintStatusAPI = require("./updateSprintStatusAPI");
const createNewOrgAPI = require("./createNewOrgAPI");
const patch = require("./patchAPI");
const verifyUserAPI = require("./verifyUserAPI");

// class Task {
//     constructor(id, title, status, priority, estimatedTime, difficulty, description, creator, project , assignee, logWorkTotalTime, workDone, creationDate, sprintNumber, storyPointNumber) {
//         this.Id = id;
//         this.Title = title;
//         this.Status = status;
//         this.Priority = priority;
//         this.EstimatedTime = estimatedTime;
//         this.Difficulty = difficulty;
//         this.Description = description;
//         this.Creator = creator;
//         this.Project = project;
//         this.Assignee = assignee;
//         this.LogWorkTotalTime = logWorkTotalTime;
//         this.WorkDone = workDone;
//         this.CreationDate = creationDate;
//         this.SprintNumber = sprintNumber;
//         this.StoryPointNumber = storyPointNumber;
//     }
// }

exports.createNewTask = createNewTaskAPI.createNewTask;
exports.startNewSprint = startNewSprintAPI.startNewSprint;
exports.logWork = logWorkAPI.logWork;
exports.editPageTask = editPageTaskAPI.editPageTask;
exports.deleteTask = deleteTaskAPI.deleteTask;
exports.createNewUser = createNewUserAPI.createNewUser;
exports.updateSprintStatus = updateSprintStatusAPI.updateSprintStatus;
exports.createNewOrganization = createNewOrgAPI.createNewOrganization;
exports.createNewTeamWithLabels = createNewOrgAPI.createNewTeamWithLabels;
exports.patch = patch.patch;
exports.verifyUser = verifyUserAPI.verifyUser;